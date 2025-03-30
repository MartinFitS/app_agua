import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Picker } from "react-native-ui-lib"; // Importamos Picker de rnulib
import CircularProgress from "../../components/PieChart";

const HomeScreen = () => {
    const currentDate = "16 de marzo del 2025";

    const limiteConsumo = 100;
    const [consumoActual, setConsumoActual] = useState(100);

    const limiteGasto = 1000;
    const [gastoAcumulado, setGastoAcumulado] = useState(900);

    const [tarifa, setTarifa] = useState("Domestica A"); // Estado para el select

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* LOGO */}
            <Image source={require("../../assets/img/logo_udc.png")} style={styles.logo} />
            
            {/* Saludo */}
            <Text style={styles.saludo}>Bienvenida, Ariel Rosas 👋</Text>

            {/* Tarifa y fecha */}
            <View style={styles.tarifaRow}>
                {/* SELECTOR DE TARIFA CON RNUILIB */}
                <View style={styles.selectContainer}>
                    <Picker
                        placeholder="Selecciona una tarifa"
                        value={tarifa}
                        onChange={setTarifa}
                        topBarProps={{ title: "Selecciona una tarifa" }}
                        style={styles.picker}
                    >
                        <Picker.Item key="domestica" value="Domestica A" label="Doméstica A" />
                        <Picker.Item key="industrial" value="Industrial" label="Industrial" />
                        <Picker.Item key="comercial" value="Comercial" label="Comercial" />
                    </Picker>
                </View>

                <Text style={styles.fecha}>{currentDate}</Text>
            </View>

            {/* Consumo y Gasto */}
            <View style={styles.topRow}>
                <View style={[styles.card, { backgroundColor: '#702626' }]}>
                    <Text style={styles.cardTitle}>CONSUMO DEL DÍA</Text>
                    <CircularProgress value={consumoActual} max={limiteConsumo} color="#4A0E0E" backgroundColor="#8B3A3A" textColor={"white"} />
                </View>
                <View style={[styles.card, { backgroundColor: '#F5F7F8' }]}>
                    <Text style={styles.cardTitleGasto}>GASTO ACUMULADO</Text>
                    <CircularProgress value={gastoAcumulado} max={limiteGasto} color="#60D394" backgroundColor="#E0E0E0" textColor={"#5C5555"}/>
                </View>
            </View>

            {/* Última actualización */}
            <View style={styles.actualizacion}>
                <Text style={styles.actualizacionText}>Última actualización 10:43 am</Text>
            </View>

            {/* Tarifa actual */}
            <View style={styles.tarifaContainer}>
                <Text style={styles.tarifaHeader}>Tarifa actual</Text>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: "90%" }]} />
                </View>
                <View style={styles.progressLabels}>
                    <Text style={styles.progressValue}>90 m³</Text>
                    <Text style={styles.progressLimit}>Límite: 100 m³</Text>
                </View>
            </View>

            {/* Alerta */}
            <View style={styles.alerta}>
                <Text style={styles.alertaTitulo}>⚠️ Precaución</Text>
                <Text style={styles.alertaTexto}>El consumo actual supera los límites</Text>
                <Text style={styles.alertaSubTexto}>Posible fuga en un mingitorio</Text>
                <Text style={styles.alertaSubTexto}>Ve al apartado de analíticas para más información.</Text>
            </View>

        </ScrollView>
    );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        backgroundColor: "#fff",
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: "center",
        marginBottom: 10,
        marginTop: 50
    },
    saludo: {
        fontSize: 18,
        fontWeight: "300",
        textAlign: "left",
        marginTop: 16,
        marginBottom: 14,
    },
    tarifaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    selectContainer: {
        width: "45%",
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#6E6E6E",
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: "center",
    },
    picker: {
        fontSize: 14,
        color: "#6E6E6E",
    },
    fecha: {
        fontSize: 13,
        color: "#6E6E6E",
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    card: {
        width: (width - 40) / 2,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
    },
    cardTitle: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 10,
    },
    actualizacion: {
        backgroundColor: "#F5F7F8",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    actualizacionText: {
        fontSize: 14,
        color: "#6E6E6E",
    },
    cardTitleGasto:{
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#5C5555"
    },
    tarifaContainer: {
        backgroundColor: "#DDE5F1",
        padding: 15,
        borderRadius: 15,
    },
    tarifaHeader: {
        fontSize: 16,
        fontWeight: "bold",
    },
    progressBarContainer: {
        backgroundColor: "#B0C4DE",
        borderRadius: 10,
        height: 12,
        width: "100%",
        marginVertical: 10,
    },
    progressBar: {
        backgroundColor: "#4A90E2",
        height: "100%",
        borderRadius: 10,
    },
    progressLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    alerta: {
        backgroundColor: "#FCE4E4",
        padding: 15,
        borderRadius: 15,
        marginTop: 15,
    },
    alertaTitulo: {
        fontWeight: "bold",
    },
});

export default HomeScreen;