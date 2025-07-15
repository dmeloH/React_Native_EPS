import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const itemWidth = (width / 2) - 30;

export default function Inicio() {
  const navigation = useNavigation();

  const menuItems = [
    { label: 'Citas', icon: <Fontisto name="date" size={45} color="#433878" />, route: 'CitasScreen' },
    { label: 'Usuarios', icon: <MaterialCommunityIcons name="account-multiple-plus" size={45} color="#7E60BF" />, route: 'UsuariosScreen' },
    { label: 'Eps', icon: <MaterialCommunityIcons name="city-variant" size={45} color="#433878" />, route: 'EpsScreen' },
    { label: 'Coberturas', icon: <MaterialCommunityIcons name="mother-heart" size={45} color="#7E60BF" />, route: 'CoberturasScreen' },
    { label: 'Médicos', icon: <Fontisto name="doctor" size={45} color="#433878" />, route: 'MedicosScreen' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5FC" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Encabezado de bienvenida */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bienvenido a EPS</Text>
          <Text style={styles.headerSubtitle}>
            Estado: <Text style={styles.statusText}>Habilitado</Text>
          </Text>
        </View>

        {/* Menú principal */}
        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.iconShadow}>{item.icon}</View>
              <Text style={styles.iconLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF5FC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 60,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#433878',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#7E60BF',
    marginTop: 5,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  iconContainer: {
    width: itemWidth,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  iconShadow: {
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#433878',
    textAlign: 'center',
  },
});
