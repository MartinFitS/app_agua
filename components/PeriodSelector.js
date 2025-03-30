import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PeriodSelector = ({ selectedPeriod, onPeriodChange }) => (
  <View style={styles.periodSelector}>
    {/* Botón "Hoy" */}
    <TouchableOpacity
      style={[styles.button, selectedPeriod === 'Hoy' ? styles.activeButton : styles.inactiveButton]}
      onPress={() => onPeriodChange('Hoy')}
    >
      <Text style={selectedPeriod === 'Hoy' ? styles.activeText : styles.inactiveText}>Hoy</Text>
    </TouchableOpacity>

    {/* Botón "Bimestral" */}
    <TouchableOpacity
      style={[styles.button, selectedPeriod === 'Bimestral' ? styles.activeButton : styles.inactiveButton]}
      onPress={() => onPeriodChange('Bimestral')}
    >
      <Text style={selectedPeriod === 'Bimestral' ? styles.activeText : styles.inactiveText}>Bimestral</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5, 
  },
  activeButton: {
    backgroundColor: '#4A90E2',
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0',
  },
  activeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#333',
    fontSize: 14,
  },
});

export default PeriodSelector;
