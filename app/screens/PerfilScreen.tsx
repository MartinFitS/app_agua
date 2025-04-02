import React from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const PerfilScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Card de información */}
                <View style={styles.card}>
                    <Image source={require("../../assets/img/logo_udc.png")} style={styles.profileImage} />
                    <Text style={styles.name}>Martin Serna Díaz</Text>
                    <Text style={styles.email}>correo@correo.com</Text>
                    <Text style={styles.phone}>#52 123 456 1234</Text>
                    <View style={styles.buttonContainer}>
                <Button
                    textColor="red"
                    style={styles.logoutButton}
                    onPress={() => navigation.navigate("Main")}
                >
                    Cerrar Sesión
                </Button>
            </View>
                </View>

                
            </ScrollView>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6f8", // fondo más suave
    },
    content: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        paddingTop: 40,
    },
    card: {
        marginTop: 40,
        backgroundColor: "white",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        width: "90%",
        minHeight: "85%", // << agrega esta línea
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        marginTop: 40,
        marginBottom: 25,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 12,
    },
    email: {
        fontSize: 16,
        color: "#555",
        marginBottom: 15,
    },
    phone: {
        fontSize: 16,
        color: "#555",
    },
    buttonContainer: {
        width: "100%",
        padding: 16,
        marginTop: 190,
        marginBottom: 30,
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "white",
        borderColor: "red",
        width: "60%",
        borderWidth: 2,
        borderRadius: 40,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
});

export default PerfilScreen;
