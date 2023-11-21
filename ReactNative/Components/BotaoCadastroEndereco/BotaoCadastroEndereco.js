import React from "react"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"

const BotaoCadastroEndereco = ({onPress, navigation })=>{
    const style = StyleSheet.create({
      btnCriar:{
        position:"absolute",
        right:0,
        bottom:0,
        alignItems:"center",
        justifyContent:"center",
        //width:60,
        height:60,
        borderRadius:50,
        zIndex:999
      
      }
       
       })
    
    return(
        <View style={style.btnCriar}>
                <Button icon="plus" mode="elevated" onPress={onPress}>
                    Cadastrar Endereço
                </Button>   
        </View>
    )
}

export default BotaoCadastroEndereco