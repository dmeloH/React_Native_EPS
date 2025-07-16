/**
 * @file FormularioCard.jsx
 * @description Componente reutilizable que encapsula contenido de formularios dentro de una tarjeta estilizada.
 * Proporciona scroll, centrado, fondo suave y sombra para mantener consistencia visual en todas las pantallas de formularios.
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

/**
 * Componente FormularioCard
 *
 * Este componente actúa como un contenedor visual para formularios u otros contenidos,
 * proporcionando estilos uniformes como fondo blanco, padding interno, borde redondeado,
 * sombra y margen automático. Está diseñado para ser reutilizable en múltiples pantallas.
 *
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos que se renderizan dentro de la tarjeta.
 * @returns {JSX.Element} Contenedor estilizado con scroll para formularios.
 */
export default function FormularioCard({ children }) {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {children}
            </View>
        </ScrollView>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF5FA", // Fondo rosado pastel para toda la vista
        paddingVertical: 30,
    },
    container: {
        width: "90%",
        backgroundColor: "#FFFFFF", // Tarjeta blanca
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4, // Sombra en Android
    },
});
