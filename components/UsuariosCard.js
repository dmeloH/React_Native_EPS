import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UsuariosCard({ usuario, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre_completo}>{usuario.NombreCompleto}</Text>
                <Text style={styles.detalle}>Descripción: {usuario.TipoDocumento}</Text>
                <Text style={styles.detalle}>Descripción: {usuario.NumeroDocumento}</Text>
                <Text style={styles.detalle}>Descripción: {usuario.FechaNacimiento}</Text>
                <Text style={styles.detalle}>Descripción: {usuario.TipoAfiliacion}</Text>
                <Text style={styles.detalle}>Descripción: {usuario.EpsId}</Text>
            </View>
            <View style={styles.actions}>
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

