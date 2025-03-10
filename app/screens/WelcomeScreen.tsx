import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={{ uri: "https://portal.ucol.mx/content/micrositios/188/image/Escudo2021/Dos_lineas/UdeC_2L_872.png" }} style={styles.logo} />

      {/* Texto de bienvenida */}
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.brandText}>Linear</Text>
      <Text style={styles.subtitle}>A place where you can track all your expenses and incomes...</Text>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          icon={() => <MaterialCommunityIcons name="google" size={20} color="#333" />}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => console.log("Google Login")}
        >
          Continue with Google
        </Button>

        <Button
          mode="outlined"
          icon={() => <MaterialCommunityIcons name="email-outline" size={20} color="#333" />}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => console.log("Email Login")}
        >
          Continue with Email
        </Button>
      </View>

      {/* Link de Login */}
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FC",
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  brandText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "flex-start",
  },
  buttonLabel: {
    fontSize: 16,
    textAlign: "left",
  },
  loginText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
