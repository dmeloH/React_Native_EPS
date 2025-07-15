import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Componente de configuración general de la aplicación.
 * Permite al usuario activar o desactivar el modo oscuro.
 *
 * @returns {JSX.Element} Pantalla de configuración
 */
export default function Configuracion() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    /**
     * Carga la preferencia de modo oscuro desde el almacenamiento local.
     */
    useEffect(() => {
        const loadDarkModePreference = async () => {
            try {
                const preference = await AsyncStorage.getItem('darkMode');
                if (preference !== null) {
                    setIsDarkMode(JSON.parse(preference));
                }
            } catch (error) {
                console.error("Error al cargar la preferencia de modo oscuro:", error);
            }
        };
        loadDarkModePreference();
    }, []);

    /**
     * Alterna entre modo claro y oscuro, y guarda la preferencia en AsyncStorage.
     */
    const toggleDarkMode = async () => {
        try {
            const newValue = !isDarkMode;
            setIsDarkMode(newValue);
            await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
        } catch (error) {
            console.error("Error al guardar la preferencia de modo oscuro:", error);
        }
    };

    // Estilos dinámicos según el tema
    const containerStyle = {
        backgroundColor: isDarkMode ? '#1a1a1a' : '#FFEFF8',
    };

    const textStyle = {
        color: isDarkMode ? '#f0f0f0' : '#433878',
    };

    const cardStyle = {
        backgroundColor: isDarkMode ? '#2a2a2a' : '#FFFFFF',
        shadowColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.1)',
    };

    return (
        <SafeAreaView style={[styles.container, containerStyle]}>
            <Text style={[styles.title, textStyle]}>Configuración</Text>

            {/* Tarjeta de opción: Modo Oscuro */}
            <View style={[styles.optionCard, cardStyle]}>
                <Text style={[styles.optionText, textStyle]}>
                    Activar modo oscuro
                </Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: '#ccc', true: '#7E60BF' }}
                    thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
                />
            </View>
        </SafeAreaView>
    );
}

// Estilos base
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
        padding: 18,
        borderRadius: 14,
        marginBottom: 16,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 6,
    },
    optionText: {
        fontSize: 18,
        flex: 1,
    },
});
