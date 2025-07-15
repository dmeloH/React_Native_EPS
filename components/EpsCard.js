import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Tarjeta para mostrar información de una EPS con opciones de acción.
 * 
 * @param {Object} props
 * @param {Object} props.eps - Objeto que contiene la información de la EPS.
 * @param {Function} props.onEdit - Función que se ejecuta al presionar el botón de editar.
 * @param {Function} props.onDelete - Función que se ejecuta al presionar el botón de eliminar.
 * @param {Function} props.onDetails - Función que se ejecuta al presionar el botón de detalles.
 */
export default function EpsCard({ eps, onEdit, onDelete, onDetails }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{eps?.nombre ?? 'Sin nombre'}</Text>
                <Text style={styles.detalle}>Estado: {eps?.estado ?? '-'}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onDetails} style={styles.iconBtn}>
                    <Ionicons name="information-circle-outline" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    detalle: {
        fontSize: 14,
        color: '#555',
    },
    actions: {
        flexDirection: 'row',
    },
    iconBtn: {
        marginLeft: 10,
    },
});
