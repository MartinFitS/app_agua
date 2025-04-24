import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    const validEmail = "admin@ucol.mx";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      setErrorMessage("");
      navigation.navigate("Main");
    } else {
      setErrorMessage("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post("https://TU_DOMINIO/api/login", {
  //       email,
  //       password,
  //     });
  
  //     if (response.data.success) {
  //       setErrorMessage("");
  //       navigation.navigate("Main");
  //     } else {
  //       setErrorMessage("Credenciales incorrectas. Intenta nuevamente.");
  //     }
  //   } catch (error) {
  //     console.error("Error al iniciar sesión:", error);
  //     setErrorMessage("Error del servidor. Intenta más tarde.");
  //   }
  // };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require("../../assets/img/logo_udc.png")}
            style={styles.logo}
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            theme={{ colors: { primary: "#1D61E7", outline: "#adaba3" } }}
            mode="outlined"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
              style={[styles.input, { flex: 1 }]}
              theme={{ colors: { primary: "#1D61E7", outline: "#adaba3" } }}
              mode="outlined"
            />
            <TouchableOpacity
              onPress={() => setSecureText(!secureText)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={secureText ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#1D61E7"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.infoText}>
                Usa tus credenciales institucionales del sistema SICEUC para iniciar sesión.
              </Text>
            </View>
          </View>

          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <Button
            mode="contained"
            style={styles.button}
            textColor="white"
            onPress={handleLogin}
          >
            Iniciar Sesión
          </Button>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              ¿No tienes cuenta?{" "}
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate("Register")} // Cambia "Register" por la ruta correspondiente
              >
                Regístrate aquí
              </Text>
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Developed by</Text>
            <Text style={styles.footerText}>@MartinFits & @arielrosasc</Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 50,
  },
  input: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  infoBox: {
    width: "100%",
    marginBottom: 12,
    backgroundColor: "#E8F0FE",
    padding: 10,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    color: "#1D61E7",
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  button: {
    width: "100%",
    paddingVertical: 8,
    backgroundColor: "#1D61E7",
    borderRadius: 10,
    marginTop: 5,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#999",
    fontSize: 13,
  },
  registerContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  registerText: {
    color: "#555",
    fontSize: 14,
  },
  registerLink: {
    color: "#1D61E7",
    fontWeight: "bold",
  }  
});

export default LoginScreen;
