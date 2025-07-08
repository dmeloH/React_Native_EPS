import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", {email, password});
        const { token } = response.data;

        await AsyncStorage.setItem("userToken", token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error de login:",
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

export const logoutUser = async () => {
    try {
        await api.post("/logout"); // Asumiendo que tienes un endpoint de logout
        await AsyncStorage.removeItem("userToken");
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

// Renombrado de 'Register' a 'register' para consistencia con el uso en RegistroScreen
export const Register = async (name, email, password, role) => { // Añadido 'telefono' aquí
    try {
        // Asegúrate de que tu API espera 'telefono' si lo estás enviando
        const response = await api.post("/register", {name, email, password, role});
        const { token } = response.data;

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