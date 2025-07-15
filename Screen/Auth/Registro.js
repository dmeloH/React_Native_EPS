// RegistroScreen.js
// Pantalla de registro de nuevos usuarios.
// Permite registrar nombre, correo, contraseña, confirmación y rol del usuario.

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { Register } from "../../Src/Servicios/AuthService";

/**
 * Componente funcional para el registro de usuarios.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @returns {JSX.Element} Pantalla de registro.
 */
export default function RegistroScreen({ navigation }) {
  // Estados locales para capturar los valores del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // Puede ser "admin", "user", etc.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Maneja el proceso de validación y registro del usuario.
   * Realiza validaciones básicas y llama al servicio Register.
   */
  const handleRegister = async () => {
    setError("");
    setLoading(true);

    // Validación de campos vacíos
    if (!name || !email || !password || !confirmPassword || !role) {
      setError(
        "Todos los campos (nombre, correo, contraseña, confirmar contraseña, rol) son obligatorios."
      );
      setLoading(false);
      return;
    }

    // Validación de coincidencia de contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      // Llamado al servicio de registro
      const result = await Register(name, email, password, role);

      if (result.success) {
        Alert.alert("Éxito", "¡Registro exitoso! Ahora puedes iniciar sesión.");
        navigation.navigate("Login"); // Navegación a pantalla de login
      } else {
        Alert.alert(
          "Error de Registro",
          result.message || "Ocurrió un error al registrar el usuario."
        );
      }
    } catch (err) {
      console.error("Error inesperado en el registro:", err);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado al intentar registrarse."
      );
    } finally {
      setLoading(false);
    }
  };

  // Interfaz del usuario para el registro
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      {/* Mensaje de error si aplica */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Input: Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={name}
        onChangeText={setName}
      />

      {/* Input: Correo electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Input: Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      {/* Input: Confirmar contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
      />

      {/* Input: Rol del usuario */}
      <TextInput
        style={styles.input}
        placeholder="Rol (ej. user o admin)"
        value={role}
        onChangeText={setRole}
        autoCapitalize="none"
      />

      {/* Botón de registro con indicador de carga */}
      <BottonComponent
        title={loading ? <ActivityIndicator color="#fff" /> : "Regístrate"}
        onPress={handleRegister}
        disabled={loading}
      />

      {/* Botón para volver al login */}
      <BottonComponent
        title="¿Ya tienes cuenta?, Iniciar Sesión"
        onPress={() => navigation.navigate("Login")}
        buttonStyle={{ backgroundColor: "#3498DB", marginTop: 10 }}
        textStyle={{ color: "#FFFFFF" }}
      />
    </View>
  );
}

// Estilos del componente RegistroScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFEFF8", // Fondo rosado suave
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#433878", // Púrpura oscuro
  },
  input: {
    height: 50,
    borderColor: "#E4B1F0", // Borde rosado claro
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF", // Fondo blanco
    color: "#433878", // Texto púrpura oscuro
  },
  errorText: {
    color: "#D32F2F", // Rojo para errores
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
