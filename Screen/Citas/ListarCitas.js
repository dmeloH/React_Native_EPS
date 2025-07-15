import {
    View,
    Text,
    FlatList,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import CitaCard from "../../components/CitaCard";
import { listarCitas, eliminarCita } from "../../Src/Servicios/CitasService";

/**
 * Pantalla que lista todas las citas médicas registradas.
 * Permite crear, editar, ver detalles o eliminar citas.
 */
export default function ListarCita() {
    const [citas, setCitas] = useState([]);           // Lista de citas
    const [loading, setLoading] = useState(true);     // Estado de carga
    const navigation = useNavigation();               // Hook de navegación

    /**
     * Función para cargar las citas desde el servicio.
     */
    const handleCitas = async () => {
        setLoading(true);
        try {
            const result = await listarCitas();
            if (result.success) {
                setCitas(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las citas.");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar las citas.");
        } finally {
            setLoading(false);
        }
    };

    // Carga las citas cada vez que se enfoca la pantalla
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCitas);
        return unsubscribe;
    }, [navigation]);

    /**
     * Maneja la eliminación de una cita, con confirmación.
     * @param {number} id - ID de la cita a eliminar
     */
    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar Cita",
            "¿Estás seguro de que deseas eliminar esta cita?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarCita(id);
                            if (result.success) {
                                handleCitas();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la cita");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la cita");
                        }
                    },
                }
            ]
        );
    };

    /**
     * Navega a la pantalla para crear una nueva cita.
     */
    const handleCrear = () => {
        navigation.navigate('EditarCitas');
    };

    /**
     * Navega a la pantalla para editar una cita existente.
     * @param {Object} cita - Objeto cita a editar
     */
    const handleEditar = (cita) => {
        navigation.navigate("EditarCitas", { cita });
    };

    /**
     * Navega a la pantalla de detalles de una cita.
     * @param {Object} cita - Objeto cita a visualizar
     */
    const handleDetalle = (cita) => {
        navigation.navigate("DetalleCitas", { cita });
    };

    /**
     * Muestra una vista de carga mientras se obtienen las citas.
     */
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#7E60BF" />
                <Text style={{ marginTop: 12, color: "#666" }}>Cargando citas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={citas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CitaCard
                        citas={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => handleDetalle(item)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay citas registradas.</Text>}
                contentContainerStyle={citas.length === 0 && styles.emptyListContainer}
            />

            {/* Botón flotante para crear una nueva cita */}
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Cita</Text>
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
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF5FC',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 50,
    },
    emptyListContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCrear: {
        backgroundColor: '#7E60BF',
        padding: 14,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonCrearIcon: {
        marginRight: 8,
    },
    textoBotonCrear: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
