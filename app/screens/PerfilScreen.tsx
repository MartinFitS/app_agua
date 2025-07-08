import React, { useContext } from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "@/contexts/AuthContext";

const PerfilScreen = () => {
    const { user, logout } = useContext(AuthContext);
    const navigation = useNavigation();

    if (!user) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
                    <Text style={styles.name}>{user.username}</Text>
                    <Text style={styles.email}>{user.correo_institucional}</Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            textColor="red"
                            style={styles.logoutButton}
                            onPress={async () => {
                                await logout();
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Auth" as never }],
                                });
                            }}
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
        backgroundColor: "#f4f6f8",
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
        minHeight: "85%",
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 90,
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
