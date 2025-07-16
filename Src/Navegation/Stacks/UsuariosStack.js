// src/stacks/UsuariosStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importación de pantallas del módulo de usuarios
import ListarUsuarios from "../../../Screen/Usuarios/ListarUsuarios";
import DetalleUsuarios from "../../../Screen/Usuarios/DetalleUsuarios";
import EditarUsuarios from "../../../Screen/Usuarios/EditarUsuarios";

// Stack de navegación
const Stack = createStackNavigator();

/**
 * UsuariosStack
 * Manejador de navegación para el módulo de usuarios.
 * Contiene:
 * - ListarUsuarios: Vista con lista de usuarios.
 * - DetalleUsuarios: Detalle de un usuario seleccionado.
 * - EditarUsuarios: Crear o editar un usuario.
 */
export default function UsuariosStack() {
    return (
        <Stack.Navigator>
            {/* Pantalla principal: Lista de usuarios */}
            <Stack.Screen
                name="ListarUsuarios"
                component={ListarUsuarios}
                options={{
                    title: "Usuarios", headerStyle: {
                        backgroundColor: '#6A5ACD', // Color uniforme en la cabecera
                    },
                    headerTintColor: '#FFFFFF', // Color del texto e íconos
                    headerTitleStyle: {
                        fontWeight: 'bold', // Título en negrita
                    },
                }}
            />

            {/* Pantalla de detalle de usuario */}
            <Stack.Screen
                name="DetalleUsuarios"
                component={DetalleUsuarios} // Aquí corregimos: ya usas DetalleUsuarios
                options={{
                    title: "Detalle Usuarios", headerStyle: {
                        backgroundColor: '#6A5ACD', // Color uniforme en la cabecera
                    },
                    headerTintColor: '#FFFFFF', // Color del texto e íconos
                    headerTitleStyle: {
                        fontWeight: 'bold', // Título en negrita
                    },
                }}
            />

            {/* Pantalla para crear o editar usuarios */}
            <Stack.Screen
                name="EditarUsuarios"
                component={EditarUsuarios}
                options={{
                    title: "Nuevo/Editar Usuarios", headerStyle: {
                        backgroundColor: '#6A5ACD', // Color uniforme en la cabecera
                    },
                    headerTintColor: '#FFFFFF', // Color del texto e íconos
                    headerTitleStyle: {
                        fontWeight: 'bold', // Título en negrita
                    },
                }}
            />
        </Stack.Navigator>
    );
}
