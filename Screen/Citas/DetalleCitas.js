import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { listarUsuarios } from "../../Src/Servicios/UsuariosService";
import { listarMedicos } from "../../Src/Servicios/MedicosService";

export default function DetalleCita({ route, navigation }) {
  const { cita } = route.params;

  const [nombreUsuario, setNombreUsuario] = useState("Cargando...");
  const [nombreMedico, setNombreMedico] = useState("Cargando...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelacionados = async () => {
      try {
        const [usuariosRes, medicosRes] = await Promise.all([
          listarUsuarios(),
          listarMedicos(),
        ]);

        if (usuariosRes.success) {
          const usuario = usuariosRes.data.find(u => u.id === cita.id_usuario);
          setNombreUsuario(usuario?.nombre_completo || "Desconocido");
        }

        if (medicosRes.success) {
          const medico = medicosRes.data.find(m => m.id === cita.id_medico);
          setNombreMedico(medico?.nombre || "Desconocido");
        }
      } catch (error) {
        console.error("Error al cargar datos relacionados:", error);
        Alert.alert("Error", "No se pudieron cargar los datos relacionados.");
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
        <Text style={{ marginTop: 15 }}>Cargando detalles de la cita...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Detalle de Cita</Text>

      <View style={styles.detailCard}>
        <Text style={styles.citaName}>{cita?.tipo_cita}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Paciente: </Text>{nombreUsuario}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Médico: </Text>{nombreMedico}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Fecha: </Text>{cita?.fecha}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Hora: </Text>{cita?.hora}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Estado: </Text>{cita?.estado}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Costo Total: </Text>{cita?.costo_total}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Valor EPS: </Text>{cita?.valor_eps}</Text>
        <Text style={styles.detailText}><Text style={styles.detailLabel}>Valor Usuario: </Text>{cita?.valor_usuario}</Text>
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
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 25,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
  },
  citaName: {
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
  },
  backButton: {
    backgroundColor: "#007B8C",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
    alignSelf: 'center',
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
