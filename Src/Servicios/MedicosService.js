import api from "./conexion";

// Función auxiliar para formatear mensajes de error
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
            if (typeof errorResponseData.message === 'string') {
                return errorResponseData.message;
            }
            return JSON.stringify(errorResponseData.message);
        }
        return JSON.stringify(errorResponseData);
    }
    return "Error desconocido";
};

// Obtener todos los médicos
export const listarMedicos = async () => {
    try {
        const response = await api.get("/medicos");
        console.log("Respuesta listarMedicos:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al listar médicos:", errorMessage);
        return { success: false, message: errorMessage };
    }
};

// Eliminar médico por ID
export const eliminarMedico = async (id) => {
    console.log("Intentando eliminar médico con ID:", id);
    try {
        const response = await api.delete(`/medicos/${id}`);
        console.log("Respuesta eliminarMedico:", response.data);
        return {
            success: true,
            message: response.data.message || "Médico eliminado correctamente"
        };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al eliminar médico:", errorMessage);
        return { success: false, message: errorMessage };
    }
};

// Crear nuevo médico
export const crearMedico = async (data) => {
    try {
        const response = await api.post("/medicos", data);
        console.log("Respuesta crearMedico:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al crear médico:", errorMessage);
        return { success: false, message: errorMessage };
    }
};

// Editar médico por ID
export const editarMedico = async (id, data) => {
    try {
        const response = await api.put(`/medicos/${id}`, data);
        console.log("Respuesta editarMedico:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al editar médico:", errorMessage);
        return { success: false, message: errorMessage };
    }
};
