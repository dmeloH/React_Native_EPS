// src/navigation/NavegacionPrincipal.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Stacks principales que agrupan diferentes pantallas del sistema
import InicioStack from "./Stacks/InicioStack";
import PerfilesStack from "./Stacks/PerfilStack";
import ConfiguracionesStack from "./Stacks/ConfiguracionStack";

// Creación del Tab Navigator inferior
const Tab = createBottomTabNavigator();

/**
 * Navegación principal del sistema.
 * Utiliza un BottomTabNavigator con tres secciones:
 * - Inicio (dashboard general del sistema)
 * - Perfil (gestión del perfil del usuario)
 * - Configuración (ajustes de la app o del usuario)
 */
export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
            screenOptions={{
                // Estilo visual de la barra de navegación inferior
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',      // Fondo blanco moderno y limpio
                    borderTopWidth: 0,               // Sin borde superior
                    height: 70,                      // Altura para mejor visibilidad
                    paddingBottom: 10,               // Espaciado inferior
                    paddingTop: 8,                   // Espaciado superior
                    shadowColor: "#7E60BF",          // Color de la sombra (tono lila)
                    shadowOffset: { width: 0, height: 4 }, 
                    shadowOpacity: 0.1,              // Opacidad ligera para sombra
                    shadowRadius: 6,                 
                    elevation: 6,                    // Sombra para dispositivos Android
                },
                tabBarActiveTintColor: "#433878",     // Color activo (púrpura oscuro)
                tabBarInactiveTintColor: "#BCA7E5",   // Color inactivo (púrpura claro)
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 2,
                },
            }}
        >
            {/* Pestaña de Inicio */}
            <Tab.Screen
                name="Inicio"
                component={InicioStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Inicio',
                }}
            />

            {/* Pestaña de Perfil del Usuario */}
            <Tab.Screen
                name="PerfilScreen"
                component={PerfilesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Perfil',
                }}
            />

            {/* Pestaña de Configuración */}
            <Tab.Screen
                name="Configuración"
                component={ConfiguracionesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Configuración',
                }}
            />
        </Tab.Navigator>
    );
}
