import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearCoberturas, editarCobertura } from "../../Src/Servicios/CoberturasService";

export default function EditarCobertura({ navigation }) {
    const route = useRoute();

    const cobertura = route.params?.cobertura;

    const [tipo_afiliacion, setTipoAfiliacion] = useState(cobertura?.tipo_afiliacion || "");
    const [porcentaje_cubrimiento, setPorecntajeCubrimiento] = useState(cobertura?.porcentaje_cubrimiento || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!cobertura;

    const handleGuardar = async () => {
        if (!tipo_afiliacion || !porcentaje_cubrimiento) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarCobertura(cobertura.id, {
                    TipoAfiliacion: tipo_afiliacion,
                    PorcentajeCubrimiento: porcentaje_cubrimiento
                });
            } else {
                result = await crearCobertura({
                    TipoAfiliacion: tipo_afiliacion,
                    PorcentajeCubrimiento: porcentaje_cubrimiento

                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Tipo de afiliación actualizado correctamente" : "Tipo de afiliación creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la cobertura");
            }
        } catch (error) {
            console.error("Error al guardar eede:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la cobertura.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Cobertura" : "Nueva Cobertura"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Tipo de afiliación"
                value={tipo_afiliacion}
                onChangeText={setTipoAfiliacion}
            />
            <TextInput
                style={styles.input}
                placeholder="Porcentaje de cubrimiento"
                value={porcentaje_cubrimiento}
                onChangeText={setPorecntajeCubrimiento}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear cobertura"}</Text>
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