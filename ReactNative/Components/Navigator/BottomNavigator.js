import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../Pages/Home/Home';
import Cadastro from '../../Pages/Cadastro/Cadastro';
import Conta from '../../Pages/Conta/Conta';
import Editar from '../../Pages/Editar/Editar';
import EditarEndereco from '../../Pages/EditarEndereco/EditarEndereco';
import Ionicons from '@expo/vector-icons/Ionicons'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../Auth/Auth';
import { View } from 'react-native';

const BottomNavigator = () => {

  const Tab = createBottomTabNavigator();
  const { userCompleto } = useAuth();

  return (

    <View style={{ height: "100%" }}>

      {
        userCompleto.roles[0] == "membro" ? (



          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <FontAwesome name="home" size={24} color="black" />
                );
              } else if (route.name === 'Cadastro') {
                return (
                  <MaterialCommunityIcons name="home-group-plus" size={24} color="black" />
                );
              } else if (route.name === 'Editar') {
                return (
                  <FontAwesome name="edit" size={24} color="black" />
                );
              } else if (route.name === 'Conta') {
                return (
                  <MaterialCommunityIcons name="account-circle" size={24} color="black" />
                );
              }
            },
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'tomato',
          })}>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
            <Tab.Screen name="Editar" component={Editar} options={{ headerShown: false }} />
            <Tab.Screen name="Conta" component={Conta} options={{ headerShown: false }} />
          </Tab.Navigator>
        ) : (

          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <FontAwesome name="home" size={24} color="black" />
                );
              } else if (route.name === 'Conta') {
                return (
                  <MaterialCommunityIcons name="account-circle" size={24} color="black" />
                );
              }
            },
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'tomato',
          })}>
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Conta" component={Conta} options={{ headerShown: false }} />
          </Tab.Navigator>

        )
      }
    </View>

  );
}

export default BottomNavigator;

