import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import MenuTresPontos from '../Navigator/MenuTresPontos'


const CardEstabelecimento = ({title,subtitle,style,abreMenu}) => (
  
  <Card.Title
  title={title}
  subtitle={subtitle}
  style={style}
    left={(props) => <Avatar.Icon {...props} icon="office-building" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={abreMenu} />}
  />
);

export default CardEstabelecimento;