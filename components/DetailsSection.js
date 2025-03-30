import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsSection = ({ selectedTariff, selectedPeriod, viewType }) => {
  // Datos para consumo según tarifa 
  const consumoHoy = {
    'Tarifa 1': {
      consumptionPerDay: '20 m³',
      averageConsumption: '22 m³',
      currentCost: '$150',
    },
    'Tarifa 2': {
      consumptionPerDay: '18 m³',
      averageConsumption: '20 m³',
      currentCost: '$130',
    },
    'Tarifa 3': {
      consumptionPerDay: '22 m³',
      averageConsumption: '24 m³',
      currentCost: '$160',
    },
  };

  const consumoBimestral = {
    'Tarifa 1': {
      consumptionPerBimonth: '350 m³',
      averageConsumption: '340 m³',
      currentCost: '$2700',
    },
    'Tarifa 2': {
      consumptionPerBimonth: '320 m³',
      averageConsumption: '310 m³',
      currentCost: '$2600',
    },
    'Tarifa 3': {
      consumptionPerBimonth: '380 m³',
      averageConsumption: '375 m³',
      currentCost: '$2900',
    },
  };

  // Datos para pronóstico según tarifa 
  const pronosticoHoy = {
    'Tarifa 1': {
      consumptionPerDay: '18 m³',
      averageConsumption: '19 m³',
      currentCost: '$140',
      nextDay: '18 m³',
      nextWeek: '120 m³',
      nextMonth: '500 m³',
      estimatedCost: '$250',
    },
    'Tarifa 2': {
      consumptionPerDay: '16 m³',
      averageConsumption: '17 m³',
      currentCost: '$125',
      nextDay: '15 m³',
      nextWeek: '100 m³',
      nextMonth: '450 m³',
      estimatedCost: '$200',
    },
    'Tarifa 3': {
      consumptionPerDay: '20 m³',
      averageConsumption: '21 m³',
      currentCost: '$150',
      nextDay: '20 m³',
      nextWeek: '130 m³',
      nextMonth: '550 m³',
      estimatedCost: '$300',
    },
  };

  const pronosticoBimestral = {
    'Tarifa 1': {
      nextBimonth: '700 m³',
      estimatedCost: '$5000',
    },
    'Tarifa 2': {
      nextBimonth: '650 m³',
      estimatedCost: '$4800',
    },
    'Tarifa 3': {
      nextBimonth: '750 m³',
      estimatedCost: '$5400',
    },
  };

  // Determinación de los datos a mostrar según periodo y tipo de vista (consumo o pronóstico)
  let details;
  if (viewType === 'Consumo') {
    if (selectedPeriod === 'Hoy') {
      details = consumoHoy[selectedTariff];
      return (
        <View style={styles.detailsContainer}>
          <Text style={styles.titleDetalles}>Detalles</Text>
          <View style={styles.rowTop}>
            <InfoCard title="Consumo por día" value={details.consumptionPerDay} fullWidth />
            <InfoCard title="Promedio de consumo por día" value={details.averageConsumption} fullWidth />
          </View>
          <View style={styles.rowBottom}>
            <InfoCard title="Costo actual" value={details.currentCost} fullWidth />
          </View>
        </View>
      );
    } else if (selectedPeriod === 'Bimestral') {
      details = consumoBimestral[selectedTariff];
      return (
        <View style={styles.detailsContainer}>
          <Text style={styles.titleDetalles}>Detalles</Text>
          <View style={styles.rowTop}>
            <InfoCard title="Consumo en bimestre" value={details.consumptionPerBimonth} fullWidth />
            <InfoCard title="Promedio de consumo" value={details.averageConsumption} fullWidth />
          </View>
          <View style={styles.rowBottom}>
            <InfoCard title="Costo actual" value={details.currentCost} fullWidth />
          </View>
        </View>
      );
    }
  } else if (viewType === 'Pronostico') {
    if (selectedPeriod === 'Hoy') {
      details = pronosticoHoy[selectedTariff];
      return (
        <View style={styles.detailsContainer}>
          <Text style={styles.titleDetalles}>Detalles</Text>
          <View style={styles.rowTop}>
            <InfoCard title="Consumo de agua mañana" value={details.nextDay} fullWidth />
            <InfoCard title="Consumo de agua la próxima semana" value={details.nextWeek} fullWidth />
          </View>
          <View style={styles.rowBottom}>
            <InfoCard title="Consumo de agua el próximo mes" value={details.nextMonth} fullWidth />
            <InfoCard title="Gasto aproximado" value={details.estimatedCost} fullWidth />
          </View>
        </View>
      );
    } else if (selectedPeriod === 'Bimestral') {
      details = pronosticoBimestral[selectedTariff];
      return (
        <View style={styles.detailsContainer}>
          <Text style={styles.titleDetalles}>Detalles</Text>
          <View style={styles.rowTop}>
            <InfoCard title="Consumo de agua en bimestre" value={details.nextBimonth} fullWidth />
          </View>
          <View style={styles.rowBottom}>
            <InfoCard title="Gasto aproximado" value={details.estimatedCost} fullWidth />
          </View>
        </View>
      );
    }
  }

  return null;
};

const InfoCard = ({ title, value, fullWidth }) => (
  <View style={[styles.infoCard, fullWidth && styles.fullWidth]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: 10,
    alignItems: 'center',
    margin: 10,
  },
  titleDetalles: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    alignSelf: 'flex-start',
    color: '#000',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  infoCard: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#BCC1CA',
    borderWidth: 1,
  },
  halfWidth: {
    width: '50%',
  },
  fullWidth: {
    width: '50%',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailsSection;
