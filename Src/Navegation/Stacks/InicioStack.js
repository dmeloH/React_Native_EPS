// src/stacks/InicioStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importa la pantalla de Inicio (el "dashboard" con las 4 casillas)
import Inicio from "../../../Screen/Inicio/Inicio";
import CitasStack from "./CitasStack";
import EpsStack from "./EpsStack";
import MedicosStack from "./MedicosStack";
import CoberturasStack from "./CoberturasStack";
import UsuariosStack from "./UsuariosStack";

const Stack = createStackNavigator();

export default function InicioStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InicioPantalla" 
                component={Inicio}
                options={{ headerShown: false }} 
            />
            <Stack.Screen
                name="CitasScreen" 
                component={CitasStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="UsuariosScreen" 
                component={UsuariosStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="EpsScreen" 
                component={EpsStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MedicosScreen" 
                component={MedicosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CoberturasScreen" 
                component={CoberturasStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}