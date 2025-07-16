import AppNavegacion from "./Src/Navegation/AppNavegacion";

export default function App() {
  return <AppNavegacion/>;
}



// import { useEffect } from "react";
// import AppNavegacion from "./Src/Navegation/AppNavegacion";
// import { Button, View } from "react-native";
// import * as Notifications from "expo-notifications";

// export default function App() {
//   useEffect(() => {
//     //como se deben manejar las notificaciones cuando la app esta abierta 
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       }),
//     });

//     const getPermissions = async () => {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Se requieren permisos para recibir notificaciones')
//       }
//     }
//   }, []);

//   const enviarNotificacionLocal = async () => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "!Hola¡",
//         body: "Esta es una notificación local de prueba",
//       },
//       trigger: { seconds: 2 },
//     });
//   }

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <AppNavegacion />
//       <Button title="Enviar Notificación Local" onPress={enviarNotificacionLocal} />
//     </View>
//   );

// }

