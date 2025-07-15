/**
 * DetalleMedico.js
 * 
 * Pantalla que muestra los detalles completos de un médico seleccionado.
 * Forma parte del módulo de gestión de personal médico.
 * 
 * @author [Tu Nombre]
 * @date [Fecha]
 */

import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent";

/**
 * Componente funcional que muestra la información detallada de un médico.
 * 
 * @param {object} route - Objeto de navegación que contiene los parámetros pasados.
 * @param {object} navigation - Objeto de navegación para moverse entre pantallas.
 */
export default function DetalleMedico({ route, navigation }) {
    const { medico } = route.params;

    // Si no hay datos del médico, muestra mensaje de error
    if (!medico) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Detalle del Médico</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.errorText}>
                        No se encontraron detalles para este médico.
                    </Text>
                    <BotonComponent
                        title="Volver al Listado"
                        onPress={() => navigation.goBack()}
                        buttonStyle={styles.backButton}
                        textStyle={styles.buttonText}
                    />
                </View>
            </SafeAreaView>
        );
    }

    // Renderizado de los datos del médico
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Detalle del Médico</Text>

            <View style={styles.detailCard}>
                <Text style={styles.medicoName}>{medico.nombre}</Text>

                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Correo:</Text> {medico.correo}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Teléfono:</Text> {medico.telefono}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Dirección:</Text> {medico.direccion}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Número Documento:</Text> {medico.numero_documento}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Registro Profesional:</Text> {medico.registro_profesional}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Estado:</Text> {medico.estado}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Especialidad:</Text> {medico.especialidad}
                </Text>

                {/* Validación de campo opcional */}
                {medico.area && (
                    <Text style={styles.detailText}>
                        <Text style={styles.detailLabel}>Área:</Text> {medico.area}
                    </Text>
                )}
            </View>

            <BotonComponent
                title="Volver al Listado"
                onPress={() => navigation.goBack()}
                buttonStyle={styles.backButton}
                textStyle={styles.buttonText}
            />
        </SafeAreaView>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF5FC', // Fondo suave rosado
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: 'center',
        color: '#433878', // Tono púrpura oscuro
    },
    detailCard: {
        width: "100%",
        maxWidth: 400,
        alignSelf: 'center',
        padding: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        marginBottom: 20,
    },
    medicoName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        color: '#2c3e50',
    },
    detailText: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#433878',
    },
    errorText: {
        fontSize: 18,
        color: '#B00020',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: "#7E60BF",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 15,
        width: '80%',
        maxWidth: 300,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center',
    },
});
