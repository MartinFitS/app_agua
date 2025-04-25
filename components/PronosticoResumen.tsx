import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { precios, tarifas } from '@/assets/tarifas';
import PronosticoBarChart from '@/components/GraphPronostico'; // Acomoda el path si es diferente

import { calcularTotalAPagar } from '@/assets/CalcularTotalAPagar';

const InfoCard = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const PronosticoResumen = ({ data, selectedTarifa, periodo }) => {
  if (!data || !data.consumoMensualActual || !data.consumoHistorico) return null;


  const isAnual = periodo === 'anual';
  const hoy = new Date();


  console.log(data)

  // === MES ACTUAL ===
  const valoresMesActual = Object.values(data.consumoMensualActual || {});
  const totalMesActual = valoresMesActual.reduce((acc, val) => acc + val, 0);

  //Promedio Mes Actual
  const promedioDiarioActual = totalMesActual / (valoresMesActual.length || 1);



  const diasDelMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
  // pRONOSTICO mES cONSUMO
  const consumoMesCompletoEstimado = promedioDiarioActual * diasDelMes;


  const costoEstimadoMensual = calcularTotalAPagar(
    consumoMesCompletoEstimado,
    selectedTarifa,
    tarifas,
    precios
  );

  // === ANUAL (historico excluyendo el mes actual si ya está incluido) ===
  const keysHistorico = Object.keys(data.consumoHistorico);
  const ultimoMes = keysHistorico[keysHistorico.length - 1];

  const valoresHistorico = Object.entries(data.consumoHistorico)
    .filter(([key]) => key !== ultimoMes)
    .map(([, val]) => val);

  const totalHistorico = valoresHistorico.reduce((acc, val) => acc + val, 0);
  const cantidadHistorico = valoresHistorico.length;

  const totalAcumulado = totalHistorico + totalMesActual;
  const totalMeses = cantidadHistorico + 1;

  //Promedio mensual de todo el año
  const promedioMensualHistorico = totalAcumulado / totalMeses;



  const mesActual = hoy.getMonth() + 1;
  const mesesRestantes = 12 - mesActual;
  const consumoProyectadoAnual = promedioMensualHistorico * mesesRestantes;

  //Proyectado anual
  console.log(consumoProyectadoAnual)

  const consumoFinalAnual = totalAcumulado + consumoProyectadoAnual;

  const costoEstimadoAnual = calcularTotalAPagar(
    consumoProyectadoAnual,
    selectedTarifa,
    tarifas,
    precios
  );

  // === Gráfica ===
  const chartLabels = isAnual
    ? ['Actual', 'Mayo', 'Junio', 'Julio']
    : ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];

  const chartData = isAnual
    ? [totalMesActual, promedioMensualHistorico, promedioMensualHistorico, promedioMensualHistorico]
    : [promedioDiarioActual, promedioDiarioActual, promedioDiarioActual, promedioDiarioActual];

  return (
    <View style={styles.container}>
        <Text style={styles.chartTitle}>Consumo vs Pronóstico</Text>
        <PronosticoBarChart labels={chartLabels} data={data} periodo={periodo}/>
      <Text style={styles.title}>Pronóstico de consumo</Text>

      <View style={styles.row}>
        <InfoCard title={isAnual ? 'Promedio Mensual' : 'Promedio Diario'} value={isAnual ? `${promedioMensualHistorico.toFixed(2)}m³`:`${promedioDiarioActual.toFixed(2)} m³`} />
      </View>

      <View style={styles.row}>
        <InfoCard
          title={isAnual ? 'Fin de año estimado' : 'Fin de mes estimado'}
          value={isAnual
            ? `${consumoFinalAnual.toFixed(2)} m³`
            : `${consumoMesCompletoEstimado.toFixed(2)} m³`}
        />
        <InfoCard
          title={isAnual ? 'Costo total estimado' : 'Costo mensual estimado'}
          value={`$${(isAnual ? costoEstimadoAnual : costoEstimadoMensual).toFixed(2)}`}
        />
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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

export default PronosticoResumen;
