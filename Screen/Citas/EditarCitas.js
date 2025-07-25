import React, { useState, useEffect } from "react";
import {
    Text, TextInput, StyleSheet, TouchableOpacity,
    ActivityIndicator, Alert
} from "react-native";
import { useRoute } from '@react-navigation/native';
import { crearCita, editarCita } from "../../Src/Servicios/CitasService";
import { listarUsuarios } from "../../Src/Servicios/UsuariosService";
import { listarMedicos } from "../../Src/Servicios/MedicosService";
import { Picker } from "@react-native-picker/picker";
import FormularioCard from "../../components/FormularioCard";

export default function EditarCitas({ navigation }) {
    const route = useRoute();
    const cita = route.params?.cita;

    const [usuarios, setUsuarios] = useState([]);
    const [medicos, setMedicos] = useState([]);

    const [usuarios_id, setUsuariosId] = useState(cita?.id_usuario || "");
    const [medico_id, setMedicoId] = useState(cita?.id_medico || "");
    const [tipo_cita, setTipoCita] = useState(cita?.tipo_cita || "");
    const [fecha, setFecha] = useState(cita?.fecha || "");
    const [hora, setHora] = useState(cita?.hora || "");
    const [estado, setEstado] = useState(cita?.estado || "");
    const [costo_total, setCostoTotal] = useState(cita?.costo_total?.toString() || "");
    const [valor_eps, setValorEps] = useState(cita?.valor_eps?.toString() || "");
    const [valor_usuario, setValorUsuario] = useState(cita?.valor_usuario?.toString() || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!cita;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuariosResult = await listarUsuarios();
                if (usuariosResult.success) setUsuarios(usuariosResult.data);

                const medicosResult = await listarMedicos();
                if (medicosResult.success) setMedicos(medicosResult.data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
        fetchData();
    }, []);

    const handleGuardar = async () => {
        if (!usuarios_id || !medico_id || !tipo_cita || !fecha || !hora || !estado || !costo_total || !valor_eps || !valor_usuario) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                id_usuario: parseInt(usuarios_id),
                id_medico: parseInt(medico_id),
                tipo_cita,
                fecha,
                hora,
                estado,
                costo_total: parseFloat(costo_total),
                valor_eps: parseFloat(valor_eps),
                valor_usuario: parseFloat(valor_usuario),
            };

            const result = esEdicion
                ? await editarCita(cita.id, payload)
                : await crearCita(payload);

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la cita.");
            }
        } catch (error) {
            console.error("Error al guardar cita:", error);
            Alert.alert("Error", "Hubo un problema al guardar la cita.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormularioCard>
            <Text style={styles.title}>
                {esEdicion ? "✏️ Editar Cita" : "🩺 Nueva Cita"}
            </Text>

            <Picker
                selectedValue={usuarios_id}
                onValueChange={setUsuariosId}
                style={styles.picker}
            >
                <Picker.Item label="Seleccione un usuario" value="" />
                {usuarios.map(u => (
                    <Picker.Item key={u.id} label={u.nombre_completo} value={u.id} />
                ))}
            </Picker>

            <Picker
                selectedValue={medico_id}
                onValueChange={setMedicoId}
                style={styles.picker}
            >
                <Picker.Item label="Seleccione un médico" value="" />
                {medicos.map(m => (
                    <Picker.Item key={m.id} label={m.nombre} value={m.id} />
                ))}
            </Picker>

            <Picker
                selectedValue={tipo_cita}
                onValueChange={setTipoCita}
                style={styles.picker}
                
            >
                <Picker.Item label="Seleccione tipo de cita" value="" />
                <Picker.Item label="Consulta" value="consulta" />
                <Picker.Item label="Urgencia" value="urgencia" />
            </Picker>

            <Picker
                selectedValue={estado}
                onValueChange={setEstado}
                style={styles.picker}
                itemStyle={styles.pickerItem}
            >
                <Picker.Item label="Seleccione estado" value="" />
                <Picker.Item label="Pendiente" value="1" />
                <Picker.Item label="Confirmada" value="2" />
                <Picker.Item label="Cancelada" value="3" />
            </Picker>

            <TextInput
                style={styles.input}
                placeholder="📅 Fecha (YYYY-MM-DD)"
                value={fecha}
                onChangeText={setFecha}
            />
            <TextInput
                style={styles.input}
                placeholder="⏰ Hora (HH:MM)"
                value={hora}
                onChangeText={setHora}
            />
            <TextInput
                style={styles.input}
                placeholder="💰 Costo Total"
                keyboardType="numeric"
                value={costo_total}
                onChangeText={setCostoTotal}
            />
            <TextInput
                style={styles.input}
                placeholder="🏥 Valor EPS"
                keyboardType="numeric"
                value={valor_eps}
                onChangeText={setValorEps}
            />
            <TextInput
                style={styles.input}
                placeholder="🙋 Valor Usuario"
                keyboardType="numeric"
                value={valor_usuario}
                onChangeText={setValorUsuario}
            />

            <TouchableOpacity
                style={styles.boton}
                onPress={handleGuardar}
                disabled={loading}
            >
                {loading
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.textoBoton}>
                        {esEdicion ? "Guardar cambios" : "Crear cita"}
                    </Text>}
            </TouchableOpacity>
        </FormularioCard>
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
    picker: {
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#dcdfe6",
        borderRadius: 10,
        marginBottom: 16,
        paddingHorizontal: 10,
        color: "#333",
    },
    input: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        height: 50,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        borderColor: "#E4B1F0",
        borderWidth: 1,
        color: "#333",
    },
    boton: {
        backgroundColor: "#7E60BF",
        paddingVertical: 15,
        borderRadius: 12,
        marginTop: 25,
        alignItems: "center",
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
