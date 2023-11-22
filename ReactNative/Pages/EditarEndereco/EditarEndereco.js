import { ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Searchbar, Text, TextInput } from "react-native-paper";
import CardEstabelecimento from "../../Components/Cards/CardEstabelecimento";


const EditarEndereco = () =>{

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

            <View style={{margin:30}}>

               <View style={{width:120}}>
                    <TextInput
                            style={{marginBottom:20}}
                            mode="outlined"
                            label="Cep "
                            placeholder="Digite o CEP"               
                            />
               </View>

                <View style={{flex:1, flexDirection: "row"}}>
                    <TextInput
                            style={{marginBottom:20, marginRight:20, width:"auto"}}
                            mode="outlined"
                            label="Rua "
                            placeholder=""               
                    />
                    <TextInput
                            style={{marginBottom:20, width:80}}
                            
                            mode="outlined"
                            label="Número"
                            placeholder=""               
                    />

                </View>

                <View>
                    <TextInput
                            style={{marginBottom:20, width: 250}}
                            mode="outlined"
                            label="Bairro"
                            placeholder=""               
                    />
                </View>

                <View style={{flex:1, flexDirection: "row"}}>
                    <TextInput
                            style={{marginBottom:20,marginEnd:20, width:160}}
                            mode="outlined"
                            label="Cidade"
                            placeholder="Cidade"               
                    />
                    <TextInput
                            style={{marginBottom:20, width:70}}
                            mode="outlined"
                            label="UF"
                            placeholder="UF"               
                    />

                </View>

            </View>

            <View>
            <Button icon="plus-circle" mode="elevated" onPress={() => console.log('Pressed')}>
                Editar Endereco
            </Button>
            </View>
            
            </ScrollView>
        </View>

        </ImageBackground>
    )
}

export default EditarEndereco;