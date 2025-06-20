import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { precios, tarifas } from '@/assets/tarifas';
import { calcularTotalAPagar } from '@/assets/CalcularTotalAPagar';
import { ConsumoContext } from '@/contexts/ConsumoContext';

const InfoCard = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const ResumenConsumo = ({ selectedTarifa, selectedPeriod, data }) => {
  const { consumoDelDia, consumoHistorico } = useContext(ConsumoContext);

  const isToday = selectedPeriod === 'Hoy';

  const consumoMensual =
    data && data.datos && typeof data.datos.consumoTotal === 'number'
      ? data.datos.consumoTotal + consumoDelDia
      : consumoDelDia;




  const consumoTotal = isToday
    ? consumoDelDia
    : consumoHistorico
      ? Object.values(consumoHistorico).reduce((acc, val) => acc + val, 0)
      : 0;

  const consumoUltimo = isToday
    ? consumoDelDia
    : consumoHistorico
      ? Object.values(consumoHistorico).slice(-1)[0] || 0
      : 0;

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

  const totalPgarMensual = calcularTotalAPagar(
    consumoMensual,
    selectedTarifa,
    tarifas,
    precios
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del consumo</Text>
      <View style={styles.row}>
        <InfoCard
          title={isToday ? "Consumo total hoy" : "Consumo mensual"}
          value={isToday ? `${consumoTotal.toFixed(2)} m³` : `${consumoMensual.toFixed(2)} m³`}
        />

      </View>
      <View style={styles.row}>
        <InfoCard title="Costo estimado" value={isToday ? `$${totalPagar.toFixed(2)}` : `$${totalPgarMensual.toFixed(2)}`} />
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
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android
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
