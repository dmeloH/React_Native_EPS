import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarEspecialidad from "../../../Screen/Especialidades/ListarEspecialidad";
import DetalleEspecialidad from "../../../Screen/Especialidades/DetalleEspecialidad";
import EditarEspecialidad from "../../../Screen/Especialidades/EditarEspecialidad";
import AgregarEspecialidad from "../../../Screen/Especialidades/AgregarEspecialidad"; // Importa el nuevo componente

const Stack = createStackNavigator();

export default function EspecialidadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarEspecialidades"
                component={ListarEspecialidad}
                options={{ title: "Especialidad" }}
            />
            <Stack.Screen
                name= "DetalleEspecialidad"
                component={DetalleEspecialidad}
                options={{ title: "Detalle Especialidad" }}
            />
            <Stack.Screen
                name= "EditarEspecialidad"
                component={EditarEspecialidad}
                options={{ title: "Editar Especialidad" }} // Cambié el título para reflejar que es solo edición
            />
            <Stack.Screen
                name= "CrearEspecialidad" // Nuevo nombre de ruta para la pantalla de creación
                component={AgregarEspecialidad} // Asigna el nuevo componente
                options={{ title: "Nueva Especialidad" }}
            />
        </Stack.Navigator>
    );
}