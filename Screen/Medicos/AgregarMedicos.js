import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons
import { crearMedico } from "../../Src/Servicios/MedicoService";

export default function AgregarMedico({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [tipodocumento, setTipoDocumento] = useState("");
    const [numerodocumento, setNumeroDocumento] = useState("");
    const [activo, setActivo] = useState("");
    const [idespecialidad, setIdEspecialidad] = useState("");

    const [loading, setLoading] = useState(false);

    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') {
            return msg;
        }
        if (msg && typeof msg === 'object') {
            if (msg.errors) {
                const messages = Object.values(msg.errors).flat();
                return messages.join('\n');
            }
            if (msg.message && typeof msg.message === 'string') {
                return msg.message;
            }
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };

    const handleGuardar = async () => {
        if (!nombre || !apellido || !correo || !telefono || !tipodocumento || !numerodocumento || !activo || !idespecialidad) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        try {
            const result = await crearMedico({
                Nombre: nombre,
                Apellido: apellido,
                Correo: correo,
                Telefono: telefono,
                TipoDocumento: tipodocumento,
                NumeroDocumento: numerodocumento,
                Activo: activo,
                IdEspecialidad: idespecialidad
            });

            if (result.success) {
                Alert.alert("Éxito", "Consultorio creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el consultorio"));
            }
        } catch (error) {
            console.error("Error al crear consultorio:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el consultorio."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo Consultorio</Text>

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
                value={idespecialidad}
                onChangeText={setIdEspecialidad}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <View style={styles.botonContent}> {/* Contenedor para el icono y el texto */}
                        <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.botonIcon} />
                        <Text style={styles.textoBoton}>Crear medico</Text>
                    </View>
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
        // Alineación del contenido dentro del botón para el icono y el texto
        flexDirection: 'row', // Organiza el icono y el texto en fila
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center',   // Centra verticalmente
        width: "80%",
        marginTop: 20,
        // Agregando un poco de sombra para un efecto más bonito
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 8, // Espacio entre el icono y el texto
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