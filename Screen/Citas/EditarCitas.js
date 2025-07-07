import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearCita, editarCita } from "../../Src/Servicios/CitaService";

export default function EditarCita({ navigation }) {
    const route = useRoute();

    const cita = route.params?.cita;

    const [nombre, setNombre] = useState(cita?.Nombre || "");
    const [fecha, setFecha] = useState(cita?.Fecha || "");
    const [estado, setEstado] = useState(cita?.Estado || "");
    const [hora, setHora] = useState(cita?.Hora || "");
    const [tipo, setTipo] = useState(cita?.Tipo || "");



    const [loading, setLoading] = useState(false);

    const esEdicion = !!cita;

    const handleGuardar = async () => {
        if (!nombre || !fecha || !estado || !hora || !tipo) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarCita(cita.id, {
                    Nombre: nombre,
                    Fecha: fecha,
                    Estado: estado,
                    Hora: hora,
                    Tipo: tipo
                });
            } else {
                result = await crearCita({
                    Nombre: nombre,
                    Fecha: fecha,
                    Estado: estado,
                    Hora: hora,
                    Tipo: tipo
                    
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Cita actualizada correctamente" : "Cita creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la cita");
            }
        } catch (error) {
            console.error("Error al guardar cita:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la cita.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Cita" : "Nueva Cita"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                style={styles.input}
                placeholder="Fecha"
                value={fecha}
                onChangeText={setFecha}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TextInput
                style={styles.input}
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Hora"
                value={hora}
                onChangeText={setHora}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo"
                value={tipo}
                onChangeText={setTipo}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear cita"}</Text>
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