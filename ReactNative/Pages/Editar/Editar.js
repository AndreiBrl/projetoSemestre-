import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from "react-native"
import { Text, TextInput, Button, Searchbar } from "react-native-paper"
import CardEstabelecimento from "../../Components/Cards/CardEstabelecimento";
import { useAuth } from "../../Components/Auth/Auth";
import axios from 'axios';



const Editar = ({ navigation,route }) => {

    const style = StyleSheet.create({

        cardEstabelecimento: {
            elevation: 4,
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            marginBottom: 10,
            backgroundColor: "white",
            width: 300
        },
        backgroundImage: {
            flex: 1,
            resizeMode: 'cover', // Ou 'stretch' para cobrir toda a área
            justifyContent: 'center'
        }
    })

    //const [searchQuery, setSearchQuery] = React.useState('');
    const [nomeEstabelecimento, setNomeEstabelecimento] = React.useState("");
    const [estabelecimento, setEstabelecimento] = React.useState([]);
    const { userCompleto, token, setEstabelecimentoIdClicado, estabelecimentoIdClicado,estabelecimentoClicado,flag } = useAuth();
    const [editandoEstabelecimento, setEditandoEstabelecimento] = React.useState(null);
   


    useEffect(() => {
        

            axios.get(`http://3.232.53.72:5000/estabelecimentos/${userCompleto.id}`).then(response => {
                setEstabelecimento(response.data)
                
            })
        

    }, [nomeEstabelecimento])

    const editaEstabelecimento = (estabelecimento) => {

        setEstabelecimentoIdClicado(estabelecimento.id);


        setEditandoEstabelecimento({
            id: estabelecimento.id,
            nome: estabelecimento.nome,
            funcionamento: estabelecimento.funcionamento,
            contato: estabelecimento.contato,
            instagram: estabelecimento.instagram,
            usuarioId: userCompleto.id
        });
    }
    useEffect(() => {
        if (userCompleto.roles[0] == "admin") {
            axios.get(`http://3.232.53.72:5000/estabelecimentos/${estabelecimentoClicado.Id}`).then(response => {
                const data = response.data
                
                
                setEditandoEstabelecimento({
                    
                    id: data.id,
                    nome: data.nome,
                    funcionamento: data.funcionamento,
                    contato: data.contato,
                    instagram: data.instagram,
                    usuarioId: estabelecimentoClicado.UsuarioId
                });
            })
        }
        
        
    },[flag])

    
    const deletaEstabelecimento = () =>{

        if(userCompleto.roles[0] == "admin"){
            axios.delete(`http://3.232.53.72:5000/estabelecimentos/${editandoEstabelecimento.id}`,{
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
        }

        navigation.navigate("TelaMenuBottom");
    }

    
    const editarestabelecimento = () => {
        
        console.log("EDIT AQUI",editandoEstabelecimento);
        axios.put(`http://3.232.53.72:5000/estabelecimentos/${editandoEstabelecimento.id}`, editandoEstabelecimento, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        
        setEditandoEstabelecimento({
            id: '',
            nome: '',
            funcionamento: '',
            contato: '',
            instagram: ''
        })
        navigation.navigate("Home")
        setNomeEstabelecimento('')
    }

    return (
        <>
            <ImageBackground
                source={require('../../assets/background.jpeg')}
                style={style.backgroundImage}>
                <View >
                    <ScrollView contentContainerStyle={{ alignItems: "center", margin: 30 }}>
                        <Text variant="titleLarge" style={{ color: "white", marginTop: 100, marginBottom: 10,fontFamily:"poppins" }} >Editar Estabelecimento</Text>
                        {
                            userCompleto.roles[0] !== "admin" &&
                            <Searchbar
                                placeholder="Pesquisar"
                                onChangeText={(estab) => setNomeEstabelecimento(estab)}
                                value={nomeEstabelecimento}
                            />
                        }

                        <View style={{ margin: 30 }}>

                           
                            {
                             
                                 nomeEstabelecimento.length > 0 && estabelecimento 

                                 

                                     .filter(
                                         (estabelecimento) =>
                                         estabelecimento.nome
                                         .toLowerCase()
                                         .includes(nomeEstabelecimento.toLowerCase())
                                         )
                                         .map((estabelecimentoFiltrado) => (
                                             <TouchableOpacity onPress={() => editaEstabelecimento(estabelecimentoFiltrado)} key={estabelecimentoFiltrado.id}>
                                            <CardEstabelecimento
                                                key={estabelecimentoFiltrado.id}
                                                title={estabelecimentoFiltrado.nome}
                                                style={style.cardEstabelecimento}
                                                />
                                        </TouchableOpacity>
                                    ))
                                 
                                }
                                {

                                editandoEstabelecimento && (

                                    <KeyboardAvoidingView>
                                        <TextInput
                                            style={{ marginBottom: 20, width: 300 }}
                                            mode="outlined"
                                            label="Nome "
                                            placeholder="Nome Estabelecimento"
                                            onChangeText={(text) => setEditandoEstabelecimento({ ...editandoEstabelecimento, nome: text })}
                                            value={editandoEstabelecimento.nome}
                                        />

                                        <TextInput
                                            style={{ marginBottom: 20, width: 300 }}
                                            mode="outlined"
                                            label="Contato "
                                            placeholder="Contato Estabelecimento"
                                            onChangeText={(text) => setEditandoEstabelecimento({ ...editandoEstabelecimento, contato: text })}
                                            value={editandoEstabelecimento.contato}
                                        />
                                        <TextInput
                                            style={{ marginBottom: 20, width: 300 }}

                                            mode="outlined"
                                            label="Horário"
                                            placeholder="Horário de Funcionamento"
                                            onChangeText={(text) => setEditandoEstabelecimento({ ...editandoEstabelecimento, funcionamento: text })}
                                            value={editandoEstabelecimento.funcionamento}
                                        />
                                        <TextInput
                                            style={{ marginBottom: 20, width: 300 }}
                                            mode="outlined"
                                            label="Instagram"
                                            placeholder="Instagram"
                                            onChangeText={(text) => setEditandoEstabelecimento({ ...editandoEstabelecimento, instagram: text })}
                                            value={editandoEstabelecimento.instagram}
                                        />
                                    </KeyboardAvoidingView>
                                )
                            }

                        </View>

                        <View style={{ flex: 1, flexDirection: "column" }}>
                            <View style={{ marginBottom: 10 }}>
                                <Button icon="plus-circle" mode="elevated" onPress={editarestabelecimento}>
                                    Editar Estabelecimento
                                </Button>
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Button icon="plus-circle" mode="elevated" onPress={() => navigation.navigate("EditarEndereco")}>
                                    Editar Endereços
                                </Button>
                            </View>

                            {
                                userCompleto.roles[0] == "admin" &&
                                        <View>
                                            <Button buttonColor="red" textColor="white" icon="plus-circle" mode="elevated" onPress={deletaEstabelecimento}>
                                                Deletar Estabelecimento
                                            </Button>
                                        </View>
                            }


                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </>
    )
}

export default Editar