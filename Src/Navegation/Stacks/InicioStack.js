// src/stacks/InicioStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importa la pantalla de Inicio (dashboard con las 4 casillas)
import Inicio from "../../../Screen/Inicio/Inicio";

// Importa los stacks funcionales
import CitasStack from "./CitasStack";
import EpsStack from "./EpsStack";
import MedicosStack from "./MedicosStack";
import CoberturasStack from "./CoberturasStack";
import UsuariosStack from "./UsuariosStack";

const Stack = createStackNavigator();

/**
 * Stack principal que incluye la pantalla de Inicio
 * y enlaza a los stacks individuales de funcionalidades.
 */
export default function InicioStack () {
    return (
        <Stack.Navigator>
            {/* Pantalla principal del dashboard */}
            <Stack.Screen
                name="InicioPantalla" 
                component={Inicio}
                options={{ headerShown: false }} 
            />

            {/* Navegación hacia Citas */}
            <Stack.Screen
                name="CitasScreen" 
                component={CitasStack}
                options={{ headerShown: false }}
            />

            {/* Navegación hacia Usuarios */}
            <Stack.Screen
                name="UsuariosScreen" 
                component={UsuariosStack}
                options={{ headerShown: false }}
            />

            {/* Navegación hacia EPS */}
            <Stack.Screen
                name="EpsScreen" 
                component={EpsStack}
                options={{ headerShown: false }}
            />

            {/* Navegación hacia Médicos */}
            <Stack.Screen
                name="MedicosScreen" 
                component={MedicosStack}
                options={{ headerShown: false }}
            />

            {/* Navegación hacia Coberturas */}
            <Stack.Screen
                name="CoberturasScreen" 
                component={CoberturasStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
