import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const ConsumptionChart = ({ selectedPeriod }) => {
    // Datos para Consumo
    const consumoHoy = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{ data: [10, 5, 12, 8, 6, 10, 4] }],
    };

    const consumoBimestral = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
        datasets: [{ data: [50, 70, 60, 80] }],
    };

    // Datos para Pronóstico
    const pronosticoHoy = {
        labels: ['Mañana', 'Pasado', 'En 3 días', 'En 4 días'],
        datasets: [{ data: [15, 18, 12, 20] }],
    };

    const pronosticoBimestral = {
        labels: ['Próxima Semana', 'Próximo Mes'],
        datasets: [{ data: [120, 500] }],
    };

    // Seleccionar datos según el periodo y el tipo
    let chartData;
    if (selectedPeriod === 'Hoy') {
        chartData = consumoHoy; // Para Consumo Hoy
    } else if (selectedPeriod === 'Bimestral') {
        chartData = consumoBimestral; // Para Consumo Bimestral
    }

    return (
        <View style={styles.chartContainer}>
            <BarChart
                data={chartData}
                width={350}
                height={350}
                yAxisLabel=""
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
                    barPercentage: 0.5,
                }}
                style={styles.chart}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        alignItems: 'center',
    },
    chart: {
        borderRadius: 10,
    },
});

export default ConsumptionChart;
