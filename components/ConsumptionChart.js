import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Toast from 'react-native-toast-message';


const screenWidth = Dimensions.get('window').width;

const simplifyLabels = (labels) => {
  return labels.map((label, index) => {
    // solo mostrar cada 3ro
    return index % 3 === 0 ? label.replace(':00', '') : '';
  });
};

const ConsumptionChart = ({ selectedPeriod, data }) => {
  if (!data) return null;

  let chartData = {
    labels: [],
    datasets: [{ data: [] }],
  };

  if (selectedPeriod === 'Hoy') {
    const horas = Object.keys(data.hoy || {}).sort((a, b) =>
      new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`)
    );

    chartData.labels = simplifyLabels(horas);
    chartData.datasets[0].data = horas.map((h) => data.hoy[h]);
  }

  if (selectedPeriod === 'Bimestral') {
    const meses = Object.keys(data.consumoHistorico || {});
    chartData.labels = meses;
    chartData.datasets[0].data = meses.map((m) => data.consumoHistorico[m]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consumo de agua (m³)</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={260}
        yAxisSuffix=" m³"
        fromZero
        withShadow
        withDots
        withInnerLines={false}
        withVerticalLabels
        withHorizontalLabels
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
          labelColor: () => '#6e6e6e',
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#4A90E2',
          },
        }}
        bezier
        style={styles.chart}
onDataPointClick={({ value, index }) => {
  const label = chartData.labels[index] || 'Hora desconocida';
  Toast.show({
    type: 'info',
    text1: `Consumo de las ${label}`,
    text2: `${value} m³`,
    visibilityTime: 2000,
    position: 'bottom',
  });
}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 12,
  },
});

export default ConsumptionChart;
