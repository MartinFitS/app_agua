import AlertSection from "@/components/AlertSection";
import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import DeviceGraph from "../../components/DeviceConsumption";
import DeviceSelector from "../../components/DeviceSelector";
import PeriodSelector from "../../components/PeriodSelector";

const AnalisisScreen = () => {

    const devices = [
        { name: 'Baño', value: 40, max: 100, icon: require('../../assets/img/bano.png') },
        { name: 'Lavamanos', value: 20, max: 100, icon: require('../../assets/img/lavamanos.png') },
        { name: 'Llave', value: 60, max: 100, icon: require('../../assets/img/llave.png') },
    ];

    const [selectedDevice, setSelectedDevice] = useState(devices[0]);
    const [selectedPeriod, setSelectedPeriod] = useState('Hoy');  

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
        // Aquí puedes agregar lógica adicional si es necesario para actualizar los datos según el periodo
    };

    console.log(selectedDevice)

    return (
        <ScrollView style={styles.container}>
            <View>
                {/* Pasar las propiedades de periodo y cambio de periodo */}
                <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={handlePeriodChange} />
                <DeviceGraph value={selectedDevice.value} name={selectedDevice.name} max={selectedDevice.max} />
             

<DeviceSelector
  devices={devices}
  selectedDevice={selectedDevice}
  onSelect={setSelectedDevice}
/>
                <AlertSection />
            </View>
        </ScrollView>
    );
};

const styles = {
container: {
    paddingTop: 55,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
}
}

export default AnalisisScreen;
