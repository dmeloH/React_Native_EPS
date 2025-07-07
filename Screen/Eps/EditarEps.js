import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function EditarEps({ route, navigation }) {
    const { epsId } = route.params || {};

    const [eps, setEps] = useState(null);
    const [loading, setLoading] = useState(true);

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nit, setNit] = useState('');

    // Datos de ejemplo para simular la carga de una EPS a editar
    const epsEjemplo = [
        { id: '1', Nombre: 'Eps Sanidad', direccion: 'Duitama - Boyacá', Telefono: '3107890890', Nit: '80000001'},
        { id: '2', Nombre: 'Salud +', direccion: 'Caracas - Venezuela', Telefono: '3110907890', Nit: '80000002'},
        { id: '3', Nombre: 'Nueva EPS', direccion: 'Santa Fe de Bogotá', Telefono: '3107890010', Nit: '80000003'},
    ];

    useEffect(() => {
        if (epsId) {
            
            const foundEps = epsEjemplo.find(e => e.id === epsId);
            if (foundEps) {
                setEps(foundEps);
                setNombre(foundEps.Nombre);
                setDireccion(foundEps.direccion); 
                setTelefono(foundEps.Telefono);
                setNit(foundEps.Nit);
            } else {
                Alert.alert("Error", "EPS no encontrada.");
                navigation.goBack(); 
            }
        } else {
            
        }
        setLoading(false);
    }, [epsId]);

    const handleSave = () => {
        
        const epsData = {
            id: epsId || new Date().getTime().toString(), // Generar ID si es nueva
            Nombre: nombre,
            direccion: direccion,
            Telefono: telefono,
            Nit: nit,
        };
        console.log("Datos a guardar:", epsData);
        Alert.alert("Guardar", "Funcionalidad de guardar pendiente. Datos en consola.");
        
        navigation.goBack(); // Volver a la pantalla anterior después de guardar
    };

    const handleCancel = () => {
        navigation.goBack(); // Volver sin guardar cambios
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={styles.loadingText}>Cargando datos de la EPS...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{epsId ? "Editar EPS" : "Crear Nueva EPS"}</Text>

            <ScrollView style={styles.formScrollView}>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre de la EPS:</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Eps Sanidad"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Dirección:</Text>
                    <TextInput
                        style={styles.input}
                        value={direccion}
                        onChangeText={setDireccion}
                        placeholder="Ej. Duitama - Boyacá"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput
                        style={styles.input}
                        value={telefono}
                        onChangeText={setTelefono}
                        placeholder="Ej. 3107890890"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>NIT:</Text>
                    <TextInput
                        style={styles.input}
                        value={nit}
                        onChangeText={setNit}
                        placeholder="Ej. 80000001"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                    />

                    <View style={styles.buttonContainer}>
                        <BotonComponent
                            title="Guardar Cambios"
                            onPress={handleSave}
                            buttonStyle={styles.saveButton}
                            textStyle={styles.buttonText}
                        />
                        <BotonComponent
                            title="Cancelar"
                            onPress={handleCancel}
                            buttonStyle={styles.cancelButton}
                            textStyle={styles.buttonText}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E0F2F7", // Fondo suave, consistente
        alignItems: "center",
        paddingTop: 20, 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 18,
        color: '#555',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        color: "#2C3E50",
        textAlign: 'center',
    },
    formScrollView: {
        width: "100%",
        paddingHorizontal: 20,
    },
    formCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#34495E",
        marginBottom: 8,
        marginTop: 10,
    },
    input: {
        height: 48,
        borderColor: "#BDC3C7", // Borde suave
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#34495E",
        backgroundColor: "#F9F9F9", // Fondo claro para inputs
        marginBottom: 15,
    },
    inputTextArea: {
        borderColor: "#BDC3C7",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10, // Ajuste para multiline
        fontSize: 16,
        color: "#34495E",
        backgroundColor: "#F9F9F9",
        marginBottom: 15,
        minHeight: 100, // Altura mínima para el área de texto
        textAlignVertical: 'top', // Para que el texto empiece arriba
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: "#28A745", // Verde para guardar
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 140,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: "#6C757D", // Gris para cancelar
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 140,
        alignItems: 'center',
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});