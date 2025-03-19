import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, Image, ScrollView } from "react-native";
import BottomMenu from "../../components/BottomMenu";
import PieChartComponent from "../../components/PieChart";  

const HomeScreen = () => {
    const currentDate = new Date().toLocaleDateString(); 

    // Datos de ejemplo para consumo y gasto
    const limiteConsumo = 100; // Límite máximo de consumo
    const [consumoActual, setConsumoActual] = useState(60); // Consumo actual en porcentaje

    const limiteGasto = 150; // Límite máximo de gasto
    const [gastoAcumulado, setGastoAcumulado] = useState(100); // Gasto acumulado

    // Datos para el gráfico de consumo
    const consumoData = [
        {
            name: "Consumo",
            population: consumoActual,
            color: "#79BC8E",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Restante",
            population: limiteConsumo - consumoActual,
            color: "#E0E0E0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    // Datos para el gráfico de gasto
    const gastoData = [
        {
            name: "Gasto",
            population: gastoAcumulado,
            color: "#F76C5E",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Restante",
            population: limiteGasto - gastoAcumulado,
            color: "#E0E0E0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Logo */}
            <Image
                source={require("../../assets/img/logo_udc.png")}
                style={styles.logo}
            />

            {/* Tarifa y Fecha */}
            <View style={styles.topRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Seleccionar Tarifa"
                    placeholderTextColor="gray"
                />
                <Text style={styles.date}>{currentDate}</Text>
            </View>

            {/* Contenedores abajo */}
            <View style={styles.topRow}>
                <View style={styles.consumo}>
                    <Text style={styles.text}>CONSUMO DEL DÍA</Text>
                    <PieChartComponent
                        data={consumoData}
                        centerText={`${consumoActual}m/3`}
                        backgroundColor="#79BC8E"
                    />
                </View>
                <View style={styles.gasto}>
                    <Text style={styles.text}>GASTO ACUMULADO</Text>
                    <PieChartComponent
                        data={gastoData}
                        centerText={`$${gastoAcumulado}`}
                        backgroundColor="#F76C5E"
                    />
                </View>
            </View>

            <View style={styles.actualizacion}>
                <Text style={styles.text}>ÚLTIMA ACTUALIZACIÓN: 10:40 AM</Text>
            </View>

            <View style={styles.tarifa}>
                <Text style={styles.text}>Tarifa actual</Text>
                {/* Barra de consumo */}
                <View style={styles.progressContainer}>
                    <View
                        style={[styles.progressBar, { width: (consumoActual / limiteConsumo) * 100 + '%' }]}
                    />
                    <Text style={styles.progressText}>{consumoActual} / {limiteConsumo}</Text>
                </View>
            </View>

            <View style={styles.alerta}>
                <Text style={styles.text}>Alerta</Text>
            </View>

            {/* Bottom Menu */}
            <BottomMenu />
        </ScrollView>
    );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        alignSelf: "center",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    input: {
        width: (width - 30) / 2,
        height: 40,
        backgroundColor: "#DAE6ED",
        borderRadius: 5,
        paddingLeft: 10,
        color: "black",
    },
    date: {
        width: (width - 30) / 2,
        height: 40,
        backgroundColor: "#DAE6ED",
        borderRadius: 5,
        textAlign: "center",
        lineHeight: 40,
        color: "black",
        fontWeight: "bold",
    },
    consumo: {
        width: (width - 30) / 2,
        height: 280,
        backgroundColor: "#79BC8E",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        position: "relative",
    },
    gasto: {
        width: (width - 30) / 2,
        height: 280,
        backgroundColor: "#F76C5E",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        position: "relative",
    },
    actualizacion: {
        height: 40,
        backgroundColor: "#F0F6F",
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    tarifa: {
        width: width - 20,
        height: 140,
        backgroundColor: "#DAE6ED",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    alerta: {
        width: width - 20,
        height: 100,
        marginTop: 10,
        backgroundColor: "#ADFFCE",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    text: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
    progressContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    progressBar: {
        height: 10,
        backgroundColor: "#4CAF50",
        borderRadius: 5,
        marginRight: 10,
    },
    progressText: {
        fontSize: 16,
        fontWeight: "bold",
    }
});

export default HomeScreen;
