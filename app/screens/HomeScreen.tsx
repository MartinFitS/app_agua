import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Picker } from "react-native-ui-lib";
import CircularProgress from "../../components/PieChart";
import AlertSection from "@/components/AlertSection";
import dayjs from "dayjs";
import "dayjs/locale/es";
import mockData from "@/assets/mockData.json";
import { tarifas, precios } from "@/assets/tarifas";
import { calcularRangosConsumo, getColorPorRango } from "@/assets/calculosConsumo";
import {calcularTotalAPagar} from "@/assets/CalcularTotalAPagar"
import TarifaSegmentBar from "@/components/TarifaSegmentedBar";
import { AuthContext } from "@/contexts/AuthContext";

const HomeScreen = () => {
const { user, token, login, logout } = useContext(AuthContext);
  console.log("contexto",user)
  const {
    usuario,
    tarifas: tarifasDisponibles,
    consumoDelDia,
    limiteGasto,
    progresoTarifa,
    limiteTarifa,
    horaActualizacion,
  } = mockData;

  const currentDate = dayjs().locale("es").format("D [de] MMMM [del] YYYY");
  const [selectedTarifa, setSelectedTarifa] = useState(
    tarifasDisponibles.length ? tarifasDisponibles[0].code : "DA"
  );
  
  const selectedTarifaCode = selectedTarifa || "DA";
  const rangos = {
    B: 0, IL: 0, IM: 0, IH: 0, H: 0, S: 0,
    ...calcularRangosConsumo(consumoDelDia, selectedTarifaCode, tarifas)
  };
  const colorDinamico = getColorPorRango(consumoDelDia, selectedTarifaCode, tarifas);

  const limiteConsumo = tarifas[selectedTarifaCode].slice(0, 5).reduce((a, b) => a + b, 0);

  const totalAPagar = calcularTotalAPagar(consumoDelDia, selectedTarifaCode, tarifas, precios);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/img/logo_udc.png")} style={styles.logo} />
      <Text style={styles.saludo}> Bienvenida, {user?.username ?? "Invitado"} 👋</Text>

      <View style={styles.tarifaRow}>
        <View style={styles.selectContainer}>
          <Picker
            placeholder="Selecciona una tarifa"
            value={selectedTarifa}
            onChange={setSelectedTarifa}
            topBarProps={{ title: "Selecciona una tarifa" }}
            style={styles.picker}
          >
            {tarifasDisponibles.map((t, i) => (
              <Picker.Item key={i} value={t.code} label={t.label} />
            ))}
          </Picker>
        </View>
        <Text style={styles.fecha}>{currentDate}</Text>
      </View>

      <View style={styles.topRow}>
        <View style={[styles.card, { backgroundColor: colorDinamico }]}>  {/* Dinámico */}
          <Text style={styles.cardTitle}>CONSUMO DEL DÍA</Text>
          <CircularProgress
            value={consumoDelDia}
            max={limiteConsumo}
            color="white"
            backgroundColor="#E0E0E0"
            textColor="white"
            fondo={colorDinamico}
          />
        </View>
        <View style={[styles.card, { backgroundColor: '#F5F7F8' }]}>
          <Text style={styles.cardTitleGasto}>GASTO ACUMULADO</Text>
          <View style={[styles.card, { backgroundColor: '#F5F7F8' }]}>
  <Text style={{ fontWeight: "bold", fontSize: 22, color: "#000" }}>
    ${totalAPagar}
  </Text>
</View>
        </View>
      </View>

      <View style={styles.actualizacion}>
        <Text style={styles.actualizacionText}>Última actualización {horaActualizacion}</Text>
      </View>

      <TarifaSegmentBar
            consumo={consumoDelDia}
            tarifaId={selectedTarifaCode}
            rangos={tarifas[selectedTarifaCode]}
        />

      {/* Alertas según el rango más alto alcanzado */}
      {rangos?.S > 0 && (
        <View>
          <AlertSection mensajes={["El consumo actual supera los límites permitidos"]} />
        </View>
      )}

      {rangos?.H > 0 && rangos?.S === 0 && (
        <View>
          <AlertSection mensajes={["Estás en la zona alta de consumo. Considera reducirlo."]} />
        </View>
      )}

      {rangos?.B > 0 && rangos?.IL === 0 && (
        <View>
          <AlertSection mensajes={["Buen trabajo, consumo dentro del rango básico."]} />
        </View>
      )}

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
    marginTop: 50,
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
  cardTitleGasto: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 28,
    color: "#5C5555",
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
  progressValue: {
    fontSize: 12,
    fontWeight: "bold",
  },
  progressLimit: {
    fontSize: 12,
    color: "#555",
  },
});

export default HomeScreen;
