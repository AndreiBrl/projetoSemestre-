import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../Pages/Login/Login"
import Home from "../../Pages/Home/Home"
import Cadastro from "../../Pages/Cadastro/Cadastro";
import TelaMenuBottom from "./TelaMenuBottom";
import CadastroUsuario from "../../Pages/CadastroUsuario/CadastroUsuario";
import CadastroEndereco from "../../Pages/CadastroEndereco/CadastroEndereco"
import EditarEndereco from "../../Pages/EditarEndereco/EditarEndereco";
import Editar from "../../Pages/Editar/Editar";
import CadastroAdmin from "../../Pages/CadastroAdmin/CadastroAdmin";


const Navigator = () => {

    const Stack = createStackNavigator();
    return (

        <NavigationContainer>
            <Stack.Navigator inicialRouteName="Login">

                <Stack.Screen name="Login"
                    component={Login}
                    options={{ headerShown: false }}

                />
                <Stack.Screen name="TelaMenuBottom"
                    component={TelaMenuBottom}
                    options={{ headerShown: false }}

                />
                <Stack.Screen name="Home"
                    component={Home}
                    options={{ headerShown: false }}

                />
                <Stack.Screen name="Cadastro"
                    component={Cadastro}
                // options={{ headerShown: false }}

                />
                <Stack.Screen name="CadastroUsuario"
                    component={CadastroUsuario}
                    options={{ headerShown: false }}

                />
                <Stack.Screen name="CadastroAdmin"
                    component={CadastroAdmin}
                //options={{ headerShown: false }}

                />

                <Stack.Screen name="CadastroEndereco"
                    component={CadastroEndereco}
                //options={{ headerShown: false }}

                />
                <Stack.Screen name="Editar"
                    component={Editar}
                //options={{ headerShown: false }}

                />
                <Stack.Screen name="EditarEndereco"
                    component={EditarEndereco}
                //options={{ headerShown: false }}

                />

            </Stack.Navigator>

        </NavigationContainer>

    )
}
export default Navigator;