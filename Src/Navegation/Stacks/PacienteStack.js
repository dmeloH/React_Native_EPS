import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarPaciente from "../../../Screen/Pacientes/ListarPaciente";
import DetallePaciente from "../../../Screen/Pacientes/DetallePaciente";
import EditarPaciente from "../../../Screen/Pacientes/EditarPaciente";

const Stack = createStackNavigator();

export default function PacientesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarPacientes"
                component={ListarPaciente}
                options={{ title: "Paciente" }}
            />
             <Stack.Screen 
                name= "DetallePaciente"
                component={DetallePaciente}
                options={{ title: "Detalle Paciente" }}
            />
             <Stack.Screen 
                name= "EditarPaciente"
                component={EditarPaciente}
                options={{ title: "Nuevo/Editar Paciente" }}
            />
            <Stack.Screen
                name= "CrearPaciente" // Nuevo nombre de ruta para la pantalla de creación
                component={AgregarPaciente} // Asigna el nuevo componente
                options={{ title: "Nuevo Paciente" }}
            />
        </Stack.Navigator>
    );
}