import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent";

/**
 * Componente que muestra el detalle de una EPS (Entidad Promotora de Salud).
 *
 * @component
 * @param {object} route - Propiedad que contiene los parámetros enviados a la ruta.
 * @param {object} navigation - Propiedad que permite manejar la navegación entre pantallas.
 * @returns {JSX.Element} Vista detallada de la EPS seleccionada.
 */
export default function DetalleEps({ route, navigation }) {
    const { eps } = route.params;

    // Validación: Si no hay información de EPS, mostrar mensaje de error y botón de regreso.
    if (!eps) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Detalle de EPS</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.errorText}>
                        No se encontraron detalles para esta EPS.
                    </Text>
                    <BotonComponent
                        title="Volver al Listado"
                        onPress={() => navigation.goBack()}
                        buttonStyle={styles.botonVolver}
                        textStyle={styles.textoBoton}
                    />
                </View>
            </SafeAreaView>
        );
    }

    // Renderizado principal con los datos completos de la EPS
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Detalle de EPS</Text>

            <View style={styles.detailCard}>
                <Text style={styles.epsName}>{eps.nombre}</Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>ID:</Text> {eps.id}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Dirección:</Text> {eps.direccion}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Teléfono:</Text> {eps.telefono}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>NIT:</Text> {eps.nit}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Estado:</Text> {eps.estado}
                </Text>
            </View>

            <BotonComponent
                title="Volver al Listado"
                onPress={() => navigation.goBack()}
                buttonStyle={styles.botonVolver}
                textStyle={styles.textoBoton}
            />
        </SafeAreaView>
    );
}

// Estilos del componente definidos con claridad y coherencia visual
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF5FC',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: 'center',
        color: '#433878',
    },
    detailCard: {
        width: "100%",
        maxWidth: 400,
        alignSelf: 'center',
        padding: 24,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
        marginBottom: 24,
    },
    epsName: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: 'center',
        color: '#7E60BF',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E4B1F0',
        paddingBottom: 8,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#444',
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
    botonVolver: {
        backgroundColor: '#7E60BF',
        padding: 14,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
        alignSelf: 'center',
        width: '80%',
        maxWidth: 300,
    },
    textoBoton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});
