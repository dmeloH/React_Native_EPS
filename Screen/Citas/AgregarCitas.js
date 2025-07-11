import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons
import { crearCita } from "../../Src/Servicios/CitasService";

export default function AgregarCita({ navigation }) {
    const [tipo_cita, setTipoCita] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [estado, setEstado] = useState("");
    const [costo_total, setCostoTotal] = useState("");
    const [valor_eps, setValorEps] = useState("");
    const [valor_usuario, setValorUsuario] = useState("");


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
        if (!tipo_cita || !fecha || !estado || !hora || !costo_total || !valor_eps || !valor_usuario) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        try {
            const result = await crearCita({
                TipoCita: (tipo_cita),
                Fecha: fecha,
                Hora: hora,
                Estado: estado,
                CostoTotal: (costo_total),
                ValorEps: (valor_eps),
                ValorUsuario: (valor_usuario)
            });

            if (result.success) {
                Alert.alert("Éxito", "Cita creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la cita"));
            }
        } catch (error) {
            console.error("Error al crear cita:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la cita."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nueva Cita</Text>

            <TextInput
                style={styles.input}
                placeholder="Tipo Cita"
                value={tipo_cita}
                onChangeText={setTipoCita}
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
                placeholder="Hora"
                value={hora}
                onChangeText={setHora}
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
                placeholder="Costo Total"
                value={costo_total}
                onChangeText={setCostoTotal}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Valor EPS"
                value={valor_eps}
                onChangeText={setValorEps}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Valor Usuario"
                value={valor_usuario}
                onChangeText={setValorUsuario}
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
                        <Text style={styles.textoBoton}>Crear cita</Text>
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