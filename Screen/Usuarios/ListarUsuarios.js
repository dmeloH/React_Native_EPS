import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { listarUsuarios, eliminarUsuarios } from "../../Src/Servicios/UsuariosService";
import UsuariosCard from '../../components/UsuariosCard';

export default function ListarUsuarios() {
    // Estado local para almacenar usuarios y controlar la carga
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    /**
     * Función para obtener la lista de usuarios desde el servicio
     */
    const handleUsuarios = async () => {
        setLoading(true);
        try {
            const result = await listarUsuarios();
            if (result.success) {
                setUsuarios(result.data);
                console.log("Usuarios cargados:", result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar los usuarios");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los usuarios");
        } finally {
            setLoading(false);
        }
    };

    // Se vuelve a cargar la lista cada vez que se vuelve a enfocar esta pantalla
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleUsuarios);
        return unsubscribe;
    }, [navigation]);

    /**
     * Maneja la eliminación de un usuario con confirmación previa
     * @param {number} id - ID del usuario a eliminar
     */
    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar Usuarios",
            "¿Estás seguro de que deseas eliminar este usuario?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarUsuarios(id);
                            if (result.success) {
                                handleUsuarios(); // Actualiza la lista
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el usuario");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el usuario");
                        }
                    },
                }
            ]
        );
    };

    // Navega a la pantalla de creación de usuario
    const handleCrear = () => {
        navigation.navigate('EditarUsuarios');
    };

    // Navega a la pantalla de edición con los datos del usuario
    const handleEditar = (usuarios) => {
        navigation.navigate("EditarUsuarios", { usuarios });
    };

    // Navega a la pantalla de detalle del usuario
    const handleDetalle = (usuarios) => {
        navigation.navigate("DetalleUsuarios", { usuarios });
    };

    // Mientras se cargan los datos, muestra un indicador
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#7E60BF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Lista de usuarios */}
            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <UsuariosCard
                        usuarios={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => handleDetalle(item)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay usuarios registrados.</Text>}
            />

            {/* Botón para crear nuevo usuario */}
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Usuario</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFEFF8',
        paddingHorizontal: 12,
        paddingTop: 12,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFEFF8',
    },
    emptyText: {
        fontSize: 16,
        color: '#433878',
        textAlign: 'center',
        marginTop: 50,
    },
    botonCrear: {
        backgroundColor: '#7E60BF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: 'center',
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 6,
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonCrearIcon: {
        marginRight: 10,
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
