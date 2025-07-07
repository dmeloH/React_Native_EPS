import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearSede, editarSede } from "../../Src/Servicios/SedeService";

export default function EditarSede({ navigation }) {
    const route = useRoute();

    const sede = route.params?.sede;

    const [nombre, setNombre] = useState(sede?.Nombre || "");
    const [direccion, setDireccion] = useState(sede?.Dirección || "");
    const [telefono, setTelefono] = useState(sede?.Telefono || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!sede;

    const handleGuardar = async () => {
        if (!nombre || !direccion || !telefono) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarSede(sede.id, {
                    Nombre: nombre,
                    Direccion: direccion,
                    Telefono: telefono
                });
            } else {
                result = await crearSede({
                    Nombre: nombre,
                    Direccion: direccion,
                    Telefono: telefono
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Telefono actualizado correctamente" : "Telefono creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la sede");
            }
        } catch (error) {
            console.error("Error al guardar eede:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la sede.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Sede" : "Nueva Sede"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefono"
                value={telefono}
                onChangeText={setTelefono}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear sede"}</Text>
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