import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Checkbox, Text } from "react-native-paper";
import HeaderSection from '../../components/HeaderSection';
import PeriodSelector from '../../components/PeriodSelector';
import ConsumptionChart from '../../components/ConsumptionChart';
import DetailsSection from '../../components/DetailsSection';
import { Picker } from 'react-native-ui-lib';

const PronosticoScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Hoy');
  const [selectedTariff, setSelectedTariff] = useState('Tarifa 1');

  useEffect(() => {
    console.log(`Tarifa seleccionada: ${selectedTariff}`);
  }, [selectedTariff]);

  return (
    <ScrollView style={styles.container}>
      <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
      <ConsumptionChart selectedPeriod={selectedPeriod} selectedTariff={selectedTariff} />

      {/* Selector de tarifa */}
      <Text name="TitleTarifa" style={styles.titleTarifa}>Tarifas</Text>
      <Picker
        value={selectedTariff}
        onChange={(item) => {
          setSelectedTariff(item);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Tarifa 1" value="Tarifa 1" />
        <Picker.Item label="Tarifa 2" value="Tarifa 2" />
        <Picker.Item label="Tarifa 3" value="Tarifa 3" />
      </Picker>

      {/* Detalles de consumo o pronóstico */}
      <DetailsSection selectedTariff={selectedTariff} viewType="Pronostico" selectedPeriod={selectedPeriod} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  picker: {
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'BCC1CA',
    borderWidth: 1,
    width: '40%',
    height: 40,
    borderRadius: 20,
    padding:10,
},
  titleTarifa:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',  
    marginLeft:6,
}
});


export default PronosticoScreen;
