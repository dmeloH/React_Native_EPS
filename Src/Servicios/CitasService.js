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


export const listarCitas = async () => {
    try {
        const response = await api.get("/listarCitas");
        console.log("Respuesta listarCitas:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar citas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const eliminarCita = async (id) => {
    console.log("Intentando eliminar cita con ID:", id);
    try {
        const response = await api.delete(`/eliminarCita/${id}`);
        console.log("Respuesta eliminarEspecialidad:", response.data);
        return { success: true, message: response.data.message || "Cita eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearCita = async (data) => {
    try {
        const response = await api.post("/crearCita", data);
        console.log("Respuesta crearCita:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarCita = async (id, data) => { // Asegúrate de que 'id' se pase como primer argumento
    try {
        const response = await api.put(`/editarCita/${id}`, data); // Asumiendo que tu ruta de Laravel es /actualizarEspecialidad/{id}
        console.log("Respuesta editarCita:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar la cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};
export const getCitaById = async (citaId) => {
    try {
        const response = await api.get(`/cita/${citaId}`);
        console.log("Respuesta getCitaById:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al obtener cita por ID:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
}
