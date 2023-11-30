import * as React from 'react';
import { View } from 'react-native';
import { Menu } from 'react-native-paper';

const MenuTresPontos = ({navigation,navEditEsbelecimento,navEditEndereco}) => (
  <View style={{ flex: 1, backgroundColor:"lightgray",width:170,marginBottom:10,position:"absolute",zIndex:999,right:50,top:10, borderRadius:3 }}>
    <Menu.Item leadingIcon="redo" onPress={navEditEsbelecimento} title="Editar" />
    <Menu.Item leadingIcon="undo" onPress={navEditEndereco} title="Editar endereço" />
  </View>
);

export default MenuTresPontos;