// src/navigation/AppNavegacion.js

import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View, StyleSheet, AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Navegaciones principales de la app
import AuthNavegacion from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal";

export default function AppNavegacion() {
    // Estado para controlar la carga inicial
    const [isLoading, setIsLoading] = useState(true);

    // Estado que almacena el token del usuario
    const [userToken, setUserToken] = useState(null);

    // Referencia al estado actual de la app (foreground, background, inactive)
    const appState = useRef(AppState.currentState);

    /**
     * Carga el token almacenado en AsyncStorage.
     * Se usa para determinar si el usuario está autenticado.
     */
    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            setUserToken(token);
        } catch (e) {
            console.error("Error al cargar el token desde AsyncStorage:", e);
        } finally {
            setIsLoading(false);
        }
    };

    // Efecto inicial para cargar el token al montar el componente
    useEffect(() => {
        loadToken();
    }, []);

    /**
     * Escucha los cambios de estado de la app.
     * Si la app pasa de background/inactiva a activa,
     * vuelve a verificar el token.
     */
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                console.log("App ha vuelto a estar activa, verificando token...");
                loadToken();
            }
            appState.current = nextAppState;
        };

        const subscription = AppState.addEventListener("change", handleAppStateChange);
        return () => subscription?.remove();
    }, []);

    /**
     * Verificación periódica del token cada 2 segundos
     * cuando la app está activa. Esto ayuda a mantener
     * actualizado el estado de autenticación.
     */
    useEffect(() => {
        if (!isLoading) {
            const interval = setInterval(() => {
                if (AppState.currentState === "active") {
                    loadToken();
                }
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [isLoading]);

    // Mostrar indicador de carga mientras se verifica el token
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
            </View>
        );
    }

    // Navegación condicional según el estado de autenticación
    return (
        <NavigationContainer>
            {userToken ? <NavegacionPrincipal /> : <AuthNavegacion />}
        </NavigationContainer>
    );
}

// Estilos
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
