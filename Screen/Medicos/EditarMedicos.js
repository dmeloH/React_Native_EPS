import React, { useState, useEffect, act } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearMedico, editarMedico } from "../../Src/Servicios/MedicosService";

export default function EditarMedico({ navigation }) {
    const route = useRoute();

    const medico = route.params?.medico;

    const [nombre, setNombre] = useState(medico?.Nombre || "");
    const [apellido, setApellido] = useState(medico?.Apellido || "");
    const [correo, setCorreo] = useState(medico?.Correo || "");
    const [telefono, setTelefono] = useState(medico?.Telefono || "");
    const [tipodocumento, setTipoDocumento] = useState(medico?.TipoDocumento || "");
    const [numerodocumento, setNumeroDocumento] = useState(medico?.NumeroDocumento || "");
    const [activo, setActivo] = useState(medico?.Activo || "");
    const [idEspecialidad, setIdEspecialidad] = useState(medico?.idEspecialidad || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!medico;

    const handleGuardar = async () => {
        if (!nombre || !apellido || !correo || !telefono || !tipodocumento || !numerodocumento || !activo || !idEspecialidad) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarMedico(medico.id, {
                    Nombre: nombre,
                    Apellido: apellido,
                    Correo: correo,
                    Telefono: telefono,
                    TipoDocumento: tipodocumento,
                    NumeroDocumento: numerodocumento,
                    Activo: activo,
                    idEspecialidad: idEspecialidad     
                });
            } else {
                result = await crearMedico({
                    Nombre: nombre,
                    Apellido: apellido,
                    Correo: correo,
                    Telefono: telefono,
                    TipoDocumento: tipodocumento,
                    NumeroDocumento: numerodocumento,
                    Activo: activo,
                    idEspecialidad: idEspecialidad
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
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
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
                placeholder="Telefono"
                value={telefono}
                onChangeText={setTelefono}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo Documento"
                value={tipodocumento}
                onChangeText={setTipoDocumento}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Número Documento"
                value={numerodocumento}
                onChangeText={setNumeroDocumento}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Activo"
                value={activo}
                onChangeText={setActivo}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Id Especialidad"
                value={idEspecialidad}
                onChangeText={setIdEspecialidad}
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