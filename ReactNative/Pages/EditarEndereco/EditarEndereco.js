import { ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Searchbar, Text, TextInput } from "react-native-paper";
import CardEstabelecimento from "../../Components/Cards/CardEstabelecimento";
import { useAuth } from "../../Components/Auth/Auth";
import React, { useEffect } from "react";
import axios from 'axios';


const EditarEndereco = ({ navigation }) =>{
    const {estabelecimentoIdClicado, userCompleto, token} = useAuth();
    const [listaEnderecos, setListaEnderecos] = React.useState([]);
    const [editandoRua, setEditandoRua] = React.useState(null);
    const [enderecoClicado, setEnderecoClicado] = React.useState("");

    useEffect(()=>{

        axios.get(`https://localhost:7179/estabelecimentos/${estabelecimentoIdClicado}`)
        .then((response)=>{
            const data = response.data;
            setListaEnderecos(data.enderecos)

        }).catch((error)=>{
            console.log("ERRO", error);
        })

    },[])

    const editaRua = (endereco) =>{

       setEnderecoClicado({
            id: endereco.id,
            rua: endereco.rua,
            cep:endereco.cep,
            bairro: endereco.bairro,
            numero: endereco.numero,
            cep: endereco.cep,
            cidade: endereco.cidade,
            uf: endereco.uf,
            referencia: endereco.referencia,
            estabelecimentoId: estabelecimentoIdClicado

       })

    }


    const editarEndereco = () =>{
        axios.put(`https://localhost:7179/enderecos/${enderecoClicado.id}`,enderecoClicado,{
            headers:{
                "Authorization" : "Bearer " + token
            }
        })

        navigation.navigate("Editar")

    }

    const style = StyleSheet.create({

        backgroundImage:{
            flex: 1,
            resizeMode: 'cover', // Ou 'stretch' para cobrir toda a área
            justifyContent: 'center' 
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
        }
    });

    return(
        <ImageBackground
        source={require('../../assets/background.jpeg')}
        style={style.backgroundImage}>
            <View >
            <ScrollView contentContainerStyle={{alignItems:"center", margin:30}}>
            <Text variant="titleLarge" style={{color:"white", marginTop:100, marginBottom:10}} >Editar Endereco</Text>

            <View>
                {
                    listaEnderecos.map((item)=>(

                        <TouchableOpacity  onPress={()=>editaRua(item)}>
                            <CardEstabelecimento  
                                key={item.id}
                                title={item.rua}
                                subtitle={item.bairro}
                                style={style.cardEstabelecimento}
                            />
                        </TouchableOpacity>

                    ))
                }
                
            </View>
            {
                enderecoClicado &&
                <View style={{margin:30}}>

                    <View style={{width:120}}>
                            <TextInput
                                    style={{marginBottom:20}}
                                    mode="outlined"
                                    label="Cep "
                                    placeholder="Digite o CEP"
                                    onChangeText={(text) => setEnderecoClicado({ ...enderecoClicado, cep: text })}
                                    value={enderecoClicado.cep}               
                                    />
                    </View>

                    <View style={{flex:1, flexDirection: "row"}}>
                        <TextInput
                                style={{marginBottom:20, marginRight:20, width:"auto"}}
                                mode="outlined"
                                label="Rua "
                                placeholder=""
                                onChangeText={(text) => setEnderecoClicado({ ...enderecoClicado, rua: text })}
                                value={enderecoClicado.rua}  
                        />
                        <TextInput
                                style={{marginBottom:20, width:80}}
                                
                                mode="outlined"
                                label="Número"
                                placeholder=""  
                                onChangeText={(text) => setEnderecoClicado({ ...enderecoClicado, numero: text })}
                                value={enderecoClicado.numero} 
                        />

                    </View>

                    <View>
                        <TextInput
                                style={{marginBottom:20, width: 250}}
                                mode="outlined"
                                label="Bairro"
                                placeholder=""
                                onChangeText={(text) => setEnderecoClicado({ ...enderecoClicado, bairro: text })}
                                value={enderecoClicado.bairro} 
                        />
                    </View>

                    <View style={{flex:1, flexDirection: "row"}}>
                        <TextInput
                                style={{marginBottom:20,marginEnd:20, width:160}}
                                mode="outlined"
                                label="Cidade"
                                placeholder="Cidade"
                                onChangeText={(text) => setEnderecoClicado({ ...enderecoClicado, cidade: text })}
                                value={enderecoClicado.cidade} 
                        />
                        <TextInput
                                style={{marginBottom:20, width:70}}
                                mode="outlined"
                                label="UF"
                                placeholder="UF"
                                onChangeText={(text) => setEnderecoClicado({ ...enderecoClicado, uf: text })}
                                value={enderecoClicado.uf} 
                        />

                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <TextInput
                            style={{ marginBottom: 20, width:250 }}
                            mode="outlined"
                            label="Referência"
                            placeholder="Referência"
                            onChangeText={(text) => setEnderecoClicado({ ...enderecoClicado, referencia: text })}
                            value={enderecoClicado.referencia}
                            />
                    </View>

                </View>
            }


            <View>
            <Button icon="plus-circle" mode="elevated" onPress={editarEndereco}>
                Editar Endereco
            </Button>
            </View>
            
            </ScrollView>
        </View>

        </ImageBackground>
    )
}

export default EditarEndereco;