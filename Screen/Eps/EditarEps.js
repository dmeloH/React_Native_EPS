import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useRoute } from '@react-navigation/native';
import { crearEps, editarEps } from "../../Src/Servicios/EpsService";
import FormularioCard from "../../components/FormularioCard";

export default function EditarEps({ navigation }) {
    const route = useRoute();
    const eps = route.params?.eps;

    const [nombre, setNombre] = useState(eps?.nombre || "");
    const [nit, setNit] = useState(eps?.nit || "");
    const [direccion, setDireccion] = useState(eps?.direccion || "");
    const [telefono, setTelefono] = useState(eps?.telefono || "");
    const [estado, setEstado] = useState(eps?.estado || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!eps;

    const handleGuardar = async () => {
        if (!nombre || !nit || !direccion || !telefono || !estado) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        const datosEps = { nombre, nit, direccion, telefono, estado };

        try {
            const result = esEdicion
                ? await editarEps(eps.id, datosEps)
                : await crearEps(datosEps);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "EPS actualizada correctamente" : "EPS creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la EPS");
            }
        } catch (error) {
            Alert.alert("Error", "Ocurrió un error inesperado al guardar la EPS.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormularioCard>
            <Text style={styles.title}>{esEdicion ? "✏️ Editar EPS" : "🏥 Nueva EPS"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre de la EPS"
                value={nombre}
                onChangeText={setNombre}
                placeholderTextColor="#999"
            />
            <TextInput
                style={styles.input}
                placeholder="NIT"
                value={nit}
                onChangeText={setNit}
                placeholderTextColor="#999"
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={direccion}
                onChangeText={setDireccion}
                placeholderTextColor="#999"
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                placeholderTextColor="#999"
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Estado</Text>
            <Picker
                selectedValue={estado}
                onValueChange={setEstado}
                style={styles.picker}
                itemStyle={styles.pickerItem}
            >
                <Picker.Item label="Activo" value="activo" />
                <Picker.Item label="Inactivo" value="inactivo" />
            </Picker>

            <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton}>
                        {esEdicion ? "Guardar cambios" : "Crear EPS"}
                    </Text>
                )}
            </TouchableOpacity>
        </FormularioCard>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#433878',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#E4B1F0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        color: '#433878',
    },
    label: {
        fontSize: 16,
        color: '#7E60BF',
        marginLeft: 5,
        marginBottom: 6,
    },
    picker: {
        height: 50,
        borderColor: '#E4B1F0',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        color: '#433878',
    },
    pickerItem: {
        fontSize: 16,
        color: '#433878',
    },
    botonGuardar: {
        backgroundColor: '#7E60BF',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
    },
    textoBoton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
