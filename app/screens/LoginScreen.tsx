import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      {/* Botón de regreso */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Login</Text>
      </TouchableOpacity>
      
      {/* Logo */}
      <Image 
        source={{ uri: "https://cuerpoacademico67ucol.com.mx/wp-content/uploads/2023/07/udec_2l-izq_negro-3.png" }} 
        style={styles.logo} 
      />
      
      {/* Texto de bienvenida */}
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.subText}>Sign In to your account</Text>
      
      {/* Campo de Email */}
      <TextInput
        label="Email Address"
        mode="outlined"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      {/* Campo de Contraseña */}
      <TextInput
        label="Password"
        mode="outlined"
        style={styles.input}
        secureTextEntry={secureText}
        value={password}
        onChangeText={setPassword}
        right={<TextInput.Icon icon={secureText ? "eye-off" : "eye"} onPress={() => setSecureText(!secureText)} />}
      />
      
      {/* Forgot Password */}
      <TouchableOpacity onPress={() => console.log("Forgot Password Pressed")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      
      {/* Botón de Login */}
      <Button mode="contained" style={styles.loginButton} onPress={() => console.log("Login")}>Login</Button>
      
      {/* Link de Registro */}
      <Text style={styles.registerText}>
        Don't have an account? <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>Sign Up</Text>
      </Text>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  backText: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    color: "#B0B0B0",
    marginBottom: 0,
  },
  logo: {
    width: 120,
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: "right",
    color: "#D2691E",
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#283593",
    paddingVertical: 5,
    borderRadius: 10,
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "gray",
  },
  registerLink: {
    color: "#D2691E",
    fontWeight: "bold",
  },
});

export default LoginScreen;
