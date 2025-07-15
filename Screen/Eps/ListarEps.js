import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { listarEps, eliminarEps } from '../../Src/Servicios/EpsService';
import EpsCard from '../../components/EpsCard';

/**
 * Pantalla que muestra una lista de EPS registradas en el sistema.
 * Permite al usuario ver detalles, editar o eliminar una EPS existente,
 * así como crear una nueva.
 */
export default function ListarEps() {
    const [epsList, setEpsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    /**
     * Función encargada de cargar las EPS desde el backend.
     */
    const cargarEps = async () => {
        setLoading(true);
        try {
            const result = await listarEps();
            if (result.success) {
                setEpsList(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las EPS.");
            }
        } catch (error) {
            Alert.alert("Error", "Ocurrió un error al cargar las EPS.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Efecto que recarga la lista cada vez que se vuelve a enfocar la pantalla.
     */
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', cargarEps);
        return unsubscribe;
    }, [navigation]);

    /**
     * Función que gestiona la eliminación de una EPS con confirmación.
     * @param {number} id - ID de la EPS a eliminar.
     */
    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar EPS",
            "¿Estás seguro de que deseas eliminar esta EPS?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarEps(id);
                            if (result.success) {
                                cargarEps();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la EPS.");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la EPS.");
                        }
                    },
                },
            ]
        );
    };

    // Navega a la pantalla de creación de una nueva EPS
    const handleCrear = () => navigation.navigate('EditarEps');

    // Navega a la pantalla de detalles de una EPS específica
    const handleDetalles = (eps) => navigation.navigate('DetalleEps', { eps });

    // Navega a la pantalla de edición de una EPS específica
    const handleEditar = (eps) => navigation.navigate('EditarEps', { eps });

    // Vista de carga
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#7E60BF" />
                <Text style={{ marginTop: 12, color: "#666" }}>Cargando EPS...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={epsList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EpsCard
                        eps={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetails={() => handleDetalles(item)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay EPS registradas.</Text>
                }
                contentContainerStyle={epsList.length === 0 && styles.emptyListContainer}
            />

            {/* Botón flotante para crear nueva EPS */}
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva EPS</Text>
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
