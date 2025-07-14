import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function DetalleMedico({ route, navigation }) {
    const { medico } = route.params;

    if (!medico) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Detalle del Médico</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.errorText}>No se encontraron detalles para este médico.</Text>
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
            <Text style={styles.title}>Detalle del Médico</Text>

            <View style={styles.detailCard}>
                <Text style={styles.medicoName}>{medico.nombre}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Correo:</Text> {medico.correo}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Teléfono:</Text> {medico.telefono}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Dirección:</Text> {medico.direccion}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Número Documento:</Text> {medico.numero_documento}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Registro Profesional:</Text> {medico.registro_profesional}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Estado:</Text> {medico.estado}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Especialidad:</Text> {medico.especialidad}</Text>
                {medico.area && (
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Área:</Text> {medico.area}</Text>
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
    medicoName: {
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
