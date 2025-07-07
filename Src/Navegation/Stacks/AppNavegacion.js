import { NavigationContainer } from "@react-navigation/native";
import AuthNavegacion from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal"

export default function AppNavegacion() {
    const Autenticado = true; 

    return (
        <NavigationContainer>
            {Autenticado ? <NavegacionPrincipal/> : <AuthNavegacion/>}
        </NavigationContainer>
    );
}