import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState, } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "¡Bienvenido!", [
          {
            text: "OK",
            onPress : () => {
              console.log ("Login exitoso, redirigiendo automáticamente...")
            }
          }
        ]);
      } else {
        Alert.alert(
          "Error de Login",
          result.message || "Ocurrió un error al iniciar sesión."
        );
      }
    } catch (error) {
      console.error("Error inesperado en login:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado al intentar iniciar sesión."
      );
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
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
      />
      <BottonComponent
        title="Ingresar"
        onPress={handleLogin}
        disabled={loading}
      />
      <BottonComponent
        title="¿No tienes cuenta?, Regístrate"
        onPress={() => navigation.navigate("Registro")}
        buttonStyle={{ backgroundColor: "#43A047", marginTop: 10 }}
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
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});