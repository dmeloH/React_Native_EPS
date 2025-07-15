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

// Obtener lista de EPS
export const listarEps = async () => {
    try {
        const response = await api.get("/eps");
        console.log("Respuesta listarEps:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar EPS:", errorMessage);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Eliminar una EPS por ID
export const eliminarEps = async (id) => {
    console.log("Intentando eliminar EPS con ID:", id);
    try {
        const response = await api.delete(`/eps/${id}`);
        console.log("Respuesta eliminarEps:", response.data);
        return {
            success: true,
            message: response.data.message || "EPS eliminada correctamente"
        };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar EPS:", errorMessage);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Crear nueva EPS
export const crearEps = async (data) => {
    try {
        const response = await api.post("/eps", data);
        console.log("Respuesta crearEps:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear EPS:", errorMessage);
        return {
            success: false,
            message: errorMessage
        };
    }
};

// Editar EPS por ID
export const editarEps = async (id, data) => {
    try {
        const response = await api.put(`/eps/${id}`, data);
        console.log("Respuesta editarEps:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar EPS:", errorMessage);
        return {
            success: false,
            message: errorMessage
        };
    }
};
