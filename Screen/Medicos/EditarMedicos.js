import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useRoute } from '@react-navigation/native';
import { crearMedico, editarMedico } from "../../Src/Servicios/MedicosService";
import { Picker } from "@react-native-picker/picker";


export default function EditarMedico({ navigation }) {
    const route = useRoute();
    const medico = route.params?.medico;

    const [nombre, setNombre] = useState(medico?.nombre || "");
    const [especialidad, setEspecialidad] = useState(medico?.especialidad || "");
    const [numero_documento, setNumeroDocumento] = useState(medico?.numero_documento || "");
    const [registro_profesional, setRegistroProfesional] = useState(medico?.registro_profesional || "");
    const [telefono, setTelefono] = useState(medico?.telefono || "");
    const [correo, setCorreo] = useState(medico?.correo || "");
    const [direccion, setDireccion] = useState(medico?.direccion || "");
    const [estado, setEstado] = useState(medico?.estado || "");

    const [loading, setLoading] = useState(false);
    const esEdicion = !!medico;

    const handleGuardar = async () => {
        if (!nombre || !especialidad || !numero_documento || !registro_profesional || !telefono || !correo || !direccion || !estado) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        try {
            const data = {
                nombre,
                especialidad,
                numero_documento,
                registro_profesional,
                telefono,
                correo,
                direccion,
                estado,
            };

            const result = esEdicion
                ? await editarMedico(medico?.id, data)
                : await crearMedico(data);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Médico actualizado correctamente" : "Médico creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el médico");
            }
        } catch (error) {
            console.error("Error al guardar médico:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar el médico.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>{esEdicion ? "Editar Médico" : "Nuevo Médico"}</Text>

                <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                <TextInput style={styles.input} placeholder="Especialidad" value={especialidad} onChangeText={setEspecialidad} />
                <TextInput style={styles.input} placeholder="Número Documento" value={numero_documento} onChangeText={setNumeroDocumento} />
                <TextInput style={styles.input} placeholder="Registro Profesional" value={registro_profesional} onChangeText={setRegistroProfesional} />
                <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" />
                <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={estado}
                        onValueChange={(itemValue) => setEstado(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccione estado..." value="" enabled={false} />
                        <Picker.Item label="Activo" value="activo" />
                        <Picker.Item label="Inactivo" value="inactivo" />
                    </Picker>
                </View>


                <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.textoBoton}>
                            {esEdicion ? "Guardar cambios" : "Crear médico"}
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        paddingBottom: 40,
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
        width: "90%",
        backgroundColor: "#fff",
    },
    boton: {
        backgroundColor: "#1976D2",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "90%",
        marginTop: 10,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: "#fff",
        width: "90%",
    },
    picker: {
        height: 50,
        width: "100%",
    },

});
