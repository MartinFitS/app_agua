import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

// Definición de las pantallas principales
const HomeScreen = () => <View><Text>Home</Text></View>;
const ConsumoScreen = () => <View><Text>Consumo</Text></View>;
const PronosticoScreen = () => <View><Text>Pronóstico</Text></View>;
const AnalisisScreen = () => <View><Text>Análisis</Text></View>;
const PerfilScreen = () => <View><Text>Perfil</Text></View>;

const BottomMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home': iconName = 'home'; break;
            case 'Consumo': iconName = 'bar-chart'; break;
            case 'Pronóstico': iconName = 'cloud'; break;
            case 'Análisis': iconName = 'analytics'; break;
            case 'Perfil': iconName = 'person'; break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Consumo" component={ConsumoScreen} />
      <Tab.Screen name="Pronóstico" component={PronosticoScreen} />
      <Tab.Screen name="Análisis" component={AnalisisScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
};

export default BottomMenu;
