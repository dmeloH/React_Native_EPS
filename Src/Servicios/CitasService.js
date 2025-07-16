// src/Servicios/CitasService.js

import api from "./conexion";

/**
 * Función auxiliar para formatear los mensajes de error provenientes del backend.
 * Soporta estructura de Laravel (con "errors" o "message") y errores genéricos.
 * 
 * @param {any} errorResponseData - El contenido de error devuelto por el servidor
 * @returns {string} - Mensaje de error legible
 */
const formatErrorMessage = (errorResponseData) => {
    if (typeof errorResponseData === 'string') {
        return errorResponseData;
    }
    if (errorResponseData && typeof errorResponseData === 'object') {
        if (errorResponseData.errors) {
            const messages = Object.values(errorResponseData.errors).flat();
            return messages.join('\n');
        }
        if (errorResponseData.message) {
            return typeof errorResponseData.message === 'string'
                ? errorResponseData.message
                : JSON.stringify(errorResponseData.message);
        }
        return JSON.stringify(errorResponseData);
    }
    return "Error desconocido";
};

/**
 * Obtiene la lista completa de citas desde el backend.
 * 
 * @returns {Promise<object>} Objeto con `success` y los datos o mensaje de error
 */
export const listarCitas = async () => {
    try {
        const response = await api.get("/citas");
        console.log("Respuesta listarCitas:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al listar citas:", error.response?.data || error.message);
        return { success: false, message: errorMessage };
    }
};

/**
 * Elimina una cita por ID.
 * 
 * @param {number|string} id - ID de la cita a eliminar
 * @returns {Promise<object>} Resultado de la operación
 */
export const eliminarCita = async (id) => {
    console.log("Intentando eliminar cita con ID:", id);
    try {
        const response = await api.delete(`/citas/${id}`);
        console.log("Respuesta eliminarCita:", response.data);
        return {
            success: true,
            message: response.data.message || "Cita eliminada correctamente"
            
        };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al eliminar Cita:", error.response?.data || error.message);
        return { success: false, message: errorMessage };
    }
};

/**
 * Crea una nueva cita.
 * 
 * @param {object} data - Objeto con los datos de la cita
 * @returns {Promise<object>} Resultado de la creación
 */
export const crearCita = async (data) => {
    try {
        const response = await api.post("/citas", data);
        console.log("Respuesta crearCita:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al crear cita:", error.response?.data || error.message);
        return { success: false, message: errorMessage };
    }
};

/**
 * Edita una cita existente por su ID.
 * 
 * @param {number|string} id - ID de la cita a modificar
 * @param {object} data - Datos nuevos de la cita
 * @returns {Promise<object>} Resultado de la edición
 */
export const editarCita = async (id, data) => {
    try {
        const response = await api.put(`/citas/${id}`, data);
        console.log("Respuesta editarCita:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al editar la cita:", error.response?.data || error.message);
        return { success: false, message: errorMessage };
    }
};

/**
 * Obtiene una cita específica por su ID.
 * 
 * @param {number|string} citaId - ID de la cita a consultar
 * @returns {Promise<object>} Resultado de la búsqueda
 */
export const getCitaById = async (citaId) => {
    try {
        const response = await api.get(`/cita/${citaId}`);
        console.log("Respuesta getCitaById:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al obtener cita por ID:", error.response?.data || error.message);
        return { success: false, message: errorMessage };
    }
};
