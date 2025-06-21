import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const DeviceSelector = ({ devices, onSelect, selectedDevice, size = 80, strokeWidth = 13 }) => {
    return (
        <View>
            <Text style={styles.title}>Otros Dispositivos</Text>
            <View style={styles.container}>
                {devices.map((device, index) => {
                    const radius = (size - strokeWidth) / 2;
                    const circumference = 2 * Math.PI * radius;
                    const progress = (device.value / device.max) * circumference;
                    const isSelected = selectedDevice?.name === device.name;
                    const strokeColor = isSelected ? '#4CAF50' : '#3C5DCB'; // verde si está seleccionado

                    return (
                        <TouchableOpacity key={index} onPress={() => onSelect(device)} style={styles.deviceContainer}>
                            <View style={styles.graphContainer}>
                                <Svg width={size} height={size}>
                                    <Circle
                                        cx={size / 2}
                                        cy={size / 2}
                                        r={radius}
                                        stroke="#E0E0E0"
                                        strokeWidth={strokeWidth}
                                        fill="none"
                                    />
                                    <Circle
                                        cx={size / 2}
                                        cy={size / 2}
                                        r={radius}
                                        stroke={strokeColor}
                                        strokeWidth={strokeWidth}
                                        fill="none"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={circumference - progress}
                                        strokeLinecap="round"
                                        rotation="-90"
                                        origin={`${size / 2}, ${size / 2}`}
                                    />
                                </Svg>
                                <Image source={device.icon} style={styles.icon} />
                            </View>
                            <Text style={styles.deviceName}>{device.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'light',
        marginBottom: 10,
        marginLeft: 11,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        paddingBottom: 20,
    },
    deviceContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    graphContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        width: 25,
        height: 25,
        tintColor: '#3E0E0E',
    },
    deviceName: {
        marginTop: 5,
    },
});

export default DeviceSelector;
