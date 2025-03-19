import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Pronóstico" component={PronosticoScreen} />
      <Tab.Screen name="Análisis" component={AnalisisScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
};

export default BottomMenu;
