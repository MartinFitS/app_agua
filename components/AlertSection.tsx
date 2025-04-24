import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const iconMap = {
  ALTO: { name: 'alert-circle', color: '#d32f2f' },
  MEDIO: { name: 'water', color: '#1976d2' },
  BAJO: { name: 'checkmark-circle', color: '#388e3c' },
};

const AlertSection = ({ mensajes = [], tipo = 'ALTO' }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const icon = iconMap[tipo] || iconMap.ALTO;

  return (
    <Animated.View style={[styles.alertContainer, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.alertTitle}>⚠️ Alertas</Text>

      {mensajes.map((msg, idx) => (
        <View key={idx} style={styles.alertItem}>
          <Ionicons name={icon.name} size={20} color={icon.color} style={styles.icon} />
          <Text style={styles.alertText}>{msg}</Text>
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    width: '100%',
    backgroundColor: '#fdecea',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
  },
  alertTitle: {
    color: '#b71c1c',
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