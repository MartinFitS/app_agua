import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PeriodSelectorPronostico from '@/components/PeriodSelectorPronostico';
import mockData from "@/assets/mockData.json";
import {mockConsumoData} from "@/assets/mockDataConsumo"
import PronosticoResumen from '@/components/PronosticoResumen';

import { Picker } from 'react-native-ui-lib';

const PronosticoScreen = () => {
  const {
    tarifas: tarifasDisponibles,
  } = mockData;
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [selectedTarifa, setSelectedTarifa] = useState(
    tarifasDisponibles.length ? tarifasDisponibles[0].code : "DA"
  );

  useEffect(() => {
    console.log(`Tarifa seleccionada: ${selectedTarifa}`);
  }, [selectedTarifa]);

  return (
    <ScrollView style={styles.container}>
      <PeriodSelectorPronostico selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />

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
      <PronosticoResumen data={mockConsumoData} selectedTarifa={selectedTarifa} periodo={selectedPeriod}/>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  picker: {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 12,
    borderColor: 'BCC1CA',
    borderWidth: 1,
    width: '40%',
    height: 40,
    borderRadius: 10,
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
