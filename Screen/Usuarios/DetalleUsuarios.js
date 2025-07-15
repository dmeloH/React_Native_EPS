import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { listarCoberturas } from "../../Src/Servicios/CoberturasService";
import { listarEps } from "../../Src/Servicios/EpsService";

export default function DetalleUsuario({ route, navigation }) {
    const { usuarios } = route.params;

    const [epsNombre, setEpsNombre] = useState("Cargando...");
    const [coberturaNombre, setCoberturaNombre] = useState("Cargando...");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRelacionados = async () => {
            try {
                const [epsResponse, coberturaResponse] = await Promise.all([listarEps(), listarCoberturas()]);

                if (epsResponse.success && Array.isArray(epsResponse.data)) {
                    const eps = epsResponse.data.find(e => Number(e.id) === Number(usuarios.eps_id));
                    setEpsNombre(eps ? (eps.tipo_afiliacion ?? eps.nombre ?? "No definida") : "No encontrada");
                }

                if (coberturaResponse.success && Array.isArray(coberturaResponse.data)) {
                    const cobertura = coberturaResponse.data.find(c => Number(c.id) === Number(usuarios.cobertura_id));
                    setCoberturaNombre(cobertura ? (cobertura.porcentaje_cubrimiento ?? "No definida") : "No encontrada");
                }
            } catch (error) {
                console.error("Error al obtener EPS o Cobertura:", error);
                setEpsNombre("Error");
                setCoberturaNombre("Error");
            } finally {
                setLoading(false);
            }
        };

        fetchRelacionados();
    }, []);


    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15 }}>Cargando detalles del Usuario...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Detalle del Usuario</Text>

            <View style={styles.detailCard}>
                <Text style={styles.usuarioName}>{usuarios.nombre_completo}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Tipo Documento: </Text>{usuarios.tipo_documento}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Número Documento: </Text>{usuarios.numero_documento}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Fecha de Nacimiento: </Text>{usuarios.fecha_nacimiento}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>EPS: </Text>{epsNombre}</Text>
                <Text style={styles.detailText}><Text style={styles.detailLabel}>Cobertura: </Text>{coberturaNombre} %</Text>
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
        backgroundColor: '#f0f4f8',
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
        backgroundColor: "#FFFFFF",
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
