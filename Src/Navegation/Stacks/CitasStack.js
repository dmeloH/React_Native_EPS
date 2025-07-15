import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importación de las pantallas relacionadas con las citas
import ListarCita from "../../../Screen/Citas/ListarCitas";
import DetalleCita from "../../../Screen/Citas/DetalleCitas";
import EditarCita from "../../../Screen/Citas/EditarCitas";

// Creación del stack de navegación para la sección de citas
const Stack = createStackNavigator();

/**
 * Componente de navegación para las pantallas de citas.
 * Este stack agrupa las vistas: listar, detalle y editar cita.
 */
export default function CitasStack () {
    return (
        <Stack.Navigator
            initialRouteName="ListarCitas" // Pantalla inicial del stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#7E60BF',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            {/* Pantalla que muestra la lista de citas */}
            <Stack.Screen 
                name="ListarCitas"
                component={ListarCita}
                options={{ title: "Citas" }}
            />

            {/* Pantalla de detalle de una cita específica */}
            <Stack.Screen 
                name="DetalleCitas"
                component={DetalleCita}
                options={{ title: "Detalle de la Cita" }}
            />

            {/* Pantalla para crear o editar una cita */}
            <Stack.Screen 
                name="EditarCitas"
                component={EditarCita}
                options={{ title: "Nueva / Editar Cita" }}
            />           
        </Stack.Navigator>
    );
}
