// src/Servicios/CoberturasService.js

import api from "./conexion";

/**
 * Formatea errores provenientes del backend para mostrar mensajes claros.
 * 
 * @param {any} errorResponseData - Error recibido desde el servidor
 * @returns {string} - Mensaje de error formateado
 */
const formatErrorMessage = (errorResponseData) => {
    if (typeof errorResponseData === 'string') return errorResponseData;

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
 * Obtiene la lista de coberturas desde el backend.
 * 
 * @returns {Promise<{success: boolean, data?: any, message?: string}>}
 */
export const listarCoberturas = async () => {
    try {
        const response = await api.get("/coberturas");
        console.log("Respuesta listarCoberturas:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al listar las coberturas:", error.response?.data || error.message);
        return { success: false, message: errorMessage };
    }
};

/**
 * Elimina una cobertura por su ID.
 * 
 * @param {number|string} id - ID de la cobertura
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const eliminarCobertura = async (id) => {
    console.log("Intentando eliminar cobertura con ID:", id);
    try {
        const response = await api.delete(`/coberturas/${id}`);
        console.log("Respuesta eliminarCobertura:", response.data);
        return {
            success: true,
            message: response.data.message || "Cobertura eliminada correctamente"
        };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al eliminar la cobertura:", error.response?.data || error.message);
        return { success: false, message: errorMessage };
    }
};

/**
 * Crea una nueva cobertura.
 * 
 * @param {object} data - Datos de la cobertura a registrar
 * @returns {Promise<{success: boolean, data?: any, message?: string}>}
 */
export const crearCoberturas = async (data) => {
    try {
        const response = await api.post("/coberturas", data);
        console.log("Respuesta crearCobertura:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al crear la cobertura:", error.response?.data || error.message);
        return { success: false, message: errorMessage };
    }
};

/**
 * Edita una cobertura existente por su ID.
 * 
 * @param {number|string} id - ID de la cobertura
 * @param {object} data - Datos nuevos para actualizar
 * @returns {Promise<{success: boolean, data?: any, message?: string}>}
 */
export const editarCobertura = async (id, data) => {
    try {
        const response = await api.put(`/coberturas/${id}`, data);
        console.log("Respuesta editarCobertura:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al editar la cobertura:", error.response?.data || error.message);
        return { success: false, message: errorMessage };
    }
};
