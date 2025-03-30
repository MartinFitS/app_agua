import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Title } from 'react-native-paper';

const AlertSection = () => (
    <View style={styles.alertContainer}>
        <Title style={styles.alertTitle}>Alertas</Title>
        <View style={styles.alertContent}>
            <Ionicons name="warning-outline" size={24} color="red" />
            <Text style={styles.alertText}>El consumo actual supera los límites</Text>
        </View>
        <Title style={styles.alertTitle}>Alertas</Title>
        <View style={styles.alertContent}>
            <Ionicons name="warning-outline" size={24} color="red" />
            <Text style={styles.alertText}>El consumo actual supera los límites</Text>
        </View>
    </View>
    
);

const styles = StyleSheet.create({
    alertContainer: {
        padding: 10,
        backgroundColor: '#ffe5e5',
        borderRadius: 8,
        marginTop: 10,
    },
    alertTitle: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5, 
    },
    alertContent: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    alertText: {
        marginLeft: 10,
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AlertSection;
