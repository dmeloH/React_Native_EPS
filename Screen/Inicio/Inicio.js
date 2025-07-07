// src/Screen/Inicio/Inicio.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla para estilos responsivos
const itemWidth = (width / 2) - 30; // 2 ítems por fila con margen

import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



export default function Inicio() {
    const navigation = useNavigation();

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" /> {/* Estilo de la barra de estado */}
            <ScrollView style={styles.container}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Bienvenido a Eps</Text>
                    <Text style={styles.headerSubtitle}>Estado: <Text style={styles.statusText}>Habilitado</Text></Text>
                    <Text style={styles.headerSubtitle}>Carlos Estiven Rodriguez</Text>
                    
                </View>

                {/* Contenedor de las casillas de la cuadrícula */}
                <View style={styles.gridContainer}>
                    {/* Casilla de Citas */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('CitasFlow')}
                    >
                        <Fontisto name="date" size={24} color="black" />
                        <Text style={styles.gridItemText}>Citas</Text>
                    </TouchableOpacity>

                    {/* Casilla de Consultorios */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('ConsultoriosFlow')}
                    >
                        <MaterialCommunityIcons name="microsoft-office" size={24} color="gold" />
                        <Text style={styles.gridItemText}>Consultorios</Text>
                    </TouchableOpacity>

                    {/* Casilla de Eps */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('EpsFlow')}
                    >
                        <MaterialIcons name="health-and-safety" size={24} color="silver" />
                        <Text style={styles.gridItemText}>Eps</Text>
                    </TouchableOpacity>

                    {/* Casilla de Especialidades */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('EspecialidadesFlow')}
                    >
                        <MaterialCommunityIcons name="professional-hexagon" size={24} color="red" />
                        <Text style={styles.gridItemText}>Especialidades</Text>
                    </TouchableOpacity>
                    {/* Casilla de Medicos */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('MedicosFlow')}
                    >
                        <Fontisto name="doctor" size={24} color="lightblue" />
                        <Text style={styles.gridItemText}>Medicos</Text>
                    </TouchableOpacity>
                    {/* Casilla de Pacientes */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('PacientesFlow')}
                    >
                        <FontAwesome6 name="people-group" size={24} color="brown" />
                        <Text style={styles.gridItemText}>Pacientes</Text>
                    </TouchableOpacity>
                    {/* Casilla de Sedes */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('SedesFlow')}
                    >
                        <FontAwesome5 name="laptop-house" size={24} color="yellow" />
                        <Text style={styles.gridItemText}>Sedes</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f2f5', // Un fondo gris claro para toda la pantalla
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5', // Asegura que el fondo sea consistente
        padding: 20, // Padding general para el contenido
    },
    header: {
        alignItems: 'center',
        marginBottom: 40, // Más espacio debajo del encabezado
        marginTop: 20, // Espacio superior para el encabezado
    },
    headerTitle: {
        fontSize: 32, // Tamaño de fuente más grande para el título
        fontWeight: '800', // Más negrita
        color: '#333', // Color de texto oscuro
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#666', // Color de texto gris medio
    },
    statusText: {
        fontWeight: 'bold',
        color: '#28a745', // Un verde brillante para "Habilitado"
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Distribuye los ítems uniformemente
        paddingHorizontal: 5, // Pequeño padding horizontal
    },
    gridItem: {
        width: itemWidth, // Ancho calculado para 2 ítems por fila
        height: itemWidth, // Para hacerlo cuadrado
        backgroundColor: '#ffffff', // Fondo blanco para las casillas
        borderRadius: 15, // Bordes más redondeados
        marginVertical: 10, // Margen vertical entre filas
        alignItems: 'center',
        justifyContent: 'center',
        // Sombras para Android
        elevation: 8,
        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    gridItemText: {
        marginTop: 15, // Más espacio entre el icono y el texto
        fontSize: 17, // Tamaño de fuente ligeramente más grande
        fontWeight: '600', // Negrita media
        color: '#444', // Color de texto oscuro
        textAlign: 'center',
    },
});