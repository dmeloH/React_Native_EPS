import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearCobertura, editarCobertura } from "../../Src/Servicios/CoberturasService";

export default function EditarCobertura({ navigation }) {
    const route = useRoute();

    const cobertura = route.params?.cobertura;

    const [nombre, setNombre] = useState(cobertura?.nombre || "");
    const [nit, setNit] = useState(cobertura?.nit || "");
    const [direccion, setDireccion] = useState(cobertura?.direccion || "");
    const [telefono, setTelefono] = useState(cobertura?.telefono || "");
    const [estado, setEstado] = useState(cobertura?.estado || "");


    const [loading, setLoading] = useState(false);

    const esEdicion = !!cobertura;

    const handleGuardar = async () => {
        if (!nombre || !nit || !direccion || !telefono || !estado) {
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
                Alert.alert("Éxito", esEdicion ? "Eps actualizada correctamente" : "Eps creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la Eps");
            }
        } catch (error) {
            console.error("Error al guardar Eps:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la Eps.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Eps" : "Nueva Eps"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre de la Eps"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Nit"
                value={nit}
                onChangeText={setNit}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear Eps"}</Text>
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