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


export const listarPacientes = async () => {
    try {
        const response = await api.get("/listarPacientes");
        console.log("Respuesta listarPacientes:", response.data);
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

export const eliminarPaciente = async (id) => {
    console.log("Intentando eliminar paciente con ID:", id);
    try {
        const response = await api.delete(`/eliminarPaciente/${id}`);
        console.log("Respuesta eliminarPaciente:", response.data);
        return { success: true, message: response.data.message || "Paciente eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Paciente:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearEspecialidad = async (data) => {
    try {
        const response = await api.post("/crearPaciente", data);
        console.log("Respuesta crearPaciente:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear paciente:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarPaciente = async (id, data) => { // Asegúrate de que 'id' se pase como primer argumento
    try {
        // La URL debe incluir el ID de la especialidad a editar
        const response = await api.put(`/editarPaciente/${id}`, data); // Asumiendo que tu ruta de Laravel es /actualizarEspecialidad/{id}
        console.log("Respuesta editarPaciente:", response.data);
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
