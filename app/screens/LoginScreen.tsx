import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { TextInput, Button, Checkbox, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; 

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/img/logo_udc.png")} style={styles.logo} />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        theme={{ colors: { primary: "#1D61E7", text: "black" } }}
      />

      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        theme={{ colors: { primary: "#1D61E7", text: "black" } }}
      />

      <View style={styles.row}>
        <View style={styles.rememberContainer}>
          <Checkbox
            status={remember ? "checked" : "unchecked"}
            onPress={() => setRemember(!remember)}
            color="#1D61E7"
            uncheckedColor="gray"
          />
          <Text style={{ color: "black" }} onPress={() => setRemember(!remember)}>
            Recordar contraseña
          </Text>
        </View>

        <Text style={styles.forgot} onPress={() => navigation.navigate("")}>
          ¿Olvidaste tu contraseña?
        </Text>
      </View>

      <Button mode="contained" style={styles.button} textColor="white" onPress={() => navigation.navigate("HomeScreen")}>
        Iniciar sesión
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate("RegisterScreen")}
        contentStyle={{ flexDirection: "row" }}
      >
        <Text style={{ color: "black" }}>¿No tienes una cuenta? </Text> 
        <Text style={{ color: "#1D61E7", fontWeight: "bold" }}>Regístrate</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 80,
  },
  input: {
    width: "100%",
    marginBottom: 25,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "100%",
    marginBottom: 20,
    marginTop: 40,
    backgroundColor: "#1D61E7",
  },
  forgot: {
    color: "#1D61E7",
    fontWeight: "bold",
    paddingLeft: 10,
  },
});

export default LoginScreen;
