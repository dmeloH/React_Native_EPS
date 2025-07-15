import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { crearUsuarios, editarUsuarios } from "../../Src/Servicios/UsuariosService";
import { listarCoberturas } from "../../Src/Servicios/CoberturasService";
import { listarEps } from "../../Src/Servicios/EpsService";
import { Picker } from "@react-native-picker/picker";

/**
 * Componente para crear o editar un usuario.
 * Permite seleccionar EPS y cobertura, así como capturar información básica del usuario.
 */
export default function EditarUsuarios({ navigation }) {
    const route = useRoute();
    const usuarios = route.params?.usuarios;

    // Estados para el formulario
    const [nombre_completo, setNombreCompleto] = useState(usuarios?.nombre_completo || "");
    const [tipo_documento, setTipoDocumento] = useState(usuarios?.tipo_documento || "");
    const [numero_documento, setNumeroDocumento] = useState(usuarios?.numero_documento || "");
    const [fecha_nacimiento, setFechaNacimiento] = useState(usuarios?.fecha_nacimiento?.slice(0, 10) || "");
    const [eps_id, setEps_id] = useState(usuarios?.eps_id?.toString() || "");
    const [cobertura_id, setCobertura_id] = useState(usuarios?.cobertura_id?.toString() || "");

    // Datos de EPS y Coberturas
    const [eps, setEps] = useState([]);
    const [coberturas, setCoberturas] = useState([]);
    const [loading, setLoading] = useState(false);

    const esEdicion = !!usuarios;

    const tiposDocumento = ["CC", "TI", "CE", "RC"];

    // Cargar EPS y Coberturas al montar el componente
    useEffect(() => {
        const loadData = async () => {
            try {
                const [epsResponse, coberturaResponse] = await Promise.all([
                    listarEps(),
                    listarCoberturas(),
                ]);

                if (epsResponse.success && coberturaResponse.success) {
                    setEps(epsResponse.data);
                    setCoberturas(coberturaResponse.data);
                } else {
                    Alert.alert("Error", "No se pudieron cargar EPS o Coberturas");
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
                Alert.alert("Error", "Ocurrió un error al cargar los datos.");
            }
        };

        loadData();
    }, []);

    /**
     * Valida y guarda los datos del usuario (crear o editar).
     */
    const handleGuardar = async () => {
        if (
            !nombre_completo ||
            !tipo_documento ||
            !numero_documento ||
            !fecha_nacimiento ||
            !eps_id ||
            isNaN(parseInt(eps_id)) ||
            !cobertura_id ||
            isNaN(parseInt(cobertura_id))
        ) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos correctamente.");
            return;
        }

        setLoading(true);

        const usuariosData = {
            nombre_completo,
            tipo_documento,
            numero_documento,
            fecha_nacimiento,
            eps_id: parseInt(eps_id),
            cobertura_id: parseInt(cobertura_id),
        };

        try {
            const result = esEdicion
                ? await editarUsuarios(usuarios.id, usuariosData)
                : await crearUsuarios(usuariosData);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Usuario actualizado correctamente" : "Usuario creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el usuario.");
            }
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            Alert.alert("Error", "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>{esEdicion ? "Editar Usuario" : "Nuevo Usuario"}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre Completo"
                    value={nombre_completo}
                    onChangeText={setNombreCompleto}
                />

                {/* Tipo de documento */}
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Tipo de Documento</Text>
                    <Picker
                        selectedValue={tipo_documento}
                        onValueChange={setTipoDocumento}
                        style={styles.picker}
                    >
                        <Picker.Item label="-- Seleccione --" value="" />
                        {tiposDocumento.map((tipo) => (
                            <Picker.Item key={tipo} label={tipo} value={tipo} />
                        ))}
                    </Picker>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Número Documento"
                    value={numero_documento}
                    onChangeText={setNumeroDocumento}
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
                    value={fecha_nacimiento}
                    onChangeText={setFechaNacimiento}
                />

                {/* EPS */}
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Seleccione una EPS</Text>
                    <Picker
                        selectedValue={eps_id}
                        onValueChange={setEps_id}
                        style={styles.picker}
                    >
                        <Picker.Item label="-- Seleccione EPS --" value="" />
                        {eps.map((item) => (
                            <Picker.Item key={item.id} label={item.nombre} value={String(item.id)} />
                        ))}
                    </Picker>
                </View>

                {/* Cobertura */}
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Seleccione una Cobertura</Text>
                    <Picker
                        selectedValue={cobertura_id}
                        onValueChange={setCobertura_id}
                        style={styles.picker}
                    >
                        <Picker.Item label="-- Seleccione Cobertura --" value="" />
                        {coberturas.map((item) => (
                            <Picker.Item key={item.id} label={item.tipo_afiliacion} value={String(item.id)} />
                        ))}
                    </Picker>
                </View>

                {/* Botón Guardar */}
                <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.textoBoton}>
                            {esEdicion ? "Guardar cambios" : "Crear Usuario"}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF5FA",
        paddingVertical: 30,
    },
    container: {
        width: "90%",
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#433878",
    },
    input: {
        height: 50,
        borderColor: "#dcdfe6",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
        fontSize: 16,
        color: "#333",
    },
    pickerContainer: {
        marginBottom: 16,
    },
    pickerLabel: {
        fontWeight: "bold",
        marginBottom: 6,
        fontSize: 15,
        color: "#7E60BF",
    },
    picker: {
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#dcdfe6",
        borderRadius: 10,
        color: "#333",
    },
    boton: {
        backgroundColor: "#7E60BF",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4.5,
        elevation: 5,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
