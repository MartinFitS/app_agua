import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import PeriodSelector from '../../components/PeriodSelector';
import ConsumptionChart from '../../components/ConsumptionChart';
import DetailsSection from '../../components/DetailsSection';
import { Picker } from 'react-native-ui-lib';
import mockData from "@/assets/mockData.json";
import { mockConsumoData } from "@/assets/mockDataConsumo";

const ConsumoScreen = () => {
  const {
    tarifas: tarifasDisponibles,
  } = mockData;

  const [selectedPeriod, setSelectedPeriod] = useState('Hoy');
  const [selectedTarifa, setSelectedTarifa] = useState(
    tarifasDisponibles.length ? tarifasDisponibles[0].code : "DA"
  );


  const [datosHoy, setDatosHoy] = useState(null);
  const [datosMes, setDatosMes] = useState(null);

  const fetchConsumoHoy = async () => {
    try {
      const fechaHoy = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
      const response = await fetch('https://api-tesis-7k22.onrender.com/consumo/hoy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha: fechaHoy }),
      });
      const data = await response.json();
      setDatosHoy(data);
      console.log('Datos consumo hoy:', data);
    } catch (error) {
      console.error('Error al obtener consumo hoy:', error);
    }
  };

  const fetchConsumoMes = async () => {
    try {
      const hoy = new Date();
      const mes = hoy.getMonth() + 1;
      const anio = hoy.getFullYear();

      const response = await fetch('https://api-tesis-7k22.onrender.com/consumo/mes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mes, anio }),
      });
      const data = await response.json();
      setDatosMes(data);
      console.log('Datos consumo mes:', data);
    } catch (error) {
      console.error('Error al obtener consumo mes:', error);
    }
  };



  useEffect(() => {
    fetchConsumoHoy();
    fetchConsumoMes();
    const intervalId = setInterval(() => {
      fetchConsumoHoy();
      fetchConsumoMes();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(`Tarifa seleccionada: ${selectedTarifa}`);
  }, [selectedTarifa]);

  useEffect(() => {
    console.log(`Periodo seleccionado: ${selectedPeriod}`);
  }, [selectedPeriod]);



  return (
    <ScrollView style={styles.container}>
      <HeaderSection
        tipoFactura={selectedPeriod}
        datosFactura={selectedPeriod === 'Hoy' ? datosHoy : datosMes?.datos}
      />

      <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />

      {/* Por ahora no renderizamos datos reales */}
      <ConsumptionChart
        selectedPeriod={selectedPeriod}
        selectedTarifa={selectedTarifa}
        data={selectedPeriod === 'Hoy' ? datosHoy : datosMes?.datos}
      />

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

      <DetailsSection
        selectedTarifa={selectedTarifa}
        viewType="Consumo"
        selectedPeriod={selectedPeriod}
        data={datosMes}
      />
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
