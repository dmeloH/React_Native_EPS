import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function DetalleUsuario({ route, navigation }) {
   
    const { usuarioId } = route.params;

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

  
    

    useEffect(() => {
        // Simular una carga de datos basada en el especialidadId
        const foundUsuario = usuariosEjemplo.find(co => co.id === usuarioId);
        setEspecialidad(foundEspecialidad);
        setLoading(false);
    }, [usuarioId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Usuario...</Text>
            </View>
        );
    }

    if (!usuario) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Usuario</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este usuario.</Text>
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
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Usuario</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.usuarioName, {color: '#2c3e50'}]}>{usuario.Nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{usuario.id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Número: </Text>{usuario.Numero}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Id Sede: </Text>{usuario.IdSede}</Text>

                {usuario.Area && (
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Área: </Text>{usuario.Area}</Text>
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
    usuarioName: {
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