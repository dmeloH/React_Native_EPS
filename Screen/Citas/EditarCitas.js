import React, { useState, useEffect, use } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearCita, editarCita } from "../../Src/Servicios/CitasService";
import { listarCitas } from "../../Src/Servicios/CitasService";
import { Picker } from "@react-native-picker/picker";
import ListarUsuarios from "../Usuarios/ListarUsuarios";
import { listarMedicos } from "../../Src/Servicios/MedicosService";

export default function EditarCitas({ navigation }) {
    const route = useRoute();
    const cita = route.params?.cita;

    const [medico_id, setMedicos] = useState(cita?.medico_id || "");
    const [usuarios_id, setUsuarios] = useState(cita?.usuarios_id || "");
    const [tipo_cita, setTipoCita] = useState(cita?.tipo_cita || "");
    const [fecha, setFecha] = useState(cita?.Fecha || "");
    const [hora, setHora] = useState(cita?.Hora || "");
    const [estado, setEstado] = useState(cita?.Estado || "");
    const [costo_total, setCostoTotal] = useState(cita?.costo_total || "");
    const [valor_eps, setValorEps] = useState(cita?.valor_eps || "");
    const [valor_usuario, setValorUsuario] = useState(cita?.valor_usuario || "");

    useEffect(() => {
        const cargarUsuarios = async () => {
            const result = await ListarUsuarios();
            if (result.success) {
                setUsuarios(result.data);
            };
        };
        cargarUsuarios();
    }, []);

    useEffect(() => {
        const cargarMedicos = async () => {
            const result = await listarMedicos();
            if (result.success) {
                setMedicos(result.data);
            };
        };
        cargarMedicos();
    }, []);


    const [loading, setLoading] = useState(false);

    const esEdicion = !!cita;

    const handleGuardar = async () => {
        if (!tipo_cita || !fecha || !estado || !hora || !costo_total || !valor_eps || !valor_usuario) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarCita(cita.id, {
                    TipoCita: tipo_cita,
                    Fecha: fecha,
                    Hora: hora,
                    Estado: estado,
                    CostoTotal: costo_total,
                    ValorEps: valor_eps,
                    ValorUsuario: valor_usuario
                });
            } else {
                result = await crearCita({
                    TipoCita: tipo_cita,
                    Fecha: fecha,
                    Hora: hora,
                    Estado: estado,
                    CostoTotal: costo_total,
                    ValorEps: valor_eps,
                    ValorUsuario: valor_usuario

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
            <Picker
                selectedValue={usuarios_id}
                onValueChange={(itemValue) => setNombre(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Seleccione un usuario" value="" />
                {usuarios.map((a) => (
                    <Picker.Item key={a.id} label={`${a.nombre} ${a.apellidos}`} value={a.id.toString()} />
                ))}
            </Picker>
            <Picker
                selectedValue={medico_id}
                onValueChange={(itemValue) => setNombre(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Seleccione un medico" value="" />
                {medicos.map((a) => (
                    <Picker.Item key={a.id} label={`${a.nombre} ${a.apellidos}`} value={a.id.toString()} />
                ))}
            </Picker>

            <TextInput
                style={styles.input}
                placeholder="Tipo Cita"
                value={nombre}
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
                placeholder="Costo Total"
                value={tipo}
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