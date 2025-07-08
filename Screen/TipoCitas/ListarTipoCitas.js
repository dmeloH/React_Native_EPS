import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons
import BotonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta
import CitaCard from "../../components/CitaCard";
import { useNavigation } from "@react-navigation/native";
import { listarTipoCitas, eliminarTipoCitas } from "../../Src/Servicios/TipoCitasService";

export default function ListarTipoCitas (){
    const [tipoCitas, setTipoCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleTipoCitas = async () => {
        setLoading(true);
        try {
            const result = await listarTipoCitas();
            if (result.success) {
                setTipoCitas(result.data);
            } else {
                Alert.alert ("Error", result.message || "No se pudierón cargas las tipoCitas");
            }
        } catch (error) {
            Alert.alert ("Error", "No se pudierón cargas las tipoCitas");
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleTipoCitas);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar TipoCitas",
            "¿Estás seguro de que deseas eliminar esta especialidad?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",

                    onPress: async () => {
                        try {
                            const result = await eliminarTipoCitas(id);
                            if (result.success) {
                                // setTipoCitas (tipoCitas.filter((e) => e.id !== id));
                                handleTipoCitas();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la TipoCitas");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la especialidad");
                        }
                    },
                }
            ]
        )
    }

    const handleCrear = () => {
        navigation.navigate('CrearTipoCitas');
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1976D2" />
            </View>
        );
    }

    const handleEditar = (especialidad) => {
        navigation.navigate("EditarTipoCitas", {especialidad});


    }

    return (
        <View style={{flex: 1}}>
            <FlatList
            data={tipoCitas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <CitaCard
                especialidad= {item}
                onEdit={() => handleEditar (item)}
                onDelete={() => handleEliminar (item.id)}
            />
            )}
            ListEmptyComponent = {<Text style = {styles.emptyText}>No Hay TipoCitas Registradas. </Text>}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva TipoCitas</Text>
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