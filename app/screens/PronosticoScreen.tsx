import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import PeriodSelectorPronostico from '@/components/PeriodSelectorPronostico';
import mockData from "@/assets/mockData.json";
import PronosticoResumen from '@/components/PronosticoResumen';
import { Picker } from 'react-native-ui-lib';

const PronosticoScreen = () => {
  const { tarifas: tarifasDisponibles } = mockData;

  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [selectedTarifa, setSelectedTarifa] = useState(
    tarifasDisponibles.length ? tarifasDisponibles[0].code : "DA"
  );

  const [loading, setLoading] = useState(true); // controlado por el hijo

  return (
    <View style={styles.wrapper}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1D61E7" />
          <Text style={styles.loaderText}>Cargando datos del pronóstico...</Text>
        </View>
      )}

      <ScrollView style={styles.container} contentContainerStyle={{ opacity: loading ? 0.3 : 1 }}>
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

        <PronosticoResumen
          selectedTarifa={selectedTarifa}
          periodo={selectedPeriod}
          onLoadingChange={setLoading} // nueva prop
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 60,
    padding: 16,
  },
  picker: {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 12,
    borderColor: '#BCC1CA',
    borderWidth: 1,
    width: '40%',
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  loaderContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default PronosticoScreen;
