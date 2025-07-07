import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from '../../Screen/Auth/Login';
import PantallaRegistro from '../../Screen/Auth/Registro';

const Stack = createNativeStackNavigator();

export default function AuthNavegacion() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007B8C', // Un azul teal oscuro para el fondo de la cabecera
          shadowColor: '#000', // Sombra para la cabecera
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        headerTintColor: '#FFFFFF', // Color blanco para el texto del título y los iconos de la cabecera
        headerTitleStyle: {
          fontWeight: 'bold', // Título de la cabecera en negrita
          fontSize: 20, // Tamaño de fuente del título
        },
        headerTitleAlign: 'center', // Centrar el título de la cabecera
        contentStyle: { // Estilo para el contenido de la pantalla (fondo)
          backgroundColor: '#E0F2F7', // Fondo suave, consistente con el perfil
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={PantallaLogin}
        options={{ title: 'Iniciar Sesión' }}
      />
      <Stack.Screen
        name="Registro"
        component={PantallaRegistro}
        options={{ title: 'Registro' }}
      />
    </Stack.Navigator>
  );
}