import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { precios, tarifas } from '@/assets/tarifas';
import { calcularTotalAPagar } from '@/assets/CalcularTotalAPagar';

const InfoCard = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const ResumenConsumo = ({ data, selectedTarifa, selectedPeriod }) => {
  if (!data) return null;

  const isToday = selectedPeriod === 'Hoy';

  const consumoArray = isToday
    ? Object.values(data.hoy || {})
    : Object.values(data.consumoHistorico || {});

  const consumoTotal = consumoArray.reduce((acc, val) => acc + val, 0);
  const consumoUltimo = consumoArray[consumoArray.length - 1] || 0;

  const bloques = tarifas[selectedTarifa];
  const preciosTarifa = precios[selectedTarifa];

  if (!bloques || !preciosTarifa) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Resumen del consumo</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No hay datos para esta tarifa</Text>
        </View>
      </View>
    );
  }

  const totalPagar = calcularTotalAPagar(
    consumoTotal,
    selectedTarifa,
    tarifas,
    precios
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del consumo</Text>
      <View style={styles.row}>
        <InfoCard title={isToday ? "Consumo total hoy" : "Consumo bimestral"} value={`${consumoTotal} m³`} />
        <InfoCard title={isToday ? "Última hora" : "Último mes"} value={`${consumoUltimo} m³`} />
      </View>
      <View style={styles.row}>
        <InfoCard title="Costo estimado" value={`$${totalPagar}`} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#BCC1CA',
    borderRadius: 10,
    padding: 12,
    margin: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: '#555',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ResumenConsumo;
