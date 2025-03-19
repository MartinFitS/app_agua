import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const PieChartComponent = ({ data, centerText, backgroundColor }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <PieChart
                data={data}
                width={width / 2 - 20}
                height={200}
                chartConfig={{
                    backgroundColor,
                    backgroundGradientFrom: backgroundColor,
                    backgroundGradientTo: backgroundColor,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    strokeWidth: 2,
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false,
                }}
                accessor="population"
                backgroundColor="transparent"
                center={[50, 0]}
                absolute
                hasLegend={false}
                holeRadius={60}
                innerRadius={50}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                {centerText}
            </Text>
        </View>
    );
};

export default PieChartComponent;
