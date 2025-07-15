// LoginScreen.js
// Pantalla de inicio de sesión para la aplicación móvil.
// Permite al usuario autenticarse mediante correo electrónico y contraseña.

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent"; // Botón personalizado reutilizable
import { loginUser } from "../../Src/Servicios/AuthService"; // Servicio de autenticación

/**
 * Componente funcional que renderiza la pantalla de inicio de sesión.
 * 
 * @param {object} props - Props del componente.
 * @param {object} props.navigation - Objeto de navegación proporcionado por React Navigation.
 * @returns {JSX.Element} Componente de pantalla de login.
 */
export default function LoginScreen({ navigation }) {
  // Estados locales para el control de los campos de entrada y el estado de carga
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Maneja el proceso de autenticación del usuario.
   * Llama al servicio de login y muestra alertas según el resultado.
   */
  const handleLogin = async () => {
    setLoading(true); // Muestra estado de carga

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        Alert.alert("Éxito", "¡Bienvenido!", [
          {
            text: "OK",
            onPress: () => {
              console.log("Login exitoso, redirigiendo...");
              // Ejemplo de navegación: navigation.replace("Home");
            },
          },
        ]);
      } else {
        Alert.alert(
          "Error de Login",
          result.message || "Ocurrió un error al iniciar sesión."
        );
      }
    } catch (error) {
      console.error("Error inesperado durante el login:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado al intentar iniciar sesión. Intente nuevamente."
      );
    } finally {
      setLoading(false); // Oculta estado de carga
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Campo de entrada para el correo electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de entrada para la contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón de acción para enviar el formulario de login */}
      <BottonComponent
        title="Ingresar"
        onPress={handleLogin}
        disabled={loading}
      />

      {/* Botón para navegar a la pantalla de registro */}
      <BottonComponent
        title="¿No tienes cuenta?, Regístrate"
        onPress={() => navigation.navigate("Registro")}
        buttonStyle={{ backgroundColor: "#43A047", marginTop: 10 }}
        textStyle={{ color: "#FFFFFF" }}
      />
    </View>
  );
}

// Estilos definidos para el componente LoginScreen
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
    color: "#433878", // Título púrpura oscuro
  },
  input: {
    height: 50,
    borderColor: "#E4B1F0", // Borde rosado claro
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 18,
    backgroundColor: "#FFFFFF", // Fondo blanco de los campos
    color: "#433878", // Texto púrpura oscuro
  },
});
