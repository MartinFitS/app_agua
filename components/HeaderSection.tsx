import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HeaderSection = () => (
    <View style={styles.header}>
        <Ionicons name="information-circle-outline" size={24} color="black" /> 
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Descargar factura</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginTop: 40,
        borderRadius: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#4a90e2',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default HeaderSection;
