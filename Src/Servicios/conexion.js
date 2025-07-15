// Src/Servicios/conexion.js

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cambia esta IP si usas otro entorno o conexión
const API_BASE_URL = "http://192.168.1.9:8001/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Rutas que no requieren autenticación
const RutasPublicas = ['/login', '/registrar'];

api.interceptors.request.use(
    async (config) => {
        // Verifica si la URL está dentro de las rutas públicas
        const isRutaPublica = RutasPublicas.some(route => config.url.toLowerCase().includes(route));

        if (!isRutaPublica) {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isRutaPublica = RutasPublicas.some(route => originalRequest.url.toLowerCase().includes(route));

        // Si es error 401 (no autorizado) en ruta privada, elimina token
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            !isRutaPublica
        ) {
            originalRequest._retry = true;

            console.log("Token expirado o no autorizado. Redirigiendo al Login.");
            await AsyncStorage.removeItem('userToken');
            // Aquí podrías navegar al login si tienes acceso a navigation global
        }

        return Promise.reject(error);
    }
);

export default api;
