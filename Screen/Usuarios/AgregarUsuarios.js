import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Importa Iconos
import { crearCita } from "../../Src/Servicios/CitasService";

export default function AgregarUsuarios({ navigation }) {
    const [nombre_completo, setNombreCompleto] = useState("");
    const [tipo_documento, setTipoDocumento] = useState("");
    const [numero_documento, setNumeroDocumento] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");
    const [tipo_afiliacion, setTipoAfiliacion] = useState("");
    const [correo, setCorreo] = useState("");
    const [eps_id, setEps_id] = useState("");
    
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
        if (!nombre_completo || !tipo_documento || !numero_documento || !fecha_nacimiento || !tipo_afiliacion || !correo || !eps_id) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        try {
            const result = await crearUsuarios({
                NombreCompleto: nombre_completo,
                TipoDocumento: tipo_documento,
                NumeroDocumento: numero_documento,
                FechaNacimiento: fecha_nacimiento,
                TipoAfiliacion: tipo_afiliacion,
                Correo: correo,
                EpsId: eps_id   
            });

            if (result.success) {
                Alert.alert("Éxito", "Usuarios creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el Usuario"));
            }
        } catch (error) {
            console.error("Error al crear Usuario:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el Usuario."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevo Usuarios</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                value={nombre_completo}
                onChangeText={setNombreCompleto}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo Documento"
                value={tipo_documento}
                onChangeText={setTipoDocumento}
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
                placeholder="Fecha Nacimiento"
                value={fecha_nacimiento}
                onChangeText={setFechaNacimiento}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo Afiliación"
                value={tipo_afiliacion}
                onChangeText={setTipoAfiliacion}
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
                placeholder="Eps ID"
                value={eps_id}
                onChangeText={setEps_id}
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
                        <Text style={styles.textoBoton}>Crear Usuario</Text>
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