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


export const listarConsultorios = async () => {
    try {
        const response = await api.get("/listarConsultorios");
        console.log("Respuesta listarConsultorios:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const eliminarEspecialidad = async (id) => {
    console.log("Intentando eliminar consultorio con ID:", id);
    try {
        const response = await api.delete(`/eliminarConsultorio/${id}`);
        console.log("Respuesta eliminarConsultorio:", response.data);
        return { success: true, message: response.data.message || "Consultorio eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearEspecialidad = async (data) => {
    try {
        const response = await api.post("/crearConsultorio", data);
        console.log("Respuesta crearConsultorio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarConsultorio = async (id, data) => { // Asegúrate de que 'id' se pase como primer argumento
    try {
        // La URL debe incluir el ID de la especialidad a editar
        const response = await api.put(`/editarConsultorio/${id}`, data); // Asumiendo que tu ruta de Laravel es /actualizarEspecialidad/{id}
        console.log("Respuesta editarConsultorio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar el consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};
