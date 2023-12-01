import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import MenuTresPontos from '../Navigator/MenuTresPontos'
import { View } from 'react-native';
import { useAuth } from '../Auth/Auth';


const CardEstabelecimento = ({ title, subtitle, style, abreMenu }) => {
  const { userCompleto } = useAuth();

  return (
    <View>
      {
      userCompleto.roles[0] === "admin" ? (
            <Card.Title
              title={title}
              subtitle={subtitle}
              style={style}
              left={(props) => <Avatar.Icon {...props} icon="office-building" />}
              right={(props) => <IconButton {...props} icon="dots-vertical" onPress={abreMenu} />}
            />
      ) : 
      (
        <Card.Title
              title={title}
              subtitle={subtitle}
              style={style}
              left={(props) => <Avatar.Icon {...props} icon="office-building" />}
            />
      )
      
      }
    </View>
  );
};

export default CardEstabelecimento;
