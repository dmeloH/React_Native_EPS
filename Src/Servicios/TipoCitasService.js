import api from "./conexion";

// Función auxiliar para formatear mensajes de error
const formatErrorMessage = (errorResponseData) => {
    if (typeof errorResponseData === 'string') {
        return errorResponseData; // Ya es una cadena
    }
    if (errorResponseData && typeof errorResponseData === 'object') {
        if (errorResponseData.errors) {
            // Si Laravel devuelve errores de validación (e.g., {"errors": {"Nombre": ["msg"]}})
            const messages = Object.values(errorResponseData.errors).flat();
            return messages.join('\n'); // Une todos los mensajes de error en una sola cadena
        }
        if (errorResponseData.message) {
            // Si Laravel devuelve un campo 'message' que es un objeto o cadena
            if (typeof errorResponseData.message === 'string') {
                return errorResponseData.message;
            }
            // Si 'message' es un objeto (menos común, pero posible)
            return JSON.stringify(errorResponseData.message);
        }
        // Si es un objeto pero no tiene 'errors' ni 'message', stringify it
        return JSON.stringify(errorResponseData);
    }
    return "Error desconocido"; // Fallback
};


export const listarTipoCita = async () => {
    try {
        const response = await api.get("/listarTipoCita");
        console.log("Respuesta listarTipoCita:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const eliminarTipoCita = async (id) => {
    console.log("Intentando eliminar especialidad con ID:", id);
    try {
        const response = await api.delete(`/eliminarTipoCita/${id}`);
        console.log("Respuesta eliminarTipoCita:", response.data);
        return { success: true, message: response.data.message || "TipoCita eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar TipoCita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearTipoCita = async (data) => {
    try {
        const response = await api.post("/crearTipoCita", data);
        console.log("Respuesta crearTipoCita:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear especialidad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarTipoCita = async (id, data) => { // Asegúrate de que 'id' se pase como primer argumento
    try {
        // La URL debe incluir el ID de la especialidad a editar
        const response = await api.put(`/editarTipoCita/${id}`, data); // Asumiendo que tu ruta de Laravel es /actualizarTipoCita/{id}
        console.log("Respuesta editarTipoCita:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar la especialidad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};
