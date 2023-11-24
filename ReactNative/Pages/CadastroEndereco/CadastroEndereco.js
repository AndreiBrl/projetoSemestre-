import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Searchbar, Text, TextInput } from "react-native-paper";
import CardEstabelecimento from "../../Components/Cards/CardEstabelecimento";
import axios from 'axios';
import { useAuth } from "../../Components/Auth/Auth";

const CadastroEndereco = () => {
  const { userCompleto, token } = useAuth();
  const [estabelecimentoPesquisado, setEstabelecimentoPesquisado] = useState("");
  const [estabelecimentosUsuario, setEstabelecimentosUsuario] = useState([]);
  const [cardClicado, setCardClicado] = useState(null);

    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [numero, setNumero] = useState("");
    const [referencia, setReferencia] = useState("");
    const [estabelecimentoId, setEstabelecimentoId] = useState("");

  const style = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
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
      backgroundColor: "white"
    }
  });


  useEffect(()=>{

    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response)=>{
        const data = response.data
        
        setRua(data.logradouro)
        setBairro(data.bairro)
        setCidade(data.localidade)
        setUf(data.uf)
    })
    .catch((error)=>{
        console.log(error);
    })

    if(cep === ""){
        setRua("")
        setBairro("")
        setCidade("")
        setUf("")
        setNumero("")
        setReferencia("")
    }
},[cep])

  useEffect(() => {
    axios.get(`https://localhost:7179/estabelecimentos/${userCompleto.id}`).then(response => {
      const data = response.data;
      setEstabelecimentosUsuario(data);
      console.log(data);
    });
  }, []);


  const enderecoCadastrado = {
    rua: rua,
    bairro: bairro,
    numero: numero,
    cep: cep,
    cidade: cidade,
    uf: uf,
    referencia: referencia,
    estabelecimentoId: estabelecimentoId
}

  const cadastraEndereco = () => {
    
    axios.post(`https://localhost:7179/enderecos`,enderecoCadastrado,{
        headers:{
            "Authorization" : "Bearer " + token
        }
    })
    .then((response)=>{
        console.log("Endereço cadastrado ",response);
    })
    .catch((error)=>{
        console.log(error);
    })

}

  const handleCardClick = (id) => {
    setCardClicado(id);
    setEstabelecimentoId(id)
  };

  return (
            <ImageBackground
            source={require('../../assets/background.jpeg')}
            style={style.backgroundImage}
            >
            <View>
                <ScrollView contentContainerStyle={{ alignItems: "center", margin: 30 }}>
                <Text
                    variant="titleLarge"
                    style={{ color: "white", marginTop: 100, marginBottom: 10 }}
                >
                    Cadastrar Endereco
                </Text>

                <View>
                    <Searchbar
                    placeholder="Pesquisar"
                    onChangeText={(estab) => setEstabelecimentoPesquisado(estab)}
                    value={estabelecimentoPesquisado}
                    />
                </View>

                <View style={{marginTop:50}}>
                    {
                        estabelecimentoPesquisado && estabelecimentosUsuario
                            .filter(
                            (estabelecimento) =>
                                estabelecimento.nome
                                .toLowerCase()
                                .includes(estabelecimentoPesquisado.toLowerCase())
                            )
                            .map((estabelecimentoFiltrado) => (
                            <TouchableOpacity onPress={() => handleCardClick(estabelecimentoFiltrado.id)}>
                                <CardEstabelecimento
                                key={estabelecimentoFiltrado.id}
                                title={estabelecimentoFiltrado.nome}
                                style={[
                                    style.cardEstabelecimento,
                                    cardClicado === estabelecimentoFiltrado.id ? { borderWidth: 2, borderColor: 'blue' } : null,
                                ]}
                                />
                            </TouchableOpacity>
                            ))
                        }
                </View>

                {
                    cardClicado !== null && (
                        <View style={{ margin: 30 }}>
                            <View style={{ width: 120 }}>
                                <TextInput
                                style={{ marginBottom: 20 }}
                                mode="outlined"
                                label="Cep "
                                placeholder="Digite o CEP"
                                onChangeText={(text) => setCep(text)}
                                value={cep}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: "row" }}>

                                <TextInput
                                style={{ marginBottom: 20, marginRight: 20, width: "auto" }}
                                mode="outlined"
                                label="Rua "
                                placeholder=""
                                onChangeText={(text) => setRua(text)}
                                value={rua}
                                />

                                <TextInput
                                style={{ marginBottom: 20, width: 80 }}
                                mode="outlined"
                                label="Número"
                                placeholder=""
                                onChangeText={(text) => setNumero(text)}
                                value={numero}
                                />
                            </View>

                            <View>
                                <TextInput
                                style={{ marginBottom: 20, width: 250 }}
                                mode="outlined"
                                label="Bairro"
                                placeholder=""
                                onChangeText={(text) => setBairro(text)}
                                value={bairro}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: "row" }}>

                                <TextInput
                                style={{ marginBottom: 20, marginEnd: 20, width: 160 }}
                                mode="outlined"
                                label="Cidade"
                                placeholder="Cidade"
                                onChangeText={(text) => setCidade(text)}
                                value={cidade}
                                />
                                <TextInput
                                style={{ marginBottom: 20, width: 70 }}
                                mode="outlined"
                                label="UF"
                                placeholder="UF"
                                onChangeText={(text) => setUf(text)}
                                value={uf}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <TextInput
                                    style={{ marginBottom: 20, width:250 }}
                                    mode="outlined"
                                    label="Referência"
                                    placeholder="Referência"
                                    onChangeText={(text) => setReferencia(text)}
                                    value={referencia}
                                    />
                            </View>
                        </View>
                    )
                }

                <View>
                    <Button
                    style={{marginTop: 50}}
                    icon="plus-circle"
                    mode="elevated"
                    onPress={() => cadastraEndereco()}
                    >
                    Cadastrar Endereco
                    </Button>
                </View>
                </ScrollView>
            </View>
            </ImageBackground>
        );
}

export default CadastroEndereco;
