import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarTipoCitas from "../../../Screen/TipoCitas/ListarTipoCitas";
import DetalleTipoCitas from "../../../Screen/TipoCitas/DetalleTipoCitas";
import EditarTipoCitas from "../../../Screen/TipoCitas/EditarTipoCitas";
import AgregarTipoCitas from "../../../Screen/TipoCitas/AgregarTipoCitas"; // Importa el nuevo componente

const Stack = createStackNavigator();

export default function TipoCitasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarTipoCitas"
                component={ListarTipoCitas}
                options={{ title: "Tipo Citas" }}
            />
            <Stack.Screen
                name= "DetalleTipo Citas"
                component={DetalleTipoCitas}
                options={{ title: "Detalle Tipo Citas" }}
            />
            <Stack.Screen
                name= "EditarTipo Citas"
                component={EditarTipoCitas}
                options={{ title: "Editar Tipo Citas" }} // Cambié el título para reflejar que es solo edición
            />
            <Stack.Screen
                name= "CrearTipo Citas" // Nuevo nombre de ruta para la pantalla de creación
                component={AgregarTipoCitas} // Asigna el nuevo componente
                options={{ title: "Nueva Tipo Citas" }}
            />
        </Stack.Navigator>
    );
}