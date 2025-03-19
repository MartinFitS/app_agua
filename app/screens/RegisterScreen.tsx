import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { TextInput, Button, Checkbox, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; 

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Registrarse</Text>
      <TextInput label="Nombre" style={styles.input} theme={{ colors: { primary: "black", text: "white" } }}/>
      <TextInput label="Correo electrónico"style={styles.input} theme={{ colors: { primary: "black", text: "white" } }}/>
      <TextInput label="Contraseña" secureTextEntry style={styles.input} theme={{ colors: { primary: "black", text: "white" } }}/>
      <TextInput label="Confirmar Contraseña"  secureTextEntry style={styles.input} theme={{ colors: { primary: "black", text: "white" } }}/>
      <Button mode="contained" style={styles.button} textColor="white" onPress={() => console.log("Register")}>Registrarse</Button>
      <Button mode="text"  onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "black"}}>Ya tengo una cuenta, </Text>
        <Text style={{ color: "#1D61E7"}}>Iniciar sesión </Text>
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
  title: {
    color: "black",
    marginBottom: 55,
  },
  input: {
    width: "100%",
    marginBottom: 25,
    backgroundColor: "white",
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    marginBottom: 20,
    marginTop: 40,
    backgroundColor: "#1D61E7",
  },
});


export default RegisterScreen;
