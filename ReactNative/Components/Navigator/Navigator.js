import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../Pages/Login/Login"
import Home from "../../Pages/Home/Home"
import Cadastro from "../../Pages/Cadastro/Cadastro";
import MenuBottom from "../MenuBottom/MenuBottom";
import { View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Navigator = () => {

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    return (

        <NavigationContainer>
            <View style={{ width: "100%" }}>

                <Stack.Navigator inicialRouteName="home">

                    <Stack.Screen name="Home"
                        component={Home}
                    // options={{ 
                    //     headerStyle:{
                    //     position:"absolute",backgroundColor:"blue"
                    // } }}

                    />
                    <Stack.Screen name="Cadastro"
                        component={Cadastro}
                    // options={{ headerShown: false }}

                    />
                    <Stack.Screen name="Login"
                        component={Login}
                    // options={{ headerShown: false }}

                    />





                </Stack.Navigator>

                {/* <MenuBottom/> */}

                {/* <Tab.Navigator>
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Cadastro" component={Cadastro} />
                </Tab.Navigator> */}

            </View >
        </NavigationContainer>


    )
}
export default Navigator;