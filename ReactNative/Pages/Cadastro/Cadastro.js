import { ScrollView, View, StyleSheet, ImageBackground } from "react-native"
import {Text, TextInput, Button } from "react-native-paper"
import BotaoCadastroEndereco from "../../Components/BotaoCadastroEndereco/BotaoCadastroEndereco"



const Cadastro = ({ navigation }) => {


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
                <BotaoCadastroEndereco onPress={"CadastroEndereco"}/>
                <ScrollView contentContainerStyle={{alignItems:"center", margin:30}}>
                <Text variant="titleLarge" style={{color:"white", marginTop:100}} >Cadastro de Estabelecimento</Text>
                <View style={{margin:30}}>
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
                    
                    
                </View>

                <View>
                <Button icon="plus-circle" mode="elevated" onPress={()=>console.log("Clicou")}>
                    Cadastrar Estabelecimento
                </Button>
                </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default Cadastro