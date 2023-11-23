import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, ImageBackground } from "react-native"
import {Text, TextInput, Button, Searchbar } from "react-native-paper"
import CardEstabelecimento from "../../Components/Cards/CardEstabelecimento";
import { useAuth } from "../../Components/Auth/Auth";
import axios from 'axios';


const Editar = ({ navigation }) => {

    const style = StyleSheet.create({
      
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

    const [searchQuery, setSearchQuery] = React.useState('');
    const [nomeEstabelecimento, setNomeEstabelecimento] = React.useState("");
    const [estabelecimento, setEstabelecimento] = React.useState("");
    const {userCompleto} = useAuth();



    useEffect(() => {
            axios.get(`https://localhost:7179/estabelecimentos/`).then(response => {
                setEstabelecimento(response.data)
            })
    }, [])

    return (
        <ImageBackground
        source={require('../../assets/background.jpeg')}
        style={style.backgroundImage}>
            <View >
            <ScrollView contentContainerStyle={{alignItems:"center", margin:30}}>
            <Text variant="titleLarge" style={{color:"white", marginTop:100, marginBottom:10}} >Editar Estabelecimento</Text>

                <Searchbar
                        placeholder="Pesquisar"
                        onChangeText={(estab)=> setNomeEstabelecimento(estab)}
                        value={nomeEstabelecimento}
                        />
            
            <View style={{margin:30}}>

            {
                nomeEstabelecimento.length>0 && estabelecimento

                .filter((estabelecimento) => estabelecimento.Nome.toLowerCase().includes(nomeEstabelecimento.toLowerCase()))
                    .map((estabelecimentoFiltrado) => (
                        console.log(estabelecimentoFiltrado),
                        <CardEstabelecimento
                            key={estabelecimentoFiltrado.id}
                            title={estabelecimentoFiltrado.Nome}
                            //subtitle="Rio branco"
                            style={style.cardEstabelecimento}
                            />
                    ))

            } 
                            

                <KeyboardAvoidingView>
                    <TextInput
                            style={{marginBottom:20, width:300}}
                            mode="outlined"
                            label="Nome "
                            placeholder="Nome Estabelecimento"               
                            />

                
                    <TextInput
                            style={{marginBottom:20, width:300}}
                            mode="outlined"
                            label="Contato "
                            placeholder="Contato Estabelecimento"               
                    />
                    <TextInput
                            style={{marginBottom:20, width:300}}
                            
                            mode="outlined"
                            label="Horário"
                            placeholder="Horário de Funcionamento"               
                    />
                    <TextInput
                            style={{marginBottom:20, width:300}}
                            mode="outlined"
                            label="Instagram"
                            placeholder="Instagram"               
                    />
                </KeyboardAvoidingView>
            </View>

            <View>
            <Button icon="plus-circle" mode="elevated" onPress={() => console.log('Pressed')}>
                Editar Estabelecimento
            </Button>
            </View>
            
            </ScrollView>
        </View>
    </ImageBackground>
    )
}

export default Editar