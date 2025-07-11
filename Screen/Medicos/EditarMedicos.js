import React, { useState, useEffect, act } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearMedico, editarMedico } from "../../Src/Servicios/MedicosService";

export default function EditarMedico({ navigation }) {
    const route = useRoute();

    const medico = route.params?.medico;

    const [nombre, setNombre] = useState(medico?.Nombre || "");
    const [especialidad, setEspecialidad] = useState(medico?.Especialidad || "");
    const [numero_documento, setNumeroDocumento] = useState(medico?.NumeroDocumento || "");
    const [registro_profesional, setRegistroProfesional] = useState(medico?.RegistroProfesional || "");
    const [telefono, setTelefono] = useState(medico?.Telefono || "");
    const [correo, setCorreo] = useState(medico?.Correo || "");
    const [direccion, setDireccion] = useState(medico?.Direccion || "");
    const [estado, setEstado] = useState(medico?.Estado || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!medico;

    const handleGuardar = async () => {
        if (!nombre || !especialidad || !numero_documento || !registro_profesional || !telefono || !correo || !direccion || !estado) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarMedico(medico.id, {
                    Nombre: nombre,
                    Especialidad: especialidad,
                    NumeroDocumento: numero_documento,
                    RegistroProfesional: registro_profesional,
                    Telefono: telefono,
                    Correo: correo,
                    Direccion: direccion,
                    Estado: estado
                });
            } else {
                result = await crearMedico({
                    Nombre: nombre,
                    Especialidad: especialidad,
                    NumeroDocumento: numero_documento,
                    RegistroProfesional: registro_profesional,
                    Telefono: telefono,
                    Correo: correo,
                    Direccion: direccion,
                    Estado: estado
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Medico actualizado correctamente" : "Medico creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el medico");
            }
        } catch (error) {
            console.error("Error al guardar medico:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la medico.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Medico" : "Nuevo Medico"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Especialidad"
                value={especialidad}
                onChangeText={setEspecialidad}
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
                placeholder="Registro Profesional"
                value={registro_profesional}
                onChangeText={setRegistroProfesional}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
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
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
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
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear medico"}</Text>
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