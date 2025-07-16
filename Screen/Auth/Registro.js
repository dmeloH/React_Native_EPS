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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    if (!name || !email || !password || !confirmPassword || !role) {
      setError(
        "Todos los campos (nombre, correo, contraseña, confirmar contraseña, rol) son obligatorios."
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      const result = await Register(name, email, password, role);
      console.log("Resultado del registro:", result);

      if (result.success) {
        Alert.alert("Éxito", "¡Registro exitoso! Ahora puedes iniciar sesión.", [
          {
            text: "OK",
            onPress: () => navigation.replace("Login"), // ✅ redirección corregida
          },
        ]);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Rol (ej. user o admin)"
        value={role}
        onChangeText={setRole}
        autoCapitalize="none"
      />

      <BottonComponent
        title={loading ? <ActivityIndicator color="#fff" /> : "Regístrate"}
        onPress={handleRegister}
        disabled={loading}
      />

      <BottonComponent
        title="¿Ya tienes cuenta?, Iniciar Sesión"
        onPress={() => navigation.navigate("Login")}
        buttonStyle={{ backgroundColor: "#3498DB", marginTop: 10 }}
        textStyle={{ color: "#FFFFFF" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFEFF8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#433878",
  },
  input: {
    height: 50,
    borderColor: "#E4B1F0",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    color: "#433878",
  },
  errorText: {
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
