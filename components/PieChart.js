import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({ value, max, color = '#3E0E0E', backgroundColor = '#8B3A3A', textColor }) => {
    const size = 120; // Tamaño del círculo
    const strokeWidth = 15;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * circumference;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Svg width={size} height={size}>
                {/* Círculo de fondo */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#E0E0E0" // Color de fondo más claro
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Círculo de progreso */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
            <Text style={{ position: 'absolute', fontSize: 18, fontWeight: 'light', color: textColor }}>
                {value} m³
            </Text>
        </View>
    );
};

export default CircularProgress;
