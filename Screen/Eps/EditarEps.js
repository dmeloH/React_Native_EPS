import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useRoute } from '@react-navigation/native';
import { crearEps, editarEps } from "../../Src/Servicios/EpsService";

// 🎨 Paleta de colores moderna y limpia
const Colors = {
    background: '#F5F7FA',
    cardBackground: '#FFFFFF',
    primary: '#007AFF',
    primaryDark: '#005BBF',
    textPrimary: '#1C1C1E',
    textSecondary: '#6A6A6A',
    inputBorder: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.08)',
    danger: '#FF3B30',
};

export default function EditarEps({ navigation }) {
    const route = useRoute();

    // Obtener datos de la EPS desde parámetros de navegación (si vienen)
    const eps = route.params?.eps;

    // Estados del formulario
    const [nombre, setNombre] = useState(eps?.nombre || "");
    const [nit, setNit] = useState(eps?.nit || "");
    const [direccion, setDireccion] = useState(eps?.direccion || "");
    const [telefono, setTelefono] = useState(eps?.telefono || "");
    const [estado, setEstado] = useState(eps?.estado || "");

    const [loading, setLoading] = useState(false);
    const esEdicion = !!eps;

    /**
     * Valida los campos y realiza la creación o edición de una EPS
     */
    const handleGuardar = async () => {
        if (!nombre || !nit || !direccion || !telefono || !estado) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);

        const datosEps = { nombre, nit, direccion, telefono, estado };

        try {
            let result;
            if (esEdicion) {
                result = await editarEps(eps.id, datosEps);
            } else {
                result = await crearEps(datosEps);
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "EPS actualizada correctamente" : "EPS creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la EPS");
            }
        } catch (error) {
            console.error("Error al guardar EPS:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la EPS.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar EPS" : "Nueva EPS"}</Text>

            {/* Campo: Nombre */}
            <TextInput
                style={styles.input}
                placeholder="Nombre de la EPS"
                value={nombre}
                onChangeText={setNombre}
            />

            {/* Campo: NIT */}
            <TextInput
                style={styles.input}
                placeholder="NIT"
                value={nit}
                onChangeText={setNit}
            />

            {/* Campo: Dirección */}
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
            />

            {/* Campo: Teléfono */}
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
            />

            {/* Selector: Estado */}
            <Text style={styles.label}>Estado</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={estado}
                    onValueChange={(itemValue) => setEstado(itemValue)} // ✅ Corregido aquí
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                >
                    <Picker.Item label="Activo" value="activo" />
                    <Picker.Item label="Inactivo" value="inactivo" />
                </Picker>
            </View>

            {/* Botón: Guardar */}
            <TouchableOpacity
                style={styles.boton}
                onPress={handleGuardar}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>
                        {esEdicion ? "Guardar cambios" : "Crear EPS"}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

// 🧱 Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
        color: Colors.textPrimary,
    },
    input: {
        height: 50,
        borderColor: Colors.inputBorder,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        width: "80%",
        backgroundColor: Colors.cardBackground,
        color: Colors.textPrimary,
    },
    label: {
        fontSize: 16,
        color: Colors.textSecondary,
        alignSelf: "flex-start",
        marginLeft: "10%",
        marginBottom: 6,
    },
    pickerContainer: {
        backgroundColor: Colors.cardBackground,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.inputBorder,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        width: "80%",
    },
    picker: {
        height: 50,
        width: "100%",
        color: Colors.textPrimary,
    },
    pickerItem: {
        fontSize: 16,
        color: Colors.textPrimary,
    },
    boton: {
        backgroundColor: Colors.primary,
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
});
