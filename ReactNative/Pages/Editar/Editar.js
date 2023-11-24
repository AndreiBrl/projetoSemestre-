import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, ImageBackground } from "react-native"
import {Text, TextInput, Button, Searchbar } from "react-native-paper"
import CardEstabelecimento from "../../Components/Cards/CardEstabelecimento";
import { useAuth } from "../../Components/Auth/Auth";
import axios from 'axios';
import { TouchableOpacity } from "react-native-web";


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
    const {userCompleto, token} = useAuth();
    const [editandoEstabelecimento, setEditandoEstabelecimento] = React.useState(null);


    useEffect(() => {
            axios.get(`https://localhost:7179/estabelecimentos/`).then(response => {
                setEstabelecimento(response.data)
            })

    }, [nomeEstabelecimento])

    const editaEstabelecimento = (estabelecimento) =>{     

        setEditandoEstabelecimento({
            id: estabelecimento.Id,
            nome: estabelecimento.Nome,
            funcionamento: estabelecimento.Funcionamento,
            contato: estabelecimento.Contato,
            instagram: estabelecimento.Instagram,
            usuarioId: userCompleto.id

        });
    }

    const editarestabelecimento = () =>{

        console.log(editandoEstabelecimento);

        axios.put(`https://localhost:7179/estabelecimentos/${editandoEstabelecimento.id}`,editandoEstabelecimento,{
            headers:{
                "Authorization" : "Bearer " + token
            }
        })

        navigation.navigate("Home")

        setEditandoEstabelecimento({
            id:'',
            nome:'',
            funcionamento:'',
            contato:'',
            instagram:''
        })
        setNomeEstabelecimento('')
    }

    return (
        <>
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
                                               
                            
                            <TouchableOpacity  onPress={()=>editaEstabelecimento(estabelecimentoFiltrado)}>

                                <CardEstabelecimento  
                                    key={estabelecimentoFiltrado.id}
                                    title={estabelecimentoFiltrado.Nome}
                                    //subtitle="Rio branco"
                                    style={style.cardEstabelecimento}
                                    />
                            </TouchableOpacity>
                        ))
                } 
                {
                    
                    editandoEstabelecimento &&
                        <KeyboardAvoidingView>
                            <TextInput
                                    style={{marginBottom:20, width:300}}
                                    mode="outlined"
                                    label="Nome "
                                    placeholder="Nome Estabelecimento"
                                    onChangeText={(text) => setEditandoEstabelecimento({ ...editandoEstabelecimento, nome: text })}
                                    value={editandoEstabelecimento.nome}            
                                    />

                            <TextInput
                                    style={{marginBottom:20, width:300}}
                                    mode="outlined"
                                    label="Contato "
                                    placeholder="Contato Estabelecimento"
                                    onChangeText={(text) => setEditandoEstabelecimento({ ...editandoEstabelecimento, contato: text })}
                                    value={editandoEstabelecimento.contato}               
                            />
                            <TextInput
                                    style={{marginBottom:20, width:300}}
                                    
                                    mode="outlined"
                                    label="Horário"
                                    placeholder="Horário de Funcionamento"
                                    onChangeText={(text) => setEditandoEstabelecimento({ ...editandoEstabelecimento, funcionamento: text })}
                                    value={editandoEstabelecimento.funcionamento}                
                            />
                            <TextInput
                                    style={{marginBottom:20, width:300}}
                                    mode="outlined"
                                    label="Instagram"
                                    placeholder="Instagram"
                                    onChangeText={(text) => setEditandoEstabelecimento({ ...editandoEstabelecimento, instagram: text })}
                                    value={editandoEstabelecimento.instagram}                  
                            />
                        </KeyboardAvoidingView>
                }
                                    
                </View>

                <View>
                <Button icon="plus-circle" mode="elevated" onPress={editarestabelecimento}>
                    Editar Estabelecimento
                </Button>
                </View>
                
                </ScrollView>
            </View>
        </ImageBackground>
    </>
    )
}

export default Editar