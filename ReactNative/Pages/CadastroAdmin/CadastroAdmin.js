import * as React from 'react';
import { View, StyleSheet, ImageBackground, useState } from "react-native"
import { TextInput, Button, Text } from 'react-native-paper';
import AvatarUser from "../../Components/AvatarUser/AvatarUser"
import { useAuth } from '../../Components/Auth/Auth';


const CadastroAdmin = ({ navigation }) => {
    const [nome, setNome] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [email, setEmail] = React.useState("");
    const { cadastrar, userCompleto, cadastrarAdmin } = useAuth();

    const cadastraAdmin = () => {
        if (userCompleto.roles[0]== "admin") {

            cadastrarAdmin(nome, email, senha)
            navigation.navigate("TelaMenuBottom")
        }
    }
    const style = StyleSheet.create({

        backgroundImage: {
            flex: 1,
            resizeMode: 'cover', // Ou 'stretch' para cobrir toda a área
            justifyContent: 'center'
        },
        content: {
            //flex:3,
            flexDirection: "column",
            elevation: 4,
            backgroundColor: "lightgrey",
            opacity: 0.9,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            marginBottom: 10,
            margin: 30,
            padding: 15,
            height: 400,
            borderRadius: 10,
            justifyContent: "space-between"

        },
        inputsContainer: {
            margin: 30,
            flexDirection: "column",
            justifyContent: "space-between",

        }
    })

    return (
        <ImageBackground
            source={require('../../assets/background.jpeg')}
            style={style.backgroundImage}>
            <View style={style.content}>
                <Text style={{textAlign:"center"}}>Cadastro Admin</Text>
                <View style={style.inputsContainer}>
                    <TextInput
                        label="Nome"
                        mode="outlined"
                        value={nome}
                        onChangeText={nome => setNome(nome)}
                    />
                    <TextInput
                        label="Email"
                        mode="outlined"
                        value={email}
                        onChangeText={email => setEmail(email)}

                    />
                    <TextInput
                        label="Senha"
                        mode="outlined"
                        value={senha}
                        onChangeText={senha => setSenha(senha)}
                        secureTextEntry
                    />


                </View>

                <Button icon="login" mode="contained" onPress={cadastraAdmin}>
                    Cadastrar
                </Button>
                {
                    userCompleto &&
                        userCompleto.roles[0] == "admin" ?
                        (<Button Button style={{ marginTop: 10 }} icon="login" mode="contained" onPress={() => navigation.navigate("TelaMenuBottom")}>
                            Voltar
                        </Button>) 
                        
                        : 
                        
                        (
                            <Button Button style={{ marginTop: 10 }} icon="login" mode="contained" onPress={() => navigation.navigate("Login")}>
                                Voltar
                            </Button>
                        )
                }

            </View>

        </ImageBackground >
    )
}

export default CadastroAdmin