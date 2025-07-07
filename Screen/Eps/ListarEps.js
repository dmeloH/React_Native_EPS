import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta

export default function ListarEps ({navigation}){

    const epsEjemplo = [
        { id: '1', Nombre: 'Eps Sanidad', direccion: 'Duitama - Boyacá', Telefono: '3107890890', Nit: '80000001'},
        { id: '2', Nombre: 'Salud +', direccion: 'Caracas - Venezuela', Telefono: '3110907890', Nit: '80000002'},
        { id: '3', Nombre: 'Nueva EPS', direccion: 'Santa Fe de Bogotá', Telefono: '3107890010', Nit: '80000003'},
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Eps</Text>

            <ScrollView style={styles.epsContainer}>
                {epsEjemplo.map((eps) => (
                    <View key={eps.id} style={styles.epsCard}>
                        <Text style={styles.epsTitle}>{eps.Nombre}</Text>
                        <Text style={styles.epsDetail}><Text style={styles.detailLabel}>Direccion: </Text>{eps.direccion}</Text>
                        <Text style={styles.epsDetail}><Text style={styles.detailLabel}>Telefono: </Text>{eps.Telefono}</Text>
                        <Text style={styles.epsDetail}><Text style={styles.detailLabel}>Nit: </Text>{eps.Nit}</Text>
                        
                        <View style={styles.buttonContainer}>
                            <BotonComponent
                                title="Ver Detalles"
                                onPress={() => navigation.navigate("DetalleEps", { epsId: eps.id })}
                                buttonStyle={styles.viewButton}
                                textStyle={styles.buttonText}
                            />
                            <BotonComponent
                                title="Editar"
                                onPress={() => navigation.navigate("EditarEps", { epsId: eps.id })}
                                buttonStyle={styles.editButton}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
            
            <BotonComponent
                title="Agendar Nueva Eps"
                onPress={() => { /* navigation.navigate("CrearEPS") */ }}
                buttonStyle={styles.newEpsButton}
                textStyle={styles.buttonText}
            />
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F0F4F8", // Fondo suave
        alignItems: "center", 
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        color: "#2C3E50", // Color de título oscuro
    },

    epsContainer: {
        width: "100%", 
        flex: 1, 
    },

    epsCard: {
        backgroundColor: "skyblue", // Fondo blanco para cada tarjeta de cita
        borderRadius: 10,
        padding: 15,
        marginBottom: 15, // Espacio entre tarjetas
        shadowColor: "#000", // Sombra suave
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Elevación para Android
        
    },

    epsTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#34495E", // Color para el título de la cita
    },

    epsDetail: {
        fontSize: 16,
        color: "#5C6F7F", // Color para los detalles de la cita
        marginBottom: 4,
    },
    // Nuevo estilo para aplicar negrita solo al nombre del campo
    detailLabel: {
        fontWeight: 'bold',
    },

    buttonContainer: {
        flexDirection: "row", // Botones en la misma fila
        justifyContent: "space-around", 
        marginTop: 15,
    },
        
    viewButton: {
        backgroundColor: "#3498DB", // Azul para "Ver Detalles"
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        minWidth: 120, // Ancho mínimo para los botones
        alignItems: 'center',
    },

    editButton: {
        backgroundColor: "#2ECC71", // Verde para "Editar"
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        minWidth: 120,
        alignItems: 'center',
    },

    newEpsButton: {
        backgroundColor: "#E67E22", // Naranja para "Agendar Nueva Cita"
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 20, // Espacio superior
        marginBottom: 10, // Espacio inferior si hay más contenido abajo
    },

    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
