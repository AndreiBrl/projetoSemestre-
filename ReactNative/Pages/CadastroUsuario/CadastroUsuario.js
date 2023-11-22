import * as React from 'react';
import { View, StyleSheet, ImageBackground, useState } from "react-native"
import { TextInput,Button,Text } from 'react-native-paper';
import AvatarUser from "../../Components/AvatarUser/AvatarUser"


const CadastroUsuario = ({ navigation }) => {
    const [nome, setNome] = React.useState("");
    const [senha, setSenha] = React.useState("");

    const style = StyleSheet.create({

        backgroundImage:{
            flex: 1,
            resizeMode: 'cover', // Ou 'stretch' para cobrir toda a área
            justifyContent: 'center' 
        },
        content:{
            //flex:3,
            flexDirection:"column",
            elevation: 4,
            backgroundColor:"lightgrey",
            opacity:0.9,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            marginBottom: 10,
            margin:30,
            padding:15,
            height: 300,
            borderRadius:10,
            justifyContent:"space-between"

        },
        inputsContainer:{
            margin:30,
            flexDirection:"column",
            justifyContent:"space-between",
            
        }
    })

    return (
        <ImageBackground
        source={require('../../assets/background.jpeg')}
        style={style.backgroundImage}>
            <View style={style.content}>
                <Text>Cadastro</Text>
                <View style={style.inputsContainer}>
                    <TextInput
                        label="Nome"
                        mode = "outlined"
                        value={nome}
                        onChangeText={nome => setNome(nome)}
                        />

                    <TextInput
                        label="Senha"
                        mode = "outlined"
                        value={senha}
                        onChangeText={senha => setSenha(senha)}
                        secureTextEntry
                        />
                
                
                </View>
            
            <Button icon="login" mode="contained" onPress={() => console.log('Pressed')}>
                Entrar
            </Button>

            </View>

        </ImageBackground>
    )
}

export default CadastroUsuario