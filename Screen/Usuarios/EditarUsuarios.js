import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { crearUsuarios, editarUsuarios } from "../../Src/Servicios/UsuariosService";

export default function EditarUsuarios({ navigation }) {
    const route = useRoute();
    const usuarios = route.params?.usuarios;

    const [nombre_completo, setNombreCompleto] = useState(usuarios?.nombre_completo || "");
    const [tipo_documento, setTipoDocumento] = useState(usuarios?.tipo_documento || "");
    const [numero_documento, setNumeroDocumento] = useState(usuarios?.numero_documento || "");
    const [fecha_nacimiento, setFechaNacimiento] = useState(usuarios?.fecha_nacimiento || "");
    const [eps_id, setEps_id] = useState(usuarios?.eps_id?.toString() || "");
    const [cobertura_id, setCobertura_id] = useState(usuarios?.cobertura_id?.toString() || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!usuarios;

    const handleGuardar = async () => {
        if (
            !nombre_completo ||
            !tipo_documento ||
            !numero_documento ||
            !fecha_nacimiento ||
            !eps_id ||
            !cobertura_id
        ) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos.");
            return;
        }

        setLoading(true);

        const usuariosData = {
            nombre_completo,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,

            eps_id: parseInt(eps_id),
            cobertura_id: parseInt(cobertura_id),
        };

        try {
            const result = esEdicion
                ? await editarUsuarios(usuarios.id, usuariosData)
                : await crearUsuarios(usuariosData);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Usuario actualizado correctamente" : "Usuario creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el usuarios.");
            }
        } catch (error) {
            console.error("Error al guardar usuarios:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar el usuarios.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Usuario" : "Nuevo Usuario"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                value={nombre_completo}
                onChangeText={setNombreCompleto}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo Documento"
                value={tipo_documento}
                onChangeText={setTipoDocumento}
            />
            <TextInput
                style={styles.input}
                placeholder="Número Documento"
                value={numero_documento}
                onChangeText={setNumeroDocumento}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
                value={fecha_nacimiento}
                onChangeText={setFechaNacimiento}
            />
            <TextInput
                style={styles.input}
                placeholder="EPS ID"
                value={eps_id}
                onChangeText={setEps_id}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Cobertura ID"
                value={cobertura_id}
                onChangeText={setCobertura_id}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar cambios" : "Crear usuarios"}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        width: "80%",
    },
    boton: {
        backgroundColor: "#1976D2",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "80%",
        marginTop: 20,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
});
