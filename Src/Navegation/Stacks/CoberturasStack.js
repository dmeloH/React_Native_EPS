import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarCoberturas from "../../../Screen/Coberturas/ListarCoberturas";
import DetalleCoberturas from "../../../Screen/Coberturas/DetalleCoberturas";
import EditarCoberturas from "../../../Screen/Coberturas/EditarCoberturas";


const Stack = createStackNavigator();

export default function CoberturasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarCoberturas"
                component={ListarCoberturas}
                options={{ title: "Coberturas" }}
            />
             <Stack.Screen 
                name= "DetalleCoberturas"
                component={DetalleCoberturas}
                options={{ title: "Detalle Coberturas" }}
            />
             <Stack.Screen 
                name= "EditarCoberturas"
                component={EditarCoberturas}
                options={{ title: "Nuevo/Editar Coberturas" }}
            />
        </Stack.Navigator>
    );
}