import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import { Picker } from "react-native-ui-lib";
import CircularProgress from "../../components/PieChart";
import AlertSection from "@/components/AlertSection";
import dayjs from "dayjs";
import "dayjs/locale/es";
import mockData from "@/assets/mockData.json";
import { tarifas, precios } from "@/assets/tarifas";
import { calcularRangosConsumo, getColorPorRango } from "@/assets/calculosConsumo";
import { calcularTotalAPagar } from "@/assets/CalcularTotalAPagar";
import TarifaSegmentBar from "@/components/TarifaSegmentedBar";
import { AuthContext } from "@/contexts/AuthContext";
import { ConsumoContext } from "@/contexts/ConsumoContext";

type TarifaCode = keyof typeof tarifas;

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const { consumoDelDia, horaActualizacion } = useContext(ConsumoContext);

  const { tarifas: tarifasDisponibles } = mockData;

  const currentDate = dayjs().locale("es").format("D [de] MMMM [del] YYYY");
  const [selectedTarifa, setSelectedTarifa] = React.useState<TarifaCode>('DA');


  const selectedTarifaCode = selectedTarifa || "DA";

  const rangos = {
    ...calcularRangosConsumo(consumoDelDia, selectedTarifaCode, tarifas)
  };
  const colorDinamico = getColorPorRango(consumoDelDia, selectedTarifaCode, tarifas);

  const limiteConsumo = tarifas[selectedTarifaCode].slice(0, 5).reduce((a, b) => a + b, 0);
  const totalAPagar = calcularTotalAPagar(consumoDelDia, selectedTarifaCode, tarifas, precios);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../assets/img/logo_udc.png")} style={styles.logo} />
      <Text style={styles.saludo}> Bienvenido, {user?.username ?? "Invitado"} 👋</Text>

      <View style={styles.tarifaRow}>
        <View style={styles.selectContainer}>
          <Picker
            placeholder="Selecciona una tarifa"
            value={selectedTarifa}
            onChange={setSelectedTarifa as any}
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
        <View style={[styles.card, { backgroundColor: colorDinamico }]}>
          <Text style={styles.cardTitle}>CONSUMO DEL DÍA</Text>
          <CircularProgress
            value={consumoDelDia.toFixed(2)}
            max={limiteConsumo}
            color="white"
            backgroundColor="#E0E0E0"
            textColor="white"
            fondo={colorDinamico}
          />
        </View>
        <View style={[styles.card, { backgroundColor: '#F5F7F8' }]}>
          <Text style={styles.cardTitleGasto}>GASTO ACUMULADO</Text>
          <View>
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
        consumo={consumoDelDia.toFixed(2) as any}
        tarifaId={selectedTarifaCode}
        rangos={tarifas[selectedTarifaCode] as any}
      />

      {rangos?.S > 0 && (
        <AlertSection mensajes={["El consumo actual supera los límites permitidos"] as any} tipo="ALTO" />
      )}

      {rangos?.H > 0 && rangos?.S === 0 && (
        <AlertSection mensajes={["Estás en la zona alta de consumo. Considera reducirlo."] as any} tipo="MEDIO" />
      )}

      {rangos?.B > 0 && rangos?.IL === 0 && (
        <AlertSection mensajes={["Buen trabajo, consumo dentro del rango básico."] as any} tipo="BAJO" />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
});

export default HomeScreen;
