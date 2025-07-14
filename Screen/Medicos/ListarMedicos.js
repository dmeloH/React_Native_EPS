import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons
import MedicoCard from "../../components/MedicoCard";
import { useNavigation } from "@react-navigation/native";
import { listarMedicos, eliminarMedico } from "../../Src/Servicios/MedicosService";

export default function ListarMedico (){
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleMedicos = async () => {
        setLoading(true);
        try {
            const result = await listarMedicos();
            if (result.success) {
                setMedicos(result.data);
            } else {
                Alert.alert ("Error", result.message || "No se pudierón cargas los medicos");
            }
        } catch (error) {
            Alert.alert ("Error", "No se pudierón cargas los medicos");
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleMedicos);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar Medico",
            "¿Estás seguro de que deseas eliminar este medico?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",

                    onPress: async () => {
                        try {
                            const result = await eliminarMedico(id);
                            if (result.success) {
                                // setEspecialidades (especialidades.filter((e) => e.id !== id));
                                handleMedicos();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el Medico");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el medico");
                        }
                    },
                }
            ]
        )
    }

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1976D2" />
            </View>
        );
    }

    const handleEditar = (medico) => {
        navigation.navigate("EditarMedico", {medico});
    }

    const handleCrear = () => {
        navigation.navigate("EditarMedico"); 
    }

    const handleDetalle = (medico) => {
        navigation.navigate("DetalleMedico", {medico});    
    }

    return (
        <View style={{flex: 1}}>
            <FlatList
            data={medicos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <MedicoCard
                medico = {item}
                onEdit={() => handleEditar (item)}
                onDelete={() => handleEliminar (item.id)}
                onDetail={()=> handleDetalle(item)}
            />
            )}
            ListEmptyComponent = {<Text style = {styles.emptyText}>No Hay Medicos Registrados. </Text>}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Medico</Text>
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