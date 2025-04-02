import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AlertSection = () => (
  <View style={styles.alertContainer}>
    <Text style={styles.alertTitle}>⚠️ Alertas</Text>

    <View style={styles.alertItem}>
      <Ionicons name="alert-circle" size={20} color="#d32f2f" style={styles.icon} />
      <Text style={styles.alertText}>El consumo actual supera los límites</Text>
    </View>

    <View style={styles.alertItem}>
      <Ionicons name="water" size={20} color="#1976d2" style={styles.icon} />
      <Text style={styles.alertText}>Se ha detectado una posible fuga</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  alertContainer: {
    width: "100%",
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
