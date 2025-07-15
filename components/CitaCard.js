import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CitaCard({ citas, onEdit, onDelete, onDetail }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>Tipo: {citas?.tipo_cita}</Text>
                <Text style={styles.detalle}>Fecha: {citas?.fecha}</Text>
                <Text style={styles.detalle}>Hora: {citas?.hora}</Text>
                <Text style={styles.detalle}>Estado: {citas?.estado}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
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
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    info: {
        flex: 1,
        paddingRight: 8,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    detalle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBtn: {
        marginLeft: 10,
    },
});
