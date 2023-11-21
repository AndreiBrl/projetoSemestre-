// Importando os módulos necessários do React Native
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Criando o componente do menu



const MenuBottom = ({ navigation }) => {

    const navega = (rota) => {
        navigation.navigate(rota)
    }
    return (



        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navega("Home")}>
                
                <Text >Home </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navega("Cadastro")}>
                <Text>Cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navega("Home")}>
                <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navega("Home")}>
                <Text>Conta</Text>
            </TouchableOpacity>
        </View>
    );
};

// Estilos do componente
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        height: 60,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});



export default MenuBottom