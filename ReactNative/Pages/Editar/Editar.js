import React from "react";
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, ImageBackground } from "react-native"
import {Text, TextInput, Button, Searchbar } from "react-native-paper"
import CardEstabelecimento from "../../Components/Cards/CardEstabelecimento";


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

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <ImageBackground
        source={require('../../assets/background.jpeg')}
        style={style.backgroundImage}>
            <View >
            <ScrollView contentContainerStyle={{alignItems:"center", margin:30}}>
            <Text variant="titleLarge" style={{color:"white", marginTop:100, marginBottom:10}} >Editar Estabelecimento</Text>

            <View>
            <Searchbar
                    placeholder="Pesquisar"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    />
            </View>
            <View style={{margin:30}}>

            <CardEstabelecimento

                title="Chimarrom"
                subtitle="Rio branco"
                style={style.cardEstabelecimento}
                />

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