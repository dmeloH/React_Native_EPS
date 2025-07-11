// src/Screen/Inicio/Inicio.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const itemWidth = (width / 2) - 30;

export default function Inicio() {
    const navigation = useNavigation();

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" />
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Bienvenido a Eps</Text>
                    <Text style={styles.headerSubtitle}>
                        Estado: <Text style={styles.statusText}>Habilitado</Text>
                    </Text>
                </View>

                {/* Iconos con nombres */}
                <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToFlow('CitasFlow')}>
                        <Fontisto name="date" size={45} color="#FF8282" style={styles.iconShadow} />
                        <Text style={styles.iconLabel}>Citas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToFlow('UsuariosFlow')}>
                        <MaterialCommunityIcons name="account-multiple-plus" size={45} color="#FF8282" style={styles.iconShadow} />
                        <Text style={styles.iconLabel}>Usuarios</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToFlow('EpsFlow')}>
                        <MaterialCommunityIcons name="city-variant" size={45} color="#FF6363" style={styles.iconShadow} />
                        <Text style={styles.iconLabel}>Eps</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToFlow('CoberturasFlow')}>
                        <MaterialCommunityIcons name="mother-heart" size={45} color="#FF6363" style={styles.iconShadow} />
                        <Text style={styles.iconLabel}>Coberturas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigateToFlow('MedicosFlow')}>
                        <Fontisto name="doctor" size={45} color="#rgb(190, 228, 208)" style={styles.iconShadow} />
                        <Text style={styles.iconLabel}>Medicos</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        alignItems: 'center', // Centra todo el contenido
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 100,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#333',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#666',
    },
    statusText: {
        fontWeight: 'bold',
        color: '#28a745',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    iconContainer: {
        width: itemWidth,
        alignItems: 'center',
        marginVertical: 15,
    },
    iconShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 4 },
        textShadowRadius: 6,
    },
    iconLabel: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        textAlign: 'center',
    },
});
