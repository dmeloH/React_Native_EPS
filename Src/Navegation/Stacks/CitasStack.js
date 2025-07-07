import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarCita from "../../../Screen/Citas/ListarCitas";
import DetalleCita from "../../../Screen/Citas/DetalleCitas";
import EditarCita from "../../../Screen/Citas/EditarCitas";
import AgregarCita from "../../../Screen/Citas/AgregarCitas";

const Stack = createStackNavigator();

export default function CitasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarCitas"
                component={ListarCita}
                options={{ title: "citas" }}
            />
             <Stack.Screen 
                name= "DetalleCitas"
                component={DetalleCita}
                options={{ title: "Detalle Cita" }}
            />
             <Stack.Screen 
                name= "EditarCitas"
                component={EditarCita}
                options={{ title: "Nuevo/Editar Citas" }}
            />
            <Stack.Screen
                name= "CrearCita" // Nuevo nombre de ruta para la pantalla de creación
                component={AgregarCita} // Asigna el nuevo componente
                options={{ title: "Nueva Especialidad" }}
            />
            
        </Stack.Navigator>
    );
}