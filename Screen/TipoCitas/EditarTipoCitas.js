import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearTipoCita, editarTipoCita } from "../../Src/Servicios/TipoCitasService";

export default function EditarTipoCita({ navigation }) {
    const route = useRoute();

    const tipoCita = route.params?.tipoCita;

    const [general, setGeneral] = useState(tipoCita?.General || "");
    const [especialista, setespecialista] = useState(tipoCita?.Especialista || "");
    const [urgencia, setUrgencia] = useState(tipoCita?.Urgencia || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!tipoCita;

    const handleGuardar = async () => {
        if (!general || !especialista || !urgencia) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarTipoCita(tipoCita.id, {
                    Nombre: nombre,
                    Descripcion: descripcion,
                });
            } else {
                result = await crearTipoCita({
                    Nombre: nombre,
                    Descripcion: descripcion,
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "TipoCita actualizada correctamente" : "TipoCita creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la tipoCita");
            }
        } catch (error) {
            console.error("Error al guardar tipoCita:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la tipoCita.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar TipoCita" : "Nueva TipoCita"}</Text>

            <TextInput
                style={styles.input}
                placeholder="General"
                value={general}
                onChangeText={setGeneral}
            />
            <TextInput
                style={styles.input}
                placeholder="Especialista"
                value={especialista}
                onChangeText={setespecialista}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Urgencia"
                value={urgencia}
                onChangeText={setUrgencia}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear tipoCita"}</Text>
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