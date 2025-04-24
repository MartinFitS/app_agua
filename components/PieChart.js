import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({ value, max, color = '#3E0E0E', backgroundColor = '#8B3A3A', textColor = '#000', fondo = '#E0E0E0' }) => {
  const size = 120;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const target = (value / max) * circumference;
    Animated.timing(progress, {
      toValue: target,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [value, max]);

  const animatedStrokeDashoffset = progress.interpolate({
    inputRange: [0, circumference],
    outputRange: [circumference, 0],
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={fondo}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={animatedStrokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={{ position: 'absolute', fontSize: 13, fontWeight: '600', color: textColor }}>
        {value} / {max} m³
      </Text>
    </View>
  );
};

export default CircularProgress;
