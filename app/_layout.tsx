import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ConsumoScreen from "./screens/ConsumoScreen";
import PronosticoScreen from "./screens/PronosticoScreen";
import PerfilScreen from "./screens/PerfilScreen";
import { AuthProvider } from "../contexts/AuthContext";
import { ConsumoProvider } from "../contexts/ConsumoContext";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") iconName = "home";
        else if (route.name === "Consumo") iconName = "bar-chart";
        else if (route.name === "Pronostico") iconName = "cloud";
        else if (route.name === "Perfil") iconName = "person";
        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Consumo" component={ConsumoScreen} />
    <Tab.Screen name="Pronostico" component={PronosticoScreen} />
    <Tab.Screen name="Perfil" component={PerfilScreen} />
  </Tab.Navigator>
);

export default function RootLayout() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
      />
      <AuthProvider>
        <ConsumoProvider>
          <PaperProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Auth" component={AuthStack} />
              <Stack.Screen name="Main" component={MainTabs} />
            </Stack.Navigator>
            <Toast />
          </PaperProvider>
        </ConsumoProvider>
      </AuthProvider>
    </>
  );
}
