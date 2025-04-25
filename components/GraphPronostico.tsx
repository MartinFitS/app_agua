import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Toast from 'react-native-toast-message';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

const PronosticoBarChart = ({ data, periodo }) => {
  if (!data) return null;

  const isAnual = periodo === 'anual';

  const fechasOrdenadas = isAnual
    ? Object.keys(data.consumoHistorico || {})
    : Object.keys(data.consumoMensualActual || {}).sort();

  const valores = isAnual
    ? fechasOrdenadas.map((fecha) => data.consumoHistorico[fecha])
    : fechasOrdenadas.map((fecha) => data.consumoMensualActual[fecha]);

  const chartData = {
    labels: Array(valores.length).fill(''),
    datasets: [{ data: valores }],
  };

  // Animación Reanimated
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    translateY.value = withTiming(0, { duration: 600 });
  }, []);

  return (
    <Animated.View style={[animatedStyle, { alignSelf: 'center' }]}>
      <LineChart
        data={chartData}
        width={screenWidth - 38} // perfecto para que se vea centrado
        height={220}
        fromZero
        withDots
        withInnerLines
        withOuterLines
        withVerticalLabels={true}
        withHorizontalLabels={true}
        yAxisSuffix=" m³"
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
          labelColor: () => '#333',
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#4A90E2',
          },
        }}
        bezier
        style={{ borderRadius: 12 }}
        onDataPointClick={({ index, value }) => {
          const fecha = fechasOrdenadas[index] || 'Fecha desconocida';
          Toast.show({
            type: 'info',
            text1: `Consumo de ${fecha}`,
            text2: `${value} m³`,
            visibilityTime: 2000,
            position: 'bottom',
          });
        }}
      />
    </Animated.View>
  );
};

export default PronosticoBarChart;
