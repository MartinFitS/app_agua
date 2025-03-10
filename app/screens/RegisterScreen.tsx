import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Registrarse</Text>
      <TextInput label="Nombre" mode="outlined" style={styles.input} />
      <TextInput label="Correo electrónico" mode="outlined" style={styles.input} />
      <TextInput label="Contraseña" mode="outlined" secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={() => console.log("Register")}>Registrarse</Button>
      <Button mode="text" onPress={() => navigation.navigate("Login")}>Ya tengo una cuenta</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { marginBottom: 20, textAlign: "center" },
  input: { marginBottom: 10 }
});

export default RegisterScreen;
