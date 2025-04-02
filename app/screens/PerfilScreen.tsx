import React from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { View, Text } from "react-native-ui-lib"; 
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const PerfilScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Contenido Scrollable */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Perfil</Text>
                <Image source={require("../../assets/img/logo_udc.png")} style={styles.profileImage} />
                
                {/* Información */}
                <Text style={styles.name}>Martin Serna Díaz</Text>
                <Text style={styles.email}>correo@correo.com</Text>
                <Text style={styles.phone}>#52 123 456 1234</Text>
            </ScrollView>

            {/* Botón de cerrar sesión Fijo en la parte inferior */}
            <View style={styles.buttonContainer}>
                <Button textColor="red" style={styles.logoutButton} onPress={() => navigation.navigate("Main")}>
                    Cerrar Sesión
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flexGrow: 1, 
        justifyContent: "flex-start", 
        alignItems: "center",
        padding: 16,
        paddingTop: 40, 
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderColor: 'grey',
        borderWidth: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        marginBottom: 8,
    },
    phone: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        width: "100%",
        padding: 16,
        marginBottom: 40,
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: 'white',
        borderColor: 'red',
        width: '50%',
        borderWidth: 2,
        borderRadius: 40,
        paddingVertical: 12,
        paddingHorizontal: 32,
    },
});

export default PerfilScreen;
