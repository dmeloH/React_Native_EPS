import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent";

export default function DetalleCobertura({ route, navigation }) {
    const { cobertura } = route.params;

    if (!cobertura) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#f0f4f8' }]}>
                <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle de la Cobertura</Text>
                <View style={[styles.detailCard, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                    <Text style={[styles.errorText, { color: 'red' }]}>No se encontraron detalles para esta cobertura.</Text>
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

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#f0f4f8' }]}>
            <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle de la Cobertura</Text>

            <View style={[styles.detailCard, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}>
                    <Text style={styles.detailLabel}>ID: </Text>{cobertura.id}
                </Text>

                <Text style={[styles.detailText, { color: '#5C6F7F' }]}>
                    <Text style={styles.detailLabel}>Tipo de afiliación: </Text>{cobertura.tipo_afiliacion}
                </Text>

                <Text style={[styles.detailText, { color: '#5C6F7F' }]}>
                    <Text style={styles.detailLabel}>Porcentaje de cubrimiento: </Text>{cobertura.porcentaje_cubrimiento}%
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: 'center',
    },
    detailCard: {
        width: "100%",
        maxWidth: 400,
        padding: 25,
        borderRadius: 15,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        alignItems: "flex-start",
        marginBottom: 20,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
        width: '100%',
    },
    detailLabel: {
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
        width: '100%',
    },
    backButton: {
        backgroundColor: "#007B8C",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 15,
        width: '80%',
        maxWidth: 300,
        alignSelf: 'center',
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
