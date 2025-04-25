import React from 'react';
 import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 
 const PeriodSelectorPronostico = ({ selectedPeriod, onPeriodChange }) => (
   <View style={styles.periodSelector}>
     {/* Botón "Hoy" */}
     <TouchableOpacity
       style={[styles.button, selectedPeriod === 'mes' ? styles.activeButton : styles.inactiveButton]}
       onPress={() => onPeriodChange('mes')}
     >
       <Text style={selectedPeriod === 'mes' ? styles.activeText : styles.inactiveText}>Este Mes</Text>
     </TouchableOpacity>
 
     {/* Botón "Bimestral" */}
     <TouchableOpacity
       style={[styles.button, selectedPeriod === 'anual' ? styles.activeButton : styles.inactiveButton]}
       onPress={() => onPeriodChange('anual')}
     >
       <Text style={selectedPeriod === 'anual' ? styles.activeText : styles.inactiveText}>Anual</Text>
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
 
 export default PeriodSelectorPronostico;