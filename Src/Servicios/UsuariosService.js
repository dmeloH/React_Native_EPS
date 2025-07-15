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

// Listar todos los usuarios
export const listarUsuarios = async () => {
    try {
        const response = await api.get("/usuarios");
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al listar usuarios:", errorMessage);
        return { success: false, message: errorMessage };
    }
};

// Eliminar usuario por ID
export const eliminarUsuarios = async (id) => {
    console.log("Intentando eliminar usuario con ID:", id);
    try {
        const response = await api.delete(`/usuarios/${id}`);
        console.log("Respuesta eliminarUsuario:", response.data);
        return {
            success: true,
            message: response.data.message || "Usuario eliminado correctamente"
        };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al eliminar el usuario:", errorMessage);
        return { success: false, message: errorMessage };
    }
};

// Crear nuevo usuario
export const crearUsuarios = async (data) => {
    try {
        const response = await api.post("/usuarios", data);
        console.log("Respuesta crearUsuario:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al crear usuario:", errorMessage);
        return { success: false, message: errorMessage };
    }
};

// Editar usuario por ID
export const editarUsuarios = async (id, data) => {
    try {
        const response = await api.put(`/usuarios/${id}`, data);
        console.log("Respuesta editarUsuario:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response
            ? formatErrorMessage(error.response.data)
            : "Error de conexión";
        console.error("Error al editar el usuario:", errorMessage);
        return { success: false, message: errorMessage };
    }
};
