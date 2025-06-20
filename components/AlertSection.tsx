import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const alertConfig = {
  ALTO: {
    icon: 'alert-circle',
    iconColor: '#d32f2f',
    bgColor: '#fdecea',
    titleColor: '#b71c1c',
    emoji: '🚨',
    title: 'Alerta alta',
  },
  MEDIO: {
    icon: 'water',
    iconColor: '#1976d2',
    bgColor: '#e3f2fd',
    titleColor: '#0d47a1',
    emoji: '💧',
    title: 'Alerta media',
  },
  BAJO: {
    icon: 'checkmark-circle',
    iconColor: '#388e3c',
    bgColor: '#e8f5e9',
    titleColor: '#1b5e20',
    emoji: '✅',
    title: 'Buen trabajo',
  },
};

const AlertSection = ({ mensajes = [], tipo = 'ALTO' }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const config = alertConfig[tipo] || alertConfig.ALTO;

  return (
    <Animated.View
      style={[
        styles.alertContainer,
        {
          backgroundColor: config.bgColor,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={[styles.alertTitle, { color: config.titleColor }]}>
        {config.emoji} {config.title}
      </Text>

      {mensajes.map((msg, idx) => (
        <View key={idx} style={styles.alertItem}>
          <Ionicons name={config.icon} size={20} color={config.iconColor} style={styles.icon} />
          <Text style={styles.alertText}>{msg}</Text>
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  alertText: {
    color: '#333',
    fontSize: 15,
    flexShrink: 1,
  },
});

export default AlertSection;
