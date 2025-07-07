
import { createStackNavigator } from "@react-navigation/stack";
import ListarEps from "../../../Screen/Eps/ListarEps";
import DetalleEps from "../../../Screen/Eps/DetalleEps";
import EditarEps from "../../../Screen/Eps/EditarEps";
import { Button } from "react-native";

const Stack = createStackNavigator();

export default function EpsStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarEps"
                component={ListarEps}
                options={{ 
                    title: "Eps" ,
                    // Verificacion PRUEBA
                    headerRight: () => (
                        <Button
                          onPress={() => alert("Boton en el header")}
                          title="Info"
                          color="red"
                        />
                    ),
                }}
            />
             <Stack.Screen 
                name= "DetalleEps"
                component={DetalleEps}
                options={{ title: "Detalle Eps" }}
            />
             <Stack.Screen 
                name= "EditarEps"
                component={EditarEps}
                options={{ title: "Nuevo/Editar Eps" }}
            />
        </Stack.Navigator>
    );
}