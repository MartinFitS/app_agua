import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const colores = ['#60D394', '#F7CB73', '#F18F01', '#F48FB1', '#E53935', '#8E24AA'];
const etiquetas = ['Básico', 'IL', 'IM', 'IH', 'H', 'S'];

const TarifaSegmentBar = ({ consumo = 0, tarifaId = 'DA', rangos = [] }) => {
  // Calcula acumulados
  const acumulados = rangos.slice(0, 6).reduce((acc, val, i) => {
    const totalPrevio = i === 0 ? 0 : acc[i - 1].to;
    acc.push({ from: totalPrevio, to: totalPrevio + val });
    return acc;
  }, []);

  const total = acumulados[acumulados.length - 1]?.to || 1;
  const consumoRelativo = Math.min((consumo / total) * 100, 100);

  const rangoActual = acumulados.findIndex(r => consumo >= r.from && consumo < r.to);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarifa actual</Text>
      <View style={styles.barContainer}>
        {acumulados.map((r, i) => {
          const ancho = ((r.to - r.from) / total) * 100;
          const activo = i === rangoActual;
          return (
            <View
              key={i}
              style={[styles.segmento, {
                width: `${ancho}%`,
                backgroundColor: colores[i],
                opacity: activo ? 1 : 0.4,
              }]}
            />
          );
        })}
        <View style={[styles.indicador, { left: `${consumoRelativo}%` }]} />
      </View>
  
      {/* NUEVO BLOQUE: etiqueta de rango */}
      <View style={styles.etiquetaRango}>
        <Text style={styles.etiquetaTexto}>Rango actual: {etiquetas[rangoActual]}</Text>
      </View>
  
      <View style={styles.infoBar}>
        <Text style={styles.valor}>{consumo} m³</Text>
        <Text style={styles.valor}>Límite: {total} m³</Text>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
    etiquetaRango: {
        marginTop: 8,
        alignItems: 'center',
      },
      etiquetaTexto: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
      },
  container: {
    marginTop: 0,
    backgroundColor: '#DDE5F1',
    borderRadius: 12,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  barContainer: {
    flexDirection: 'row',
    height: 14,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#e0e0e0',
  },
  segmento: {
    height: '100%',
  },
  indicador: {
    position: 'absolute',
    top: -6,
    width: 2,
    height: 24,
    backgroundColor: '#000',
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  valor: {
    fontSize: 13,
    color: '#444',
  },
});

export default TarifaSegmentBar;