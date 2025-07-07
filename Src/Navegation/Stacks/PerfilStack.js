import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfil/Perfil";

const Stack = createStackNavigator();

export default function PerfilesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "Perfil" 
                component={Perfil}
                options={{ title: "Perfiles" }}
            />
        </Stack.Navigator>
    );
}