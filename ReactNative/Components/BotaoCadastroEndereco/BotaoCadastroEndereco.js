import React from "react"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"

const BotaoCadastroEndereco = ({onClick,onPress})=>{
    const style = StyleSheet.create({
      btnCriar:{
        position:"absolute",
        right:0,
        bottom:0,
        alignItems:"center",
        justifyContent:"center",
        width:60,
        height:60,
        borderRadius:50
      
      }
       
       })
    
    return(
        <View style={style.btnCriar}>
            <View>
            <Button mode="elevated" style={style.btnCriar} onPress={onPress}>
                +
            </Button>
            </View>
           
        </View>
    )
}

export default BotaoCadastroEndereco