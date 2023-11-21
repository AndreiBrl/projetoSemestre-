
import { Auth } from './Components/Auth/Auth';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Pages/Home/Home';
import Cadastro from './Pages/Cadastro/Cadastro';
import Conta from './Pages/Conta/Conta';
import Editar from './Pages/Editar/Editar';
import { createStackNavigator } from "@react-navigation/stack";
import Login from './Pages/Login/Login';

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <Auth>


      {/* <Navigator /> */}
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Cadastro" component={Cadastro} />
          <Tab.Screen name="Editar" component={Editar} />
          <Tab.Screen name="Conta" component={Conta} />

        </Tab.Navigator>
      </NavigationContainer>


    </Auth>
  );
}


