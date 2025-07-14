import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent";

export default function DetalleEps({ route, navigation }) {
    const { eps } = route.params;

    if (!eps) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Detalle de EPS</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.errorText}>No se encontraron detalles para esta EPS.</Text>
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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Detalle de EPS</Text>

            <View style={styles.detailCard}>
                <Text style={styles.epsName}>{eps.nombre}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>ID:</Text> {eps.id}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Dirección:</Text> {eps.direccion}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Teléfono:</Text> {eps.telefono}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>NIT:</Text> {eps.nit}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Estado:</Text> {eps.estado}</Text>
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
        padding: 20,
        backgroundColor: '#f0f4f8',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: 'center',
        color: '#2c3e50',
    },
    detailCard: {
        width: "100%",
        maxWidth: 400,
        alignSelf: 'center',
        padding: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        marginBottom: 20,
    },
    epsName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 8,
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
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
        textAlign: 'center',
    },
});
