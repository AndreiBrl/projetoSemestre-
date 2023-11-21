import { ScrollView, View } from "react-native"
import {Text, TextInput, Button } from "react-native-paper"
import BotaoCadastroEndereco from "../../Components/BotaoCadastroEndereco/BotaoCadastroEndereco"



const Cadastro = ({ navigation }) => {

    return (
        <View style={{flex:1, margin:20}}>
            <BotaoCadastroEndereco onPress={()=>console.log("Apertou")}/>
            <ScrollView contentContainerStyle={{alignItems:"center", margin:30}}>
            <Text variant="titleLarge" >Cadastro de Estabelecimento</Text>
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
            <Button icon="plus-circle" mode="elevated" onPress={() => console.log('Pressed')}>
                Cadastrar Estabelecimento
            </Button>
            </View>
            </ScrollView>
        </View>
    )
}

export default Cadastro