import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearUsuarios, editarUsuarios } from "../../Src/Servicios/UsuariosService";

export default function EditarUsuarios({ navigation }) {
    const route = useRoute();

    const usuario = route.params?.usuario;

    const [nombre_completo, setNombreCompleto] = useState(especialidad?.NombreCompleto || "");
    const [tipo_documento, setTipoDocumento] = useState(especialidad?.TipoDocumento || "");
    const [numero_documento, setNumeroDocumento] = useState(especialidad?.NumeroDocumento || "");
    const [fecha_nacimiento, setFechaNacimiento] = useState(especialidad?.FechaNacimiento || "");
    const [tipo_afiliacion, setTipoAfiliacion] = useState(especialidad?.TipoAfiliacion || "");
    const [correo, setCorreo] = useState(especialidad?.Correo || "");
    const [eps_id, setEps_id] = useState(especialidad?.EpsId || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!usuario;

    const handleGuardar = async () => {
        if (!nombre_completo || !tipo_documento || !numero_documento || !fecha_nacimiento || !tipo_afiliacion || !correo || !eps_id) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarUsuarios(usuario.id, {
                    NombreCompleto: nombre_completo,
                    TipoDocumento: tipo_documento,
                    NumeroDocumento: numero_documento,
                    FechaNacimiento: fecha_nacimiento,
                    TipoAfiliacion: tipo_afiliacion,
                    Correo: correo,
                    EpsId: eps_id
                });
            } else {
                result = await crearUsuarios({
                    NombreCompleto: nombre_completo,
                    TipoDocumento: tipo_documento,
                    NumeroDocumento: numero_documento,
                    FechaNacimiento: fecha_nacimiento,
                    TipoAfiliacion: tipo_afiliacion,
                    Correo: correo,
                    EpsId: eps_id
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Usuarios actualizado correctamente" : "Usuarios creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el usuario");
            }
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar el usuario.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Usuarios" : "Nuevo Usuarios"}</Text>

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
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Número Documento"
                value={numero_documento}
                onChangeText={setNumeroDocumento}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha Nacimiento"
                value={fecha_nacimiento}
                onChangeText={setFechaNacimiento}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo Afiliación"
                value={tipo_afiliacion}
                onChangeText={setTipoAfiliacion}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Eps ID"
                value={eps_id}
                onChangeText={setEps_id}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear usuario"}</Text>
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
    inputTextArea: {
        height: 120,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 16,
        width: "80%",
        textAlignVertical: 'top',
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