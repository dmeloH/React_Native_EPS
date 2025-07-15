import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert,
    SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import api from "../../Src/Servicios/conexion";
import { logoutUser } from "../../Src/Servicios/AuthService";

/**
 * Pantalla de perfil del usuario autenticado.
 * Muestra información básica como nombre, correo y rol.
 * Permite cerrar sesión y (en el futuro) editar el perfil.
 */
export default function PantallaPerfil({ navigation }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    /**
     * Efecto que se ejecuta al montar la pantalla.
     * Verifica la existencia del token, solicita los datos del usuario al backend
     * y gestiona distintos escenarios de error.
     */
    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    navigation.replace("Login");
                    return;
                }

                const response = await api.get("/me");
                setUsuario(response.data);
            } catch (error) {
                // Manejo detallado de errores
                if (error.response) {
                    Alert.alert(
                        "Error del servidor",
                        `Error ${error.response.status}: ${error.response.data?.message || "No se pudo cargar el perfil"}`,
                        [{
                            text: "OK",
                            onPress: async () => {
                                if (error.response.status === 401) {
                                    await AsyncStorage.removeItem("userToken");
                                    navigation.replace("Login");
                                }
                            }
                        }]
                    );
                } else if (error.request) {
                    Alert.alert(
                        "Error de conexión",
                        "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
                        [{
                            text: "OK",
                            onPress: async () => {
                                await AsyncStorage.removeItem("userToken");
                                navigation.replace("Login");
                            }
                        }]
                    );
                } else {
                    Alert.alert(
                        "Error",
                        "Ocurrió un error inesperado al cargar el perfil.",
                        [{
                            text: "OK",
                            onPress: async () => {
                                await AsyncStorage.removeItem("userToken");
                                navigation.replace("Login");
                            }
                        }]
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        cargarPerfil();
    }, []);

    /**
     * Cierra la sesión del usuario actual limpiando el token y navegando al login.
     */
    const handleLogout = async () => {
        try {
            const result = await logoutUser();
            if (result.success) {
                Alert.alert("Sesión Cerrada", "Has cerrado sesión exitosamente.");
                navigation.replace("Login");
            } else {
                Alert.alert("Error al cerrar sesión", result.message || "No se pudo cerrar la sesión.");
            }
        } catch (error) {
            console.error("Error inesperado al cerrar sesión:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al intentar cerrar sesión.");
        }
    };

    // Estado de carga mientras se obtiene el perfil
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando perfil...</Text>
            </View>
        );
    }

    // Si no se pudo cargar el usuario
    if (!usuario) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Perfil de Usuario</Text>
                <View style={styles.containerPerfil}>
                    <Text style={styles.errorText}>
                        No se pudo cargar la información del perfil.
                    </Text>
                    <BottonComponent
                        title="Ir a Iniciar Sesión"
                        onPress={async () => {
                            await AsyncStorage.removeItem("userToken");
                            navigation.replace("Login");
                        }}
                        buttonStyle={styles.loginButton}
                        textStyle={styles.buttonText}
                    />
                </View>
            </SafeAreaView>
        );
    }

    // Vista principal con información del perfil
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <View style={styles.containerPerfil}>
                <Text style={styles.profileText}><Text style={styles.detailLabel}>Nombre: </Text>{usuario.user?.name || "No disponible"}</Text>
                <Text style={styles.profileText}><Text style={styles.detailLabel}>Email: </Text>{usuario.user?.email || "No disponible"}</Text>
                <Text style={styles.profileText}><Text style={styles.detailLabel}>Rol: </Text>{usuario.user?.role || "No disponible"}</Text>
                {usuario.user?.telefono && (
                    <Text style={styles.profileText}><Text style={styles.detailLabel}>Teléfono: </Text>{usuario.user.telefono}</Text>
                )}

                <View style={styles.profileButtonContainer}>
                    <BottonComponent
                        title="Editar Perfil"
                        onPress={() => Alert.alert("Funcionalidad Pendiente", "La edición del perfil aún no está implementada.")}
                        buttonStyle={styles.editProfileButton}
                        textStyle={styles.buttonText}
                    />
                    <BottonComponent
                        title="Cerrar Sesión"
                        onPress={handleLogout}
                        buttonStyle={styles.logoutButton}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

// Estilos de la pantalla
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFEFF8",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#433878",
    },
    containerPerfil: {
        width: "100%",
        maxWidth: 400,
        padding: 25,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 10,
        alignItems: "flex-start",
    },
    profileText: {
        fontSize: 17,
        marginBottom: 10,
        color: "#333",
        width: "100%",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#DADADA",
        paddingBottom: 8,
        paddingTop: 5,
    },
    detailLabel: {
        fontWeight: 'bold',
        color: "#433878",
    },
    errorText: {
        fontSize: 16,
        color: "#D32F2F",
        textAlign: "center",
        marginBottom: 20,
        width: "100%",
        fontWeight: 'bold',
    },
    profileButtonContainer: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    editProfileButton: {
        backgroundColor: "#7E60BF",
        paddingVertical: 14,
        borderRadius: 12,
        width: '90%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    logoutButton: {
        backgroundColor: "#DC3545",
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 15,
        width: '90%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    loginButton: {
        backgroundColor: "#6C757D",
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
