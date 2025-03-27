import React, { useState } from "react";
import { 
  View, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, 
  ScrollView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import { TextInput, Button, Checkbox, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener instalada esta librería

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [secureText, setSecureText] = useState(true); // Estado para ocultar/ver contraseña

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajusta la vista en iOS
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={require("../../assets/img/logo_udc.png")} style={styles.logo} />

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
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
              style={[styles.input, { flex: 1 }]}
              theme={{ colors: { primary: "#1D61E7", outline: "#adaba3" } }}
              mode="outlined"
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
              <Ionicons name={secureText ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.rememberContainer}>
              <Checkbox
                status={remember ? "checked" : "unchecked"}
                onPress={() => setRemember(!remember)}
                color="#1D61E7"
                uncheckedColor="gray"
              />
              <Text style={styles.rememberText} onPress={() => setRemember(!remember)}>
                Remember me
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Button mode="contained" style={styles.button} textColor="white" onPress={() => navigation.navigate("Main")}>
            Log In
          </Button>

          <Button mode="text" onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={{ color: "black" }}>Don't have an account? </Text> 
            <Text style={styles.registerText}>Sign Up</Text>
          </Button>
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
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    color: "black",
    fontSize: 14,
    marginLeft: 8,
  },
  forgotPassword: {
    color: "#1D61E7",
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    paddingVertical: 8,
    backgroundColor: "#1D61E7",
    borderRadius: 10,
  },
  registerText: {
    color: "#1D61E7",
    fontWeight: "bold",
  },
});

export default LoginScreen;
