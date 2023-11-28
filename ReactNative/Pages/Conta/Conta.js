import * as React from 'react';
import { View, StyleSheet, ImageBackground } from "react-native"
import AvatarUser from "../../Components/AvatarUser/AvatarUser"
import { Text, Button } from "react-native-paper"
import { useAuth } from "../../Components/Auth/Auth"
import { useEffect } from "react"
import axios from 'axios';


const Conta = ({ navigation }) => {
    const {userCompleto, deslogaAuth, autenticado} = useAuth();
    const [qtidadeEstabelecimentos, setQtidadeEstabelecimentos] = React.useState('');


    useEffect(()=>{
        axios.get(`http://3.232.53.72:5000/estabelecimentos/${userCompleto.id}`)
        .then(response=>{
            const data = response.data;
            setQtidadeEstabelecimentos(data.length);

        })
    },[])

    const style = StyleSheet.create({
        avatar :{
            //flex:2,
            justifyContent:"center",
            alignItems:"center",
            //margin: 30
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
            borderRadius:10

        },
        contentUser:{
            elevation: 4,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            marginBottom: 10,
            padding:10,
            alignItems:"center",
            alignContent:"center",
            justifyContent:"center",
            backgroundColor:"white"
        },
        backgroundImage:{
            flex: 1,
            resizeMode: 'cover', // Ou 'stretch' para cobrir toda a área
            justifyContent: 'center' 
        }
       
         
         })

    return (

        autenticado?(
                        <ImageBackground
                        source={require('../../assets/background.jpeg')}
                        style={style.backgroundImage}>
                            <View style={style.avatar}>
                                <AvatarUser label={"AB"} size={128}/>
                            </View>
                            <View style={style.content}>
                                <View style={style.contentUser}>
                                    <Text variant="titleLarge" >Nome: {userCompleto.login}</Text>
                                </View>
                                <View style={style.contentUser}>
                                    <Text variant="titleLarge" >Email: {userCompleto.email}</Text>
                                </View>
                                <View style={style.contentUser}>
                                    <Text variant="titleLarge" >Perfil: {userCompleto.roles[0]}</Text>
                                </View>
                                <View style={style.contentUser}>
                                    <Text variant="titleLarge" >Estabecimentos Cadastrados: {qtidadeEstabelecimentos} </Text>
                                </View>

                                <View style={{alignItems:"flex-end"}}>
                                    <Button style={{width:120}} icon="logout" mode="contained" onPress={deslogaAuth}>
                                        Logout
                                    </Button>
                                </View>
                            </View>

                        </ImageBackground>
        ) : (navigation.navigate('Login'))

    )
}

export default Conta