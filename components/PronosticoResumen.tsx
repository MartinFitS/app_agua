import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { precios, tarifas } from '@/assets/tarifas';
import { calcularTotalAPagar } from '@/assets/CalcularTotalAPagar';

const safeFixed = (value, decimals = 2) =>
  typeof value === 'number' ? value.toFixed(decimals) : 'N/D';

const PronosticoResumen = ({ selectedTarifa, periodo, onLoadingChange }) => {
  const [data, setData] = useState(null);
  const isAnual = periodo === 'anual';

  useEffect(() => {
    const fetchData = async () => {
      try {
        onLoadingChange?.(true); // Notifica que empieza a cargar

        const endpoint = isAnual
          ? 'https://api-tesis-7k22.onrender.com/consumo/pronostico-anual'
          : 'https://api-tesis-7k22.onrender.com/consumo/pronostico-mes-actual';
        const response = await axios.get(endpoint);
        setData(response.data);
      } catch (error) {
        console.error('Error al cargar datos de pronóstico:', error);
      } finally {
        onLoadingChange?.(false); // Notifica que terminó de cargar
      }
    };

    fetchData();
  }, [periodo]);

  if (!data) return null;

  const costoEstimado = calcularTotalAPagar(
    isAnual ? data.estimadoRestante : data.estimadoTotalMes,
    selectedTarifa,
    tarifas,
    precios
  );

  const porcentajeConsumo = isAnual
    ? data.consumoActual && data.estimadoTotalAnio
      ? Math.min((data.consumoActual / data.estimadoTotalAnio) * 100, 100).toFixed(0)
      : '0'
    : data.consumoActual && data.estimadoTotalMes
      ? Math.min((data.consumoActual / data.estimadoTotalMes) * 100, 100).toFixed(0)
      : '0';

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>
        {isAnual ? 'Progreso anual de consumo' : 'Progreso de consumo'}
      </Text>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${porcentajeConsumo}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {porcentajeConsumo}% del estimado {isAnual ? 'anual' : 'mensual'}
      </Text>

      <View style={styles.resumenContainer}>
        <Text style={styles.resumenTitle}>
          {isAnual ? 'Resumen anual' : 'Resumen mensual'}
        </Text>

        <View style={styles.resumenRow}>
          {isAnual ? (
            <>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Año:</Text>
                <Text style={styles.resumenValue}>{data.anio || 'N/D'}</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Meses registrados:</Text>
                <Text style={styles.resumenValue}>{data.mesesRegistrados || 'N/D'}</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Meses restantes:</Text>
                <Text style={styles.resumenValue}>{data.mesesRestantes || 'N/D'}</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Consumo actual:</Text>
                <Text style={styles.resumenValue}>
                  {safeFixed(data.consumoActual)} m³
                </Text>
              </View>
              <View style={[styles.resumenItem, styles.resaltado]}>
                <Text style={styles.resumenLabel}>Promedio mensual:</Text>
                <Text style={styles.resumenValue}>
                  {safeFixed(data.promedioMensual)} m³
                </Text>
              </View>
              <View style={[styles.resumenItem, styles.resaltado]}>
                <Text style={styles.resumenLabel}>Estimado restante:</Text>
                <Text style={styles.resumenValue}>
                  {safeFixed(data.estimadoRestante)} m³
                </Text>
              </View>
              <View style={[styles.resumenItem, styles.resaltado]}>
                <Text style={styles.resumenLabel}>Estimado fin de año:</Text>
                <Text style={styles.resumenValue}>
                  {safeFixed(data.estimadoTotalAnio)} m³
                </Text>
              </View>
              <View style={[styles.resumenItem, styles.resaltado]}>
                <Text style={styles.resumenLabel}>Costo total estimado:</Text>
                <Text style={styles.resumenValue}>
                  ${safeFixed(costoEstimado)}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Mes:</Text>
                <Text style={styles.resumenValue}>{data.mes || 'N/D'}</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Días registrados:</Text>
                <Text style={styles.resumenValue}>{data.diasRegistrados || 'N/D'}</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Días restantes:</Text>
                <Text style={styles.resumenValue}>{data.diasRestantes || 'N/D'}</Text>
              </View>
              <View style={styles.resumenItem}>
                <Text style={styles.resumenLabel}>Consumo actual:</Text>
                <Text style={styles.resumenValue}>
                  {safeFixed(data.consumoActual)} m³
                </Text>
              </View>
              <View style={[styles.resumenItem, styles.resaltado]}>
                <Text style={styles.resumenLabel}>Promedio diario:</Text>
                <Text style={styles.resumenValue}>
                  {safeFixed(data.promedioDiario)} m³
                </Text>
              </View>
              <View style={[styles.resumenItem, styles.resaltado]}>
                <Text style={styles.resumenLabel}>Estimado fin de mes:</Text>
                <Text style={styles.resumenValue}>
                  {safeFixed(data.estimadoTotalMes)} m³
                </Text>
              </View>
              <View style={[styles.resumenItem, styles.resaltado]}>
                <Text style={styles.resumenLabel}>Estimado restante:</Text>
                <Text style={styles.resumenValue}>
                  {safeFixed(data.estimadoRestante)} m³
                </Text>
              </View>
              <View style={[styles.resumenItem, styles.resaltado]}>
                <Text style={styles.resumenLabel}>Costo mensual estimado:</Text>
                <Text style={styles.resumenValue}>
                  ${safeFixed(costoEstimado)}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1F2937',
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 13,
    color: '#1E3A8A',
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'right',
  },
  resumenContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  resumenTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
    color: '#1F2937',
  },
  resumenRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resumenItem: {
    width: '48%',
    marginBottom: 14,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 10,
  },
  resumenLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  resumenValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E40AF',
    marginTop: 4,
  },
  resaltado: {
    backgroundColor: '#DBEAFE',
  },
});

export default PronosticoResumen;
