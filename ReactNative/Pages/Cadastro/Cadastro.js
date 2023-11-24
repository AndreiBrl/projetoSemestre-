import { ScrollView, View, StyleSheet, ImageBackground } from "react-native"
import {Text, TextInput, Button } from "react-native-paper"
import BotaoCadastroEndereco from "../../Components/BotaoCadastroEndereco/BotaoCadastroEndereco"
import { useAuth } from "../../Components/Auth/Auth";
import { useState } from "react";
import axios from 'axios';



const Cadastro = ({ navigation }) => {
    const { userCompleto, autenticado, token } = useAuth();
    const [nome, setNome] = useState('');
    const [funcionamento , setFuncionamento] = useState('');
    const [contato, setContato] = useState('');
    const [instagram, setInstagram] = useState('');


    const dadosEstabelecimento = {
        nome:nome,
        funcionamento: funcionamento,
        contato: contato,
        instagram: instagram,
        usuarioId: userCompleto? userCompleto.id : null

    };

    const criaEstabelecimento =()=>{

         axios.post(`https://localhost:7179/estabelecimentos`,dadosEstabelecimento,{
            headers:{
                "Authorization" : "Bearer " + token
            }
         })
        .then((response)=>{
            console.log(response.data);
            navigation.navigate('Home')
        })
        .catch((error)=>{
            if (error.response && error.response.status === 401) {
                throw new Error("Não autorizado");
            }
        })
        
    };

    const style = StyleSheet.create({

        backgroundImage:{
            flex: 1,
            resizeMode: 'cover', // Ou 'stretch' para cobrir toda a área
            justifyContent: 'center' 
        }
    })

    return (

        <ImageBackground
        source={require('../../assets/background.jpeg')}
        style={style.backgroundImage}>
            <View style={{flex:1, margin:20}}>
                <BotaoCadastroEndereco onPress={()=> navigation.navigate("CadastroEndereco")}/>
                <ScrollView contentContainerStyle={{alignItems:"center", margin:30}}>
                <Text variant="titleLarge" style={{color:"white", marginTop:100}} >Cadastro de Estabelecimento</Text>
                <View style={{margin:30}}>
                    <TextInput
                            style={{marginBottom:20, width:300}}
                            mode="outlined"
                            label="Nome "
                            placeholder="Nome Estabelecimento"
                            onChange={(e)=> setNome(e.target.value)}
                            value={nome}               
                            />
                    <TextInput
                            style={{marginBottom:20, width:300}}
                            mode="outlined"
                            label="Contato "
                            placeholder="Contato Estabelecimento"
                            onChange={(e)=> setContato(e.target.value)}
                            value={contato}               
                    />
                    <TextInput
                            style={{marginBottom:20, width:300}}
                            mode="outlined"
                            label="Horário"
                            placeholder="Horário de Funcionamento"
                            onChange={(e)=> setFuncionamento(e.target.value)}
                            value={funcionamento}
                                           
                    />
                    <TextInput
                            style={{marginBottom:20, width:300}}
                            mode="outlined"
                            label="Instagram"
                            placeholder="Instagram"
                            onChange={(e)=> setInstagram(e.target.value)}
                            value={instagram}               
                            />
                    
                    
                </View>

                <View>
                <Button icon="plus-circle" mode="elevated" onPress={criaEstabelecimento}>
                    Cadastrar Estabelecimento
                </Button>
                </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default Cadastro