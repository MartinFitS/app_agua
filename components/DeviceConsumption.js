import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const DeviceGraph = ({ value, max, deviceName, size = 240, strokeWidth = 30, color = '#2751DB', backgroundColor = '#E0E0E0', textColor = '#000' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * circumference;

    return (
        <View style={styles.container}>
            <Text style={styles.deviceTitle}>Dispositivo: {deviceName}</Text>
            <View style={styles.graphWrapper}>
                <Svg width={size} height={size}>
                    <Circle cx={size / 2} cy={size / 2} r={radius} stroke={backgroundColor} strokeWidth={strokeWidth} fill="none" />
                    <Circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={circumference - progress} strokeLinecap="round" rotation="-90" origin={`${size / 2}, ${size / 2}`} />
                </Svg>
                <Text style={styles.valueText}>{value} m³</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', justifyContent: 'center', paddingBottom: 20 },
    deviceTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    graphWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
    valueText: { position: 'absolute', fontSize: 36, fontWeight: 'bold', color: '#000' }
});

export default DeviceGraph;
