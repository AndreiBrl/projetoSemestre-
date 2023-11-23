import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native"
import { Searchbar } from 'react-native-paper';
import CardEstabelecimento from "../../Components/Cards/CardEstabelecimento"
import MenuTresPontos from "../../Components/Navigator/MenuTresPontos"
import { Button } from 'react-native-paper';
import { useAuth } from '../../Components/Auth/Auth';
import axios from 'axios';





const Home = ({ navigation }) => {
    const {userCompleto, autenticado,setIndex ,token} = useAuth();
    const [nomeEstabelecimento, setNomeEstabelecimento] = React.useState("");
    const [estabelecimento, setEstabelecimento] = React.useState([]);
    const [ativaPesquisa, setAtivaPesquisa] = React.useState(false);
 

    const novaFuncao = ()=>{
        console.log("Clicou");
        return(
            <View>
                <MenuTresPontos/>
            </View>
        )
      }


      useEffect(() => {
        if (userCompleto.roles[0] != "admin") {

            userCompleto && axios.get(`https://localhost:7179/estabelecimentos/${userCompleto.id}`).then(response => {
                const data = response.data;

                setEstabelecimento(data);
            });
        }

    }, [])



    const style = StyleSheet.create({
        container: {
            position: "relative",


        },
        customh1: {
            color: "red"
        },
        MenuFixo: {
            position: 'fixed', bottom: 0, left: 0, right: 0

        },
        infoInicial: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop:70
        },
        titulo: {
            fontSize: 35,
            color:"white"
            
        },
        estabecimentos: {
            flex: 1,
            margin: 10,
            padding: 5,
            borderRadius: 5,
            
        },
        cardEstabelecimento: {
            elevation: 4,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            marginBottom: 10,
            backgroundColor:"white"
        
        },
        backgroundImage:{
            flex: 1,
            resizeMode: 'cover', // Ou 'stretch' para cobrir toda a área
            justifyContent: 'center' 
        }


    })
    return (
        <>

        {
            userCompleto.roles[0] === "admin" ? (
          
                <ImageBackground
                source={require('../../assets/background.jpeg')}
                style={style.backgroundImage}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, height: 790 }}>
                    
                    <View style={style.container}>

                        <View style={{ height: 500 }}>
                            <View style={style.infoInicial}>

                                <Text style={style.titulo}>Bem vindo</Text>
                                <Text style={style.titulo} >{userCompleto.login}</Text>

                            </View>
                            <View style={style.estabecimentos}>
                                <Text style={{ fontSize: 30, paddingLeft: 50, marginBottom: 20, color:"white" }}>Tela Admin</Text>
                                <View>

                                    <View>
                                    <Searchbar
                                        placeholder="Pesquisar"
                                        //onChangeText={}
                                        //value={}
                                        />

                                    </View>

                                    <View style={{flex:1, flexDirection: "row", justifyContent:"space-around"}}>
                                        <Button icon="account-multiple-plus" mode="contained" onPress={() => console.log('Pressed')}>
                                            Cadastro Usuario
                                        </Button>

                                        <Button icon="account-tie" mode="contained" onPress={() => console.log('Pressed')}>
                                            Cadastro Admin
                                        </Button>

                                    </View>
                                    
                                </View>
                            </View>



                        </View>


                        <View style={style.MenuFixo}>


                        </View>

                    </View>
                
                </ScrollView>
                
                </ImageBackground> ) 
                
                : 

                <ImageBackground
                source={require('../../assets/background.jpeg')}
                style={style.backgroundImage}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, height: 790 }}>
                    
                    <View style={style.container}>

                        <View style={{ height: 500 }}>
                            <View style={style.infoInicial}>

                                <Text style={style.titulo}>Bem vindo</Text>
                                <Text style={style.titulo} >{userCompleto.login}</Text>

                            </View>
                            <View style={style.estabecimentos}>
                                <Text style={{ fontSize: 30, paddingLeft: 50, marginBottom: 20, color:"white" }}>Seus Estabelecimentos</Text>
                                <View>
                                   {

                                            estabelecimento && estabelecimento.length > 0 ? (
                                                estabelecimento.map((item, index) => (
                                                    <CardEstabelecimento
                                                            key={item.id}
                                                            title={item.nome}
                                                            subtitle={item.enderecos && item.enderecos.length > 0 ? item.enderecos[0].rua : 'Nenhum endereço disponível'}
                                                            style={style.cardEstabelecimento}
                                                        />
                                                ))
                                            ) : (
                                                <h1 style={{ fontSize: 20 }}>Não há estabelecimentos cadastrados</h1>
                                            )                               
                                            
                                   }
                                </View>
                            </View>



                        </View>


                        <View style={style.MenuFixo}>


                        </View>

                    </View>
                
                </ScrollView>
                
                </ImageBackground>


                
            
            
        }

    
      
    </>
    )
}

export default Home