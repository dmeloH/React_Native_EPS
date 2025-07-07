import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { getCitaById, listarCitas } from "../../Src/Servicios/CitasService";

export default function DetalleCita({ route, navigation }) {

    const { citaId } = route.params;

    const [cita, setCita] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        try {
            const result = getCitaById(citaId);
            if (result.success) {
                // Aquí podrías filtrar las citas si es necesario
                setCita(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las citas");
            }
        } catch (error) {
            console.error("Error al cargar citas:", error);
            Alert.alert("Error", "Ocurrió un error al cargar las citas.");
        }
    }, [citaId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Cita...</Text>
            </View>
        );
    }

    if (!cita) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#f0f4f8' }]}>
                <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle de la Cita</Text>
                <View style={[styles.detailCard, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                    <Text style={[styles.errorText, { color: 'red' }]}>No se encontraron detalles para esta cita.</Text>
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
            <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle de Cita</Text>

            <View style={[styles.detailCard, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                <Text style={[styles.especialidadName, { color: '#2c3e50' }]}>{cita.Nombre}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>ID: </Text>{cita.id}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Tipo de la cita: </Text>{cita.Tipo_cita}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Fecha: </Text>{cita.Fecha}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Hora: </Text>{cita.Hora}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Estado: </Text>{cita.Estado}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Costo: </Text>{cita.costo_total}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Valor EPS: </Text>{cita.valor_eps}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Valor Usuario: </Text>{cita.valor_usuario}</Text>

                {cita.Area && (
                    <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Área: </Text>{cita.Area}</Text>
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
    citaName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: 'center',
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 8,
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
        backgroundColor: "#007B8C", // Color consistente con el tema
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