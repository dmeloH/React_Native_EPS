import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Configuracion from "../../../Screen/Configuracion/Configuracion"; 

const Stack = createStackNavigator();

export default function ConfiguracionesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ConfiguracionPantalla" 
                component={Configuracion} 
                options={{
                    title: "Configuraciones",
                    headerStyle: { // <-- Agregado para el color de encabezado
                        backgroundColor: '#6A5ACD', // Un color púrpura/lavanda para Configuración
                    },
                    headerTintColor: '#fff', // Color del texto del título y el icono de retroceso
                    headerTitleStyle: {
                        fontWeight: 'bold', // Título en negrita
                    },
                }}
            />
        </Stack.Navigator>
    );
}