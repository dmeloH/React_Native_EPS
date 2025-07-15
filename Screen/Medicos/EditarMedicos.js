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

/**
 * Paleta de colores personalizada para el formulario
 */
const Colors = {
    background: "#FFF5FC",         // Fondo rosado suave
    cardBackground: "#FFFFFF",    // Fondo de los inputs
    primary: "#7E60BF",           // Color primario (botones)
    border: "#E0E0E0",            // Bordes suaves
    textPrimary: "#2c3e50",       // Texto principal
    placeholder: "#aaa",          // Color de placeholder
};

/**
 * Componente para crear o editar un médico
 */
export default function EditarMedico({ navigation }) {
    const route = useRoute();
    const medico = route.params?.medico;

    // Estados de los campos del formulario
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

    /**
     * Valida los campos y guarda la información del médico
     */
    const handleGuardar = async () => {
        // Validación simple de campos vacíos
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

            // Lógica para crear o editar médico según contexto
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

                {/* Campos de entrada */}
                <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Especialidad" value={especialidad} onChangeText={setEspecialidad} placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Número Documento" value={numero_documento} onChangeText={setNumeroDocumento} placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Registro Profesional" value={registro_profesional} onChangeText={setRegistroProfesional} placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Correo" value={correo} onChangeText={setCorreo} keyboardType="email-address" placeholderTextColor={Colors.placeholder} />
                <TextInput style={styles.input} placeholder="Dirección" value={direccion} onChangeText={setDireccion} placeholderTextColor={Colors.placeholder} />

                {/* Picker para seleccionar estado */}
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

                {/* Botón de acción */}
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

// Estilos del componente
const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
        alignItems: "center",
        backgroundColor: Colors.background,
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
        color: Colors.textPrimary,
    },
    input: {
        height: 50,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
        width: "90%",
        backgroundColor: Colors.cardBackground,
        fontSize: 16,
        color: Colors.textPrimary,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 10,
        backgroundColor: Colors.cardBackground,
        marginBottom: 16,
        width: "90%",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    picker: {
        height: 50,
        width: "100%",
        color: Colors.textPrimary,
    },
    boton: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        width: "90%",
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4.5,
        elevation: 6,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
