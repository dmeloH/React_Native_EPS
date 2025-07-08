// src/stacks/InicioStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importa la pantalla de Inicio (el "dashboard" con las 4 casillas)
import Inicio from "../../../Screen/Inicio/Inicio";
import CitasStack from "./CitasStack";
import EpsStack from "./EpsStack";
import MedicosStack from "./MedicosStack";
import CoberturasStack from "./CoberturasStack";
import TipoCitasStack from "./TipoCitasStack";
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
                name="CitasFlow" 
                component={CitasStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="UsuariosFlow" 
                component={UsuariosStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="EpsFlow" 
                component={EpsStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="TipoCitasFlow" 
                component={TipoCitasStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MedicosFlow" 
                component={MedicosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CoberturasFlow" 
                component={CoberturasStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}