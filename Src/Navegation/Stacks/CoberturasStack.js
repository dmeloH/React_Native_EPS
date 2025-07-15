import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importación de pantallas relacionadas con coberturas
import ListarCoberturas from "../../../Screen/Coberturas/ListarCoberturas";
import DetalleCoberturas from "../../../Screen/Coberturas/DetalleCoberturas";
import EditarCoberturas from "../../../Screen/Coberturas/EditarCoberturas";

// Creación del stack para el módulo de coberturas
const Stack = createStackNavigator();

/**
 * Navegación para el módulo de Coberturas
 * Incluye: listado, detalle y formulario de edición/creación.
 */
export default function CoberturasStack() {
    return (
        <Stack.Navigator
            initialRouteName="ListarCoberturas"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#7E60BF',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            {/* Pantalla principal: listado de coberturas */}
            <Stack.Screen 
                name="ListarCoberturas"
                component={ListarCoberturas}
                options={{ title: "Coberturas" }}
            />

            {/* Pantalla de detalle de una cobertura */}
            <Stack.Screen 
                name="DetalleCoberturas"
                component={DetalleCoberturas}
                options={{ title: "Detalle de Cobertura" }}
            />

            {/* Pantalla para crear o editar coberturas */}
            <Stack.Screen 
                name="EditarCoberturas"
                component={EditarCoberturas}
                options={{ title: "Nueva / Editar Cobertura" }}
            />
        </Stack.Navigator>
    );
}
