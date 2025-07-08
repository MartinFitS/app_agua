import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

type Props = {
  tipoFactura: 'Hoy' | 'Bimestral';
};

const HeaderSection = ({ tipoFactura }: Props) => {

    console.log(tipoFactura)
    const descargarFactura = async () => {
      try {
        const hoy = new Date();
        const fechaStr = hoy.toISOString().split('T')[0];
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0');
        const inicioStr = `${year}-${month}-01`;
    
        const endpoint =
          tipoFactura === 'Hoy'
            ? `https://api-tesis-7k22.onrender.com/consumo/reporte/daily?fecha=${fechaStr}`
            : `https://api-tesis-7k22.onrender.com/consumo/reporte/pdf?inicio=${inicioStr}&fin=${fechaStr}`;
    
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Error al generar la factura');
    
        const blob = await response.blob();
        const reader = new FileReader();
    
        reader.onloadend = async () => {
          const base64data = reader.result?.toString().split(',')[1];
    
          const path = FileSystem.documentDirectory + `factura-${tipoFactura}.pdf`;
          await FileSystem.writeAsStringAsync(path, base64data!, {
            encoding: FileSystem.EncodingType.Base64,
          });
    
          await Sharing.shareAsync(path);
        };
    
        reader.readAsDataURL(blob);
      } catch (error) {
        Alert.alert('Error', 'No se pudo generar la factura');
        console.error(error);
      }
    };
    
    

  return (
    <View style={styles.header}>
      <Ionicons name="information-circle-outline" size={24} color="black" />
      <TouchableOpacity style={styles.button} onPress={descargarFactura}>
        <Text style={styles.buttonText}>Descargar resumen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 40,
    borderRadius: 10,
    marginBottom: 10,
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
  },
});

export default HeaderSection;
