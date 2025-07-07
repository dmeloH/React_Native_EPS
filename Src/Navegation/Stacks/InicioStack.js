// src/stacks/InicioStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importa la pantalla de Inicio (el "dashboard" con las 4 casillas)
import Inicio from "../../../Screen/Inicio/Inicio";
import CitasStack from "./CitaStack";
import ConsultoriosStack from "./ConsultorioStack";
import EpsStack from "./EpsStack";
import EspecialidadesStack from "./EspecialidadStack";
import MedicosStack from "./MedicoStack";
import PacientesStack from "./PacienteStack";
import SedesStack from "./SedeStack";

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
                name="ConsultoriosFlow" 
                component={ConsultoriosStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="EpsFlow" 
                component={EpsStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="EspecialidadesFlow" 
                component={EspecialidadesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MedicosFlow" 
                component={MedicosStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PacientesFlow" 
                component={PacientesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SedesFlow" 
                component={SedesStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}