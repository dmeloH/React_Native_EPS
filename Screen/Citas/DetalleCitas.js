// DetalleCita.js
// Pantalla que muestra la información detallada de una cita médica seleccionada.
// Incluye datos relacionados del paciente y médico obtenidos por sus respectivos IDs.

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";

import BotonComponent from "../../components/BottonComponent";
import { listarUsuarios } from "../../Src/Servicios/UsuariosService";
import { listarMedicos } from "../../Src/Servicios/MedicosService";

/**
 * Componente funcional para visualizar los detalles de una cita médica.
 *
 * @param {object} route - Contiene los parámetros de navegación, incluyendo la cita.
 * @param {object} navigation - Permite controlar la navegación entre pantallas.
 * @returns {JSX.Element} Pantalla con detalles de cita.
 */
export default function DetalleCita({ route, navigation }) {
  const { cita } = route.params; // Recibe la cita seleccionada como parámetro

  // Estados para nombres relacionados y control de carga
  const [nombreUsuario, setNombreUsuario] = useState("Cargando...");
  const [nombreMedico, setNombreMedico] = useState("Cargando...");
  const [loading, setLoading] = useState(true);

  /**
   * useEffect que carga los datos del usuario y médico relacionados a la cita.
   * Se ejecuta una sola vez al montar el componente.
   */
  useEffect(() => {
    const fetchRelacionados = async () => {
      try {
        // Llamadas simultáneas a servicios
        const [usuariosRes, medicosRes] = await Promise.all([
          listarUsuarios(),
          listarMedicos(),
        ]);

        // Buscar nombre del usuario relacionado
        if (usuariosRes.success) {
          const usuario = usuariosRes.data.find(u => u.id === cita.id_usuario);
          setNombreUsuario(usuario?.nombre_completo || "Desconocido");
        }

        // Buscar nombre del médico relacionado
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

  // Pantalla de carga mientras se obtienen los datos
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#7E60BF" />
        <Text style={{ marginTop: 15, color: '#444' }}>
          Cargando detalles de la cita...
        </Text>
      </View>
    );
  }

  // Renderizado principal con detalles de la cita
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🗓️ Detalle de la Cita</Text>

      <View style={styles.detailCard}>
        <Text style={styles.citaName}>{cita?.tipo_cita}</Text>

        <View style={styles.separator} />

        {/* Información del paciente, médico y cita */}
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>👤 Paciente: </Text>
          {nombreUsuario}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>🩺 Médico: </Text>
          {nombreMedico}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>📅 Fecha: </Text>
          {cita?.fecha}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>⏰ Hora: </Text>
          {cita?.hora}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>🔖 Estado: </Text>
          {cita?.estado}
        </Text>

        <View style={styles.separator} />

        {/* Información económica */}
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>💰 Costo Total: </Text>${cita?.costo_total}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>🏥 Valor EPS: </Text>${cita?.valor_eps}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>🙋 Valor Usuario: </Text>${cita?.valor_usuario}
        </Text>
      </View>

      {/* Botón para volver al listado de citas */}
      <BotonComponent
        title="← Volver al Listado"
        onPress={() => navigation.goBack()}
        buttonStyle={styles.backButton}
        textStyle={styles.buttonText}
      />
    </SafeAreaView>
  );
}

// Estilos para la pantalla de detalle
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF5FC',
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: 'center',
    color: '#433878',
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: '#7E60BF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 25,
  },
  citaName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
    color: '#7E60BF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E4D7F5',
    marginVertical: 15,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  detailLabel: {
    fontWeight: '700',
    color: '#433878',
  },
  backButton: {
    backgroundColor: "#7E60BF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
