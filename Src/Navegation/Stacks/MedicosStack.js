// src/stacks/MedicosStack.js

import { createStackNavigator } from "@react-navigation/stack";
import ListarMedico from "../../../Screen/Medicos/ListarMedicos";
import DetalleMedico from "../../../Screen/Medicos/DetalleMedicos";
import EditarMedico from "../../../Screen/Medicos/EditarMedicos";

const Stack = createStackNavigator();

/**
 * Stack de navegación para la gestión de médicos.
 * Incluye:
 * - ListarMedicos: Lista todos los médicos registrados.
 * - DetalleMedico: Muestra información detallada del médico seleccionado.
 * - EditarMedico: Permite crear o editar datos del médico.
 */
export default function MedicosStack () {
    return (
        <Stack.Navigator>
            {/* Pantalla de listado de médicos */}
            <Stack.Screen 
                name="ListarMedicos"
                component={ListarMedico}
                options={{ title: "Médicos" }}
            />

            {/* Pantalla de detalle de un médico */}
            <Stack.Screen 
                name="DetalleMedico"
                component={DetalleMedico}
                options={{ title: "Detalle Médico" }}
            />

            {/* Pantalla para crear o editar médicos */}
            <Stack.Screen 
                name="EditarMedico"
                component={EditarMedico}
                options={{ title: "Nuevo/Editar Médico" }}
            />
        </Stack.Navigator>
    );
}
