import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MedicoCard from "../../components/MedicoCard";
import { useNavigation } from "@react-navigation/native";
import { listarMedicos, eliminarMedico } from "../../Src/Servicios/MedicosService";

/**
 * Componente que renderiza la lista de médicos.
 * Permite consultar, eliminar, crear y navegar al detalle o edición de cada médico.
 */
export default function ListarMedico() {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    /**
     * Consulta la lista de médicos desde el backend.
     */
    const handleMedicos = async () => {
        setLoading(true);
        try {
            const result = await listarMedicos();
            if (result.success) {
                setMedicos(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar los médicos");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los médicos");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Escucha el evento de foco en la pantalla para recargar los datos.
     */
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleMedicos);
        return unsubscribe;
    }, [navigation]);

    /**
     * Maneja la eliminación de un médico con confirmación del usuario.
     * @param {number} id - ID del médico a eliminar
     */
    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar Médico",
            "¿Estás seguro de que deseas eliminar este médico?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarMedico(id);
                            if (result.success) {
                                handleMedicos();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el médico");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el médico");
                        }
                    },
                }
            ]
        );
    };

    /**
     * Navega a la pantalla de edición pasando los datos del médico.
     * @param {object} medico - Objeto del médico a editar
     */
    const handleEditar = (medico) => {
        navigation.navigate("EditarMedico", { medico });
    };

    /**
     * Navega a la pantalla de creación de un nuevo médico.
     */
    const handleCrear = () => {
        navigation.navigate("EditarMedico");
    };

    /**
     * Navega a la pantalla de detalle del médico.
     * @param {object} medico - Objeto del médico a visualizar
     */
    const handleDetalle = (medico) => {
        navigation.navigate("DetalleMedico", { medico });
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#7E60BF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Lista de médicos */}
            <FlatList
                data={medicos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MedicoCard
                        medico={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => handleDetalle(item)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay médicos registrados.</Text>}
                contentContainerStyle={medicos.length === 0 && styles.emptyListContainer}
            />

            {/* Botón para crear nuevo médico */}
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Médico</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5FC',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF5FC',
    },
    emptyText: {
        fontSize: 16,
        color: '#7F8C8D',
        textAlign: 'center',
        marginTop: 50,
        fontStyle: 'italic',
    },
    emptyListContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCrear: {
        backgroundColor: '#7E60BF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4.5,
        elevation: 6,
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonCrearIcon: {
        marginRight: 8,
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
