import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function DetalleMedico({ route, navigation }) {
   
    const { medicoId } = route.params;

    const [medico, setMedico] = useState(null);
    const [loading, setLoading] = useState(true);

  
    

    useEffect(() => {
        // Simular una carga de datos basada en el especialidadId
        const foundMedico = medicosEjemplo.find(me => me.id === medicoId);
        setMedico(foundMedico);
        setLoading(false);
    }, [medicoId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Medico...</Text>
            </View>
        );
    }

    if (!especialidad) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Medico</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este Medico.</Text>
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
        <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Medico</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.medicoName, {color: '#2c3e50'}]}>{medico.Nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{medico.id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Apellido: </Text>{medico.Apellido}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Correo: </Text>{medico.Correo}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Telefono: </Text>{medico.Telefono}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Tipo Documento: </Text>{medico.TipoDocumento}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Número Documento: </Text>{medico.NumeroDocumento}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Activo: </Text>{medico.Activo}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Id Especialidad: </Text>{medico.IdEspecialidad}</Text>

                {medico.Area && (
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Área: </Text>{medico.Area}</Text>
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
    medicoName: {
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