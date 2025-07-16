import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useRoute } from '@react-navigation/native';
import { crearMedico, editarMedico } from "../../Src/Servicios/MedicosService";
import { Picker } from "@react-native-picker/picker";
import FormularioCard from "../../components/FormularioCard";

/**
 * Paleta de colores personalizada para el formulario
 */
const Colors = {
    background: "#FFF5FC",
    cardBackground: "#FFFFFF",
    primary: "#7E60BF",
    border: "#E0E0E0",
    textPrimary: "#2c3e50",
    placeholder: "#aaa",
};

/**
 * Componente para crear o editar un médico
 */
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
            style={{ flex: 1, backgroundColor: Colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <FormularioCard>
                <Text style={styles.title}>{esEdicion ? "Editar Médico" : "Nuevo Médico"}</Text>

                <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Especialidad" value={especialidad} onChangeText={setEspecialidad} placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Número Documento" value={numero_documento} onChangeText={setNumeroDocumento} placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Registro Profesional" value={registro_profesional} onChangeText={setRegistroProfesional} placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} placeholderTextColor={Colors.placeholder} />

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
            </FormularioCard>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: Colors.textPrimary,
    },
    input: {
        height: 50,
        backgroundColor: Colors.cardBackground,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E4B1F0',
        paddingHorizontal: 16,
        marginBottom: 16,
        width: "100%",
        fontSize: 16,
        color: Colors.textPrimary,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 10,
        backgroundColor: Colors.cardBackground,
        marginBottom: 20,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    picker: {
        height: 50,
        width: "100%",
        color: Colors.textPrimary,
    },
    boton: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        borderColor: '#E4B1F0',
    },
});