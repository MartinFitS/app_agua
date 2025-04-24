import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import PeriodSelector from '../../components/PeriodSelector';
import ConsumptionChart from '../../components/ConsumptionChart';
import DetailsSection from '../../components/DetailsSection';
import AlertSection from '../../components/AlertSection';
import { Picker } from 'react-native-ui-lib';
import mockData from "@/assets/mockData.json";
import {mockConsumoData} from "@/assets/mockDataConsumo"


const ConsumoScreen = () => {
  const {
    tarifas: tarifasDisponibles,
  } = mockData;


  const [selectedPeriod, setSelectedPeriod] = useState('Hoy');
  const [selectedTarifa, setSelectedTarifa] = useState(
    tarifasDisponibles.length ? tarifasDisponibles[0].code : "DA"
  );
  


  useEffect(() => {
    console.log(`Tarifa seleccionada: ${selectedTarifa}`);
    
  }, [selectedTarifa]);
  useEffect(() => {
    console.log(`Periodo seleccionada: ${selectedPeriod}`);
    
  }, [selectedPeriod]);

  return (
    <ScrollView style={styles.container}>
      <HeaderSection />
      <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />

      {/* Gráfico de consumo */}
      <ConsumptionChart selectedPeriod={selectedPeriod} selectedTarifa={selectedTarifa} data= {mockConsumoData} />

      {/* Selector de tarifa */}

          <Picker
            placeholder="Selecciona una tarifa"
            value={selectedTarifa}
            onChange={setSelectedTarifa}
            topBarProps={{ title: "Selecciona una tarifa" }}
            style={styles.picker}
          >
            {tarifasDisponibles.map((t, i) => (
              <Picker.Item key={i} value={t.code} label={t.label} />
            ))}
          </Picker>



      <DetailsSection selectedTarifa={selectedTarifa} viewType="Consumo" selectedPeriod={selectedPeriod} data={mockConsumoData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    width: "45%",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#6E6E6E",
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
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
