import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarEps from "../../../Screen/Eps/ListarEps";
import DetalleEps from "../../../Screen/Eps/DetalleEps";
import EditarEps from "../../../Screen/Eps/EditarEps";

const Stack = createStackNavigator();

/**
 * Navegación tipo stack para las pantallas relacionadas con EPS.
 */
export default function EpsStack() {
    return (
        <Stack.Navigator
            initialRouteName="ListarEps"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6A5ACD', // Color uniforme en la cabecera
                },
                headerTintColor: '#FFFFFF', // Color del texto e íconos
                headerTitleStyle: {
                    fontWeight: 'bold', // Título en negrita
                },
            }}
        >
            <Stack.Screen
                name="ListarEps"
                component={ListarEps}
                options={{ title: "EPS" }}
            />
            <Stack.Screen
                name="DetalleEps"
                component={DetalleEps}
                options={{ title: "Detalle de EPS" }}
            />
            <Stack.Screen
                name="EditarEps"
                component={EditarEps}
                options={{ title: "Nueva / Editar EPS" }}
            />
        </Stack.Navigator>
    );
}
