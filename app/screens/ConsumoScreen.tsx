import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import PeriodSelector from '../../components/PeriodSelector';
import ConsumptionChart from '../../components/ConsumptionChart';
import DetailsSection from '../../components/DetailsSection';
import AlertSection from '../../components/AlertSection';
import { Picker } from 'react-native-ui-lib';

const ConsumoScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Hoy');
  const [selectedTariff, setSelectedTariff] = useState('Tarifa 1');

  useEffect(() => {
    console.log(`Tarifa seleccionada: ${selectedTariff}`);
    
  }, [selectedTariff]);
  useEffect(() => {
    console.log(`Periodo seleccionada: ${selectedPeriod}`);
    
  }, [selectedPeriod]);

  return (
    <ScrollView style={styles.container}>
      <HeaderSection />
      <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />

      {/* Gráfico de consumo */}
      <ConsumptionChart selectedPeriod={selectedPeriod} selectedTariff={selectedTariff} />

      {/* Selector de tarifa */}
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

      {/* Detalles de consumo */}
      <DetailsSection selectedTariff={selectedTariff} viewType="Consumo" selectedPeriod={selectedPeriod} />
      <AlertSection/>
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
    marginLeft: 12,
    marginBottom: 20,
    borderColor: 'BCC1CA',
    borderWidth: 1,
    width: '40%',
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  titleTarifa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 6,
  },
});

export default ConsumoScreen;
