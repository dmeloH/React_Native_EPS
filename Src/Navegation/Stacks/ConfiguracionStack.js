import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Configuracion from "../../../Screen/Configuracion/Configuracion";

const Stack = createStackNavigator();

/**
 * Stack de navegación para la pantalla de configuración.
 */
export default function ConfiguracionesStack() {
    return (
        <Stack.Navigator
            initialRouteName="ConfiguracionPantalla"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6A5ACD', // Lavanda / púrpura suave
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name="ConfiguracionPantalla"
                component={Configuracion}
                options={{ title: "Configuraciones" }}
            />
        </Stack.Navigator>
    );
}
