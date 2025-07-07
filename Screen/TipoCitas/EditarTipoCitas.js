import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearEspecialidad, editarEspecialidad } from "../../Src/Servicios/EspecialidadService";

export default function EditarEspecialidad({ navigation }) {
    const route = useRoute();

    const especialidad = route.params?.especialidad;

    const [nombre, setNombre] = useState(especialidad?.Nombre || "");
    const [descripcion, setDescripcion] = useState(especialidad?.Descripcion || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!especialidad;

    const handleGuardar = async () => {
        if (!nombre || !descripcion) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarEspecialidad(especialidad.id, {
                    Nombre: nombre,
                    Descripcion: descripcion,
                });
            } else {
                result = await crearEspecialidad({
                    Nombre: nombre,
                    Descripcion: descripcion,
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Especialidad actualizada correctamente" : "Especialidad creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la especialidad");
            }
        } catch (error) {
            console.error("Error al guardar especialidad:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la especialidad.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Especialidad" : "Nueva Especialidad"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear especialidad"}</Text>
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