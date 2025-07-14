import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons
import { useNavigation } from "@react-navigation/native";
import { listarCoberturas, eliminarCobertura } from "../../Src/Servicios/CoberturasService";
import CoberturasCard from '../../components/CoberturasCard';

export default function ListarCobertura (){
    const [cobertura, setCoberturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleCoberturas = async () => {
        setLoading(true);
        try {
            const result = await listarCoberturas();
            if (result.success) {
                setCoberturas(result.data);
            } else {
                Alert.alert ("Error", result.message || "No se pudierón cargas las Coberturas");
            }
        } catch (error) {
            Alert.alert ("Error", "No se pudierón cargas las Coberturas");
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCoberturas);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar Cobertura",
            "¿Estás seguro de que deseas eliminar esta Cobertura?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",

                    onPress: async () => {
                        try {
                            const result = await eliminarCobertura(id);
                            if (result.success) {
                                // setEspecialidades (especialidades.filter((e) => e.id !== id));
                                handleCoberturas();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la Cobertura");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la Cobertura");
                        }
                    },
                }
            ]
        )
    }

    const handleCrear = () => {
        navigation.navigate('EditarCoberturas');
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1976D2" />
            </View>
        );
    }

    const handleEditar = (cobertura) => {
        navigation.navigate("EditarCoberturas", {cobertura});
    }

    const handleDetalle = (cobertura) => {
        navigation.navigate("DetalleCoberturas", {cobertura});
    }

    return (
        <View style={{flex: 1}}>
            <FlatList
            data={cobertura}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <CoberturasCard
                cobertura= {item}
                onEdit={() => handleEditar (item)}
                onDelete={() => handleEliminar (item.id)}
                onDetail={() => handleDetalle(item)}
            />
            )}
            ListEmptyComponent = {<Text style = {styles.emptyText}>No Hay Coberturas Registradas. </Text>}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Cobertura</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
    },
    emptyText: {
        fontSize: 16,
        color: '#7F8C8D',
        textAlign: 'center',
        marginTop: 50,
    },
    emptyListContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCrear: { // Estilo para el TouchableOpacity
        backgroundColor: '#1976D2', // Color de fondo
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        margin: 10,
        // Sombra para un efecto más bonito
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    botonCrearContent: { // Contenedor interno para el icono y el texto
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonCrearIcon: { // Estilo para el icono
        marginRight: 8, // Espacio entre el icono y el texto
    },
    textoBotonCrear: { // Estilo para el texto del botón
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});