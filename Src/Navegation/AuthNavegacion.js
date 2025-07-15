// src/navigation/AuthNavegacion.js

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from '../../Screen/Auth/Login';
import PantallaRegistro from '../../Screen/Auth/Registro';

// Se crea el stack de navegación para autenticación
const Stack = createNativeStackNavigator();

/**
 * Navegador de autenticación que gestiona las pantallas
 * de inicio de sesión y registro.
 */
export default function AuthNavegacion() {
  return (
    <Stack.Navigator
      screenOptions={{
        // Estilos para la cabecera (header) de cada pantalla
        headerStyle: {
          backgroundColor: '#007B8C', // Azul oscuro tipo teal
          shadowColor: '#000',        // Color de la sombra de cabecera
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // Elevación para Android
        },
        headerTintColor: '#FFFFFF', // Color blanco para texto e íconos
        headerTitleStyle: {
          fontWeight: 'bold',        // Negrita para el título
          fontSize: 20,              // Tamaño del texto del título
        },
        headerTitleAlign: 'center',  // Centrado del título
        contentStyle: {
          backgroundColor: '#E0F2F7', // Color de fondo del contenido
        },
      }}
    >
      {/* Pantalla de Login */}
      <Stack.Screen
        name="Login"
        component={PantallaLogin}
        options={{ title: 'Iniciar Sesión' }}
      />

      {/* Pantalla de Registro */}
      <Stack.Screen
        name="Registro"
        component={PantallaRegistro}
        options={{ title: 'Registro' }}
      />
    </Stack.Navigator>
  );
}
