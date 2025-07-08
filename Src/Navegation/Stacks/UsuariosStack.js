import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarUsuarios from "../../../Screen/Usuarios/ListarUsuarios";
import DetalleUsuarios from "../../../Screen/Usuarios/DetalleUsuarios";
import EditarUsuarios from "../../../Screen/Usuarios/EditarUsuarios";
import AgregarUsuarios from "../../../Screen/Usuarios/AgregarUsuarios";

const Stack = createStackNavigator();

export default function UsuariosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarUsuarios"
                component={ListarUsuarios}
                options={{ title: "consultorios" }}
            />
             <Stack.Screen 
                name= "DetalleUsuarios"
                component={DetalleUsuarios}
                options={{ title: "Detalle Usuarios" }}
            />
             <Stack.Screen 
                name= "EditarUsuarios"
                component={EditarUsuarios}
                options={{ title: "Nuevo/Editar Usuarios" }}
            />
            <Stack.Screen
                name= "CrearUsuarios" // Nuevo nombre de ruta para la pantalla de creación
                component={AgregarUsuarios} // Asigna el nuevo componente
                options={{ title: "Nuevo Usuarios" }}
            />
        </Stack.Navigator>
    );
}