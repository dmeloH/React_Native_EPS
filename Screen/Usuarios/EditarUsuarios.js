import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearConsultorio, editarConsultorio } from "../../Src/Servicios/ConsultorioService";

export default function editarConsultorio({ navigation }) {
    const route = useRoute();

    const consultorio = route.params?.consultorio;

    const [nombre, setNombre] = useState(especialidad?.Nombre || "");
    const [numero, setNumero] = useState(especialidad?.Numero || "");
    const [idsede, setIdSede] = useState(especialidad?.IdSede || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!consultorio;

    const handleGuardar = async () => {
        if (!nombre || !numero || !idsede) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarConsultorio(consultorio.id, {
                    Nombre: nombre,
                    Numero: numero,
                    IdSede: idsede
                });
            } else {
                result = await crearConsultorio({
                    Nombre: nombre,
                    Descripcion: descripcion,
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Consultorio actualizado correctamente" : "Consultorio creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el consultorio");
            }
        } catch (error) {
            console.error("Error al guardar consultorio:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar el consultorio.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Consultorio" : "Nuevo Consultorio"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Número"
                value={numero}
                onChangeText={setNumero}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Id Sede"
                value={idsede}
                onChangeText={setIdSede}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear consultorio"}</Text>
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