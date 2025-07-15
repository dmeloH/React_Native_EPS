import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons"; // Añadido MaterialCommunityIcons

import InicioStack from "./Stacks/InicioStack";
import PerfilesStack from "./Stacks/PerfilStack";
import ConfiguracionesStack from "./Stacks/ConfiguracionStack";
// import CitasStack from "./Stacks/CitaStack";
// import ConsultoriosStack from "./Stacks/ConsultorioStack";
// import EpsStack from "./Stacks/EpsStack";
// import EspecialidadesStack from "./Stacks/EspecialidadStack";
// import MedicosStack from "./Stacks/MedicoStack";
// import PacientesStack from "./Stacks/PacienteStack";
// import SedesStack from "./Stacks/SedeStack";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
            screenOptions={{
                // Estilo para la barra de pestañas en general
                tabBarStyle: {
                    backgroundColor: '#F8F8F8', // Un blanco más suave para el fondo de la barra
                    borderTopWidth: 0, // Elimina el borde superior predeterminado
                    height: 65, // Un poco más de altura para un look moderno
                    paddingBottom: 8, // Más padding en la parte inferior para iconos/texto
                    paddingTop: 8, // Más padding en la parte superior
                    // Añadiendo sombra para un efecto flotante
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5, // Sombra más visible para elevar la barra
                    },
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 10, // Elevación para Android
                },
                // Colores de los iconos y texto de la pestaña
                tabBarActiveTintColor: "#007B8C", // Un azul teal más profesional para la pestaña activa
                tabBarInactiveTintColor: "#7F8C8D", // Un gris más suave para la pestaña inactiva
                tabBarLabelStyle: {
                    fontSize: 11, // Tamaño de fuente ligeramente ajustado
                    fontWeight: '700', // Más peso para el texto, casi negrita
                    marginTop: 4, // Más margen entre icono y texto
                },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={InicioStack}
                options={{
                    headerShown: false, // Oculta el encabezado del TabNavigator para que el Stack interno lo maneje
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size + 2} color={color} /> // Icono de casa, tamaño un poco mayor, color dinámico
                    ),
                    tabBarLabel: 'Inicio', // Asegura que el texto de la pestaña sea 'Inicio'
                }}
            />

            <Tab.Screen
                name="PerfilScreen" // Nombre de la ruta (lo que usas para navegar si es necesario)
                component={PerfilesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        // Icono más apropiado para Perfil, color dinámico
                        <Feather name="user" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Perfil', // Asegura que el texto de la pestaña sea 'Perfil'
                }}
            />

            <Tab.Screen
                name="Configuración" // Nombre de la ruta
                component={ConfiguracionesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        // Icono más apropiado para Configuración, color dinámico
                        <Ionicons name="settings-outline" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Configuración', // Asegura que el texto de la pestaña sea 'Configuración'
                }}
            />
            {/* Las siguientes pestañas están comentadas según tu solicitud.
                Si deseas que aparezcan, descomenta sus bloques <Tab.Screen> */}
            {/*
            <Tab.Screen
                name="CitasStack"
                component={CitasStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="calendar-month-outline" size={size} color={color} />),
                    tabBarLabel: 'Citas',
                }}
            />
            <Tab.Screen
                name="ConsultoriosStack"
                component={ConsultoriosStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="office-building-outline" size={size} color={color} />),
                    tabBarLabel: 'Consultorios',
                }}
            />
            <Tab.Screen
                name="EpsStack"
                component={EpsStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="hospital-building" size={size} color={color} />),
                    tabBarLabel: 'EPS',
                }}
            />
            <Tab.Screen
                name="EspecialidadesStack"
                component={EspecialidadesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="doctor" size={size} color={color} />),
                    tabBarLabel: 'Especialidades',
                }}
            />
            <Tab.Screen
                name="MedicosStack"
                component={MedicosStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="medical-bag" size={size} color={color} />),
                    tabBarLabel: 'Médicos',
                }}
            />
            <Tab.Screen
                name="PacientesStack"
                component={PacientesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-group-outline" size={size} color={color} />),
                    tabBarLabel: 'Pacientes',
                }}
            />
            <Tab.Screen
                name="SedesStack"
                component={SedesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="map-marker-multiple-outline" size={size} color={color} />),
                    tabBarLabel: 'Sedes',
                }}
            />
            */}
        </Tab.Navigator>
    );
}