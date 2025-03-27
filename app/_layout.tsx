import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PaperProvider } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ConsumoScreen from "./screens/ConsumoScreen";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador para la autenticación (Login y Registro)
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Navegador con pestañas en la parte inferior
const MainTabs = () => (
  <Tab.Navigator
  
  screenOptions={({ route }) => ({
    headerShown: false, // Elimina el encabezado
    tabBarIcon: ({ color, size }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Consumo') {
        iconName = 'bar-chart';
      } else if (route.name === 'Pronóstico') {
        iconName = 'cloud';
      } else if (route.name === 'Análisis') {
        iconName = 'analytics';
      } else if (route.name === 'Perfil') {
        iconName = 'person';
      }
      return <Icon name={iconName} size={size} color={color} />;
    },
  })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Consumo" component={ConsumoScreen} />


  </Tab.Navigator>
);

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </PaperProvider>
  );
}
