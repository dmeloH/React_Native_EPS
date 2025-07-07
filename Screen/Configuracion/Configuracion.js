import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar AsyncStorage

export default function Configuracion() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Cargar la preferencia de modo oscuro al iniciar el componente
    useEffect(() => {
        const loadDarkModePreference = async () => {
            try {
                const preference = await AsyncStorage.getItem('darkMode');
                if (preference !== null) {
                    setIsDarkMode(JSON.parse(preference)); // Convertir string a booleano
                }
            } catch (error) {
                console.error("Error al cargar la preferencia de modo oscuro:", error);
            }
        };
        loadDarkModePreference();
    }, []);

    // Guardar la preferencia de modo oscuro cuando cambia
    const toggleDarkMode = async () => {
        try {
            const newValue = !isDarkMode;
            setIsDarkMode(newValue);
            await AsyncStorage.setItem('darkMode', JSON.stringify(newValue)); // Convertir booleano a string
        } catch (error) {
            console.error("Error al guardar la preferencia de modo oscuro:", error);
        }
    };


    const containerStyle = {
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f4f8', // Fondo oscuro o claro
    };

    const textStyle = {
        color: isDarkMode ? '#f0f0f0' : '#2c3e50', // Color de texto claro u oscuro
    };

    const cardStyle = {
        backgroundColor: isDarkMode ? '#333333' : '#FFFFFF', // Fondo de tarjeta oscuro o claro
        shadowColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', // Sombra para modo oscuro
    };

    return (
        <SafeAreaView style={[styles.container, containerStyle]}>
            <Text style={[styles.title, textStyle]}>Configuración</Text>

            <View style={[styles.optionCard, cardStyle]}>
                <Text style={[styles.optionText, textStyle]}>Modo Oscuro</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDarkMode}
                    value={isDarkMode}
                />
            </View>

            {/* Puedes agregar más opciones de configuración aquí */}
            <View style={[styles.optionCard, cardStyle]}>
                <Text style={[styles.optionText, textStyle]}>Notificaciones</Text>
                <Switch
                    // Puedes manejar el estado de las notificaciones con otro useState
                    value={true} // Ejemplo: siempre activado
                    onValueChange={() => {}}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
    },
    optionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    optionText: {
        fontSize: 18,
        flex: 1, 
    },
});