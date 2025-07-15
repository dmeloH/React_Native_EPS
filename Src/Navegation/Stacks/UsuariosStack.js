import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarUsuarios from "../../../Screen/Usuarios/ListarUsuarios";
import DetalleUsuarios from "../../../Screen/Usuarios/DetalleUsuarios";
import EditarUsuarios from "../../../Screen/Usuarios/EditarUsuarios";
import DetalleUsuario from "../../../Screen/Usuarios/DetalleUsuarios";

const Stack = createStackNavigator();

export default function UsuariosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarUsuarios"
                component={ListarUsuarios}
                options={{ title: "Usuarios" }}
            />
             <Stack.Screen 
                name= "DetalleUsuarios"
                component={DetalleUsuario}
                options={{ title: "Detalle Usuarios" }}
            />
             <Stack.Screen 
                name= "EditarUsuarios"
                component={EditarUsuarios}
                options={{ title: "Nuevo/Editar Usuarios" }}
            />
        </Stack.Navigator>
    );
}