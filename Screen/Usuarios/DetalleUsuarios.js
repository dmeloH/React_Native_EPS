import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView
} from "react-native";
import BotonComponent from "../../components/BottonComponent";

// Servicios para obtener información relacionada
import { listarCoberturas } from "../../Src/Servicios/CoberturasService";
import { listarEps } from "../../Src/Servicios/EpsService";

/**
 * Componente que muestra el detalle de un usuario, incluyendo información de EPS y cobertura.
 * @param {object} props - Props del componente.
 * @param {object} props.route - Ruta que contiene parámetros de navegación.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 */
export default function DetalleUsuario({ route, navigation }) {
    const { usuarios } = route.params;

    // Estados locales
    const [epsNombre, setEpsNombre] = useState("Cargando...");
    const [coberturaNombre, setCoberturaNombre] = useState("Cargando...");
    const [loading, setLoading] = useState(true);

    /**
     * useEffect para cargar datos relacionados (EPS y cobertura).
     */
    useEffect(() => {
        const fetchRelacionados = async () => {
            try {
                // Obtener EPS y coberturas en paralelo
                const [epsResponse, coberturaResponse] = await Promise.all([
                    listarEps(),
                    listarCoberturas()
                ]);

                // Buscar EPS correspondiente al usuario
                if (epsResponse.success && Array.isArray(epsResponse.data)) {
                    const eps = epsResponse.data.find(e => Number(e.id) === Number(usuarios.eps_id));
                    setEpsNombre(eps?.tipo_afiliacion ?? eps?.nombre ?? "No definida");
                }

                // Buscar cobertura correspondiente al usuario
                if (coberturaResponse.success && Array.isArray(coberturaResponse.data)) {
                    const cobertura = coberturaResponse.data.find(c => Number(c.id) === Number(usuarios.cobertura_id));
                    setCoberturaNombre(cobertura?.porcentaje_cubrimiento ?? "No definida");
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

    // Mostrar spinner mientras se cargan los datos
    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#7E60BF" />
                <Text style={{ marginTop: 15, color: '#555' }}>Cargando detalles del usuario...</Text>
            </View>
        );
    }

    // Render principal
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Detalle del Usuario</Text>

            <View style={styles.detailCard}>
                <Text style={styles.usuarioName}>{usuarios.nombre_completo}</Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Tipo Documento:</Text> {usuarios.tipo_documento}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Número Documento:</Text> {usuarios.numero_documento}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Fecha de Nacimiento:</Text> {usuarios.fecha_nacimiento}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>EPS:</Text> {epsNombre}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Cobertura:</Text> {coberturaNombre} %
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
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: '#FFF5FA', // Fondo rosado claro
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: 'center',
        color: '#433878',
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
        color: '#7E60BF',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 8,
        width: '100%',
        color: '#433878',
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    backButton: {
        backgroundColor: "#7E60BF",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 15,
        width: '80%',
        maxWidth: 300,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
