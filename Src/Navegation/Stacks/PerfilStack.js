// src/stacks/PerfilesStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Profile/Perfil";

const Stack = createStackNavigator();

/**
 * Stack de navegación para la sección de Perfiles de usuario.
 * Actualmente contiene:
 * - Perfil: Pantalla principal de visualización y edición del perfil de usuario.
 */
export default function PerfilesStack() {
    return (
        <Stack.Navigator>
            {/* Pantalla principal del perfil del usuario */}
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{ title: "Perfiles" }}
            />
        </Stack.Navigator>
    );
}
