import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

// Servicios de la API REST
import { listarCoberturas, eliminarCobertura } from "../../Src/Servicios/CoberturasService";

// Componente personalizado para mostrar datos de cobertura
import CoberturasCard from '../../components/CoberturasCard';

/**
 * Componente principal para listar todas las coberturas registradas.
 * Permite ver, editar, eliminar o crear nuevas coberturas.
 * 
 * @returns {JSX.Element} Componente de pantalla de listado
 */
export default function ListarCobertura() {
    // Estados del componente
    const [cobertura, setCoberturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    /**
     * Obtiene la lista de coberturas desde el servicio externo
     * y actualiza el estado local del componente.
     */
    const handleCoberturas = async () => {
        setLoading(true);
        try {
            const result = await listarCoberturas();
            if (result.success) {
                setCoberturas(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las coberturas.");
            }
        } catch (error) {
            Alert.alert("Error", "Ocurrió un error al cargar las coberturas.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Efecto que se ejecuta al enfocar la pantalla para refrescar los datos.
     */
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCoberturas);
        return unsubscribe;
    }, [navigation]);

    /**
     * Lanza una alerta de confirmación antes de eliminar una cobertura.
     * @param {number} id - ID de la cobertura a eliminar
     */
    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar Cobertura",
            "¿Estás seguro de que deseas eliminar esta cobertura?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarCobertura(id);
                            if (result.success) {
                                handleCoberturas();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la cobertura.");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la cobertura.");
                        }
                    },
                }
            ]
        );
    };

    /**
     * Navega a la pantalla para crear una nueva cobertura.
     */
    const handleCrear = () => {
        navigation.navigate('EditarCoberturas');
    };

    /**
     * Navega a la pantalla de edición de la cobertura seleccionada.
     * @param {object} cobertura - Objeto cobertura a editar
     */
    const handleEditar = (cobertura) => {
        navigation.navigate("EditarCoberturas", { cobertura });
    };

    /**
     * Navega a la pantalla de detalle de la cobertura seleccionada.
     * @param {object} cobertura - Objeto cobertura a mostrar en detalle
     */
    const handleDetalle = (cobertura) => {
        navigation.navigate("DetalleCoberturas", { cobertura });
    };

    // Mostrar loader mientras se cargan los datos
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#7E60BF" />
                <Text style={{ marginTop: 12, color: "#666" }}>Cargando coberturas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cobertura}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={cobertura.length === 0 && styles.emptyListContainer}
                renderItem={({ item }) => (
                    <CoberturasCard
                        cobertura={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => handleDetalle(item)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay coberturas registradas.</Text>
                }
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Cobertura</Text>
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
