// src/Servicios/AuthService.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion"; // Axios configurado con baseURL

/**
 * Inicia sesión del usuario mediante API y guarda el token en AsyncStorage.
 * 
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<object>} Objeto con éxito y token o mensaje de error
 */
export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        const { token } = response.data;

        // Guarda el token en el almacenamiento local
        await AsyncStorage.setItem("userToken", token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error de Login:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al conectar con el servidor para iniciar sesión.",
        };
    }
};

/**
 * Cierra sesión del usuario, llama al endpoint de logout y elimina el token.
 * 
 * @returns {Promise<object>} Objeto con éxito o mensaje de error
 */
export const logoutUser = async () => {
    try {
        await api.post("/logout"); // Endpoint de logout (opcional, depende del backend)
        await AsyncStorage.removeItem("userToken"); // Borra el token local

        return { success: true };
    } catch (error) {
        console.error(
            "Error al cerrar sesión:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al cerrar sesión.",
        };
    }
};

/**
 * Registra un nuevo usuario, obtiene el token y lo guarda localmente.
 * 
 * @param {string} name - Nombre del usuario
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @param {string} role - Rol asignado al usuario
 * @returns {Promise<object>} Objeto con éxito y token o mensaje de error
 */
export const Register = async (name, email, password, role) => {
    try {
        // Envío de datos al endpoint /register
        const response = await api.post("/register", { name, email, password, role });
        const { token } = response.data;

        // Guardado del token en almacenamiento local
        await AsyncStorage.setItem("userToken", token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error de registro:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al registrar el usuario.",
        };
    }
};
