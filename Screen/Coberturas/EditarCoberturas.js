import React, { useState } from "react";
import {
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
import { crearCoberturas, editarCobertura } from "../../Src/Servicios/CoberturasService";
import FormularioCard from "../../components/FormularioCard";

export default function EditarCobertura({ navigation }) {
    const route = useRoute();
    const cobertura = route.params?.cobertura;

    const [tipo_afiliacion, setTipoAfiliacion] = useState(cobertura?.tipo_afiliacion || "");
    const [porcentaje_cubrimiento, setPorcentajeCubrimiento] = useState(cobertura?.porcentaje_cubrimiento || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!cobertura;

    const handleGuardar = async () => {
        if (!tipo_afiliacion || !porcentaje_cubrimiento) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);

        try {
            const payload = { tipo_afiliacion, porcentaje_cubrimiento };
            const result = esEdicion
                ? await editarCobertura(cobertura.id, payload)
                : await crearCoberturas(payload);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Cobertura actualizada correctamente" : "Cobertura creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la cobertura");
            }
        } catch (error) {
            console.error("Error al guardar cobertura:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al guardar la cobertura.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: "#FFF5FC" }}
        >
            <FormularioCard>
                <Text style={styles.title}>
                    {esEdicion ? "🧾 Editar Cobertura" : "➕ Nueva Cobertura"}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Tipo de afiliación"
                    value={tipo_afiliacion}
                    onChangeText={setTipoAfiliacion}
                    placeholderTextColor="#aaa"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Porcentaje de cubrimiento (%)"
                    keyboardType="numeric"
                    value={porcentaje_cubrimiento}
                    onChangeText={setPorcentajeCubrimiento}
                    placeholderTextColor="#aaa"
                />

                <TouchableOpacity
                    style={styles.boton}
                    onPress={handleGuardar}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.textoBoton}>
                            {esEdicion ? "Guardar cambios" : "Crear cobertura"}
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
        color: "#433878",
    },
    input: {
        height: 50,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E4B1F0",
        paddingHorizontal: 16,
        marginBottom: 18,
        fontSize: 16,
        color: "#333",
    },
    boton: {
        backgroundColor: "#7E60BF",
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
    },
});
