import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const PronosticoLineChart = ({ labels, data }) => {
  return (
    <LineChart
      data={{
        labels,
        datasets: [
          {
            data,
            strokeWidth: 2,
          },
        ],
      }}
      width={screenWidth - 32}
      height={220}
      fromZero
      bezier
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#f8fafc',
        backgroundGradientTo: '#f8fafc',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
          r: '3',
          strokeWidth: '1',
          stroke: '#1E40AF',
        },
        propsForBackgroundLines: {
          stroke: '#e2e8f0',
        },
      }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default PronosticoLineChart;
