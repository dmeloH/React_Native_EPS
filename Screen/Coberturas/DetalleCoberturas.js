import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent";

/**
 * Componente que muestra los detalles de una cobertura específica.
 * Se accede a través de navegación con parámetros recibidos por `route`.
 *
 * @param {object} props - Props del componente, incluyendo `route` y `navigation`.
 * @returns {JSX.Element} Componente de detalle de cobertura.
 */
export default function DetalleCobertura({ route, navigation }) {
    const { cobertura } = route.params;

    // Si no hay datos de cobertura, mostrar mensaje de error.
    if (!cobertura) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Detalle de la Cobertura</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.errorText}>
                        No se encontraron detalles para esta cobertura.
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

    // Si hay datos, mostrar detalles de la cobertura
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Detalle de la Cobertura</Text>

            <View style={styles.detailCard}>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>ID: </Text>
                    {cobertura.id}
                </Text>

                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Tipo de afiliación: </Text>
                    {cobertura.tipo_afiliacion}
                </Text>

                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Porcentaje de cubrimiento: </Text>
                    {cobertura.porcentaje_cubrimiento}%
                </Text>
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
        backgroundColor: '#FFF5FC',
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#3C3C3C",
        marginBottom: 25,
        textAlign: 'center',
    },
    detailCard: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "#FFFFFF",
        padding: 25,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        marginBottom: 20,
    },
    detailText: {
        fontSize: 17,
        marginBottom: 12,
        color: "#5C6F7F",
    },
    detailLabel: {
        fontWeight: 'bold',
        color: "#3A3A3A",
    },
    errorText: {
        fontSize: 16,
        color: '#D32F2F',
        textAlign: 'center',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: "#7E60BF",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 300,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center',
    },
});
