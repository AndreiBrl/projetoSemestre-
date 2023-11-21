import * as React from 'react';
import { Avatar } from 'react-native-paper';

const AvatarUser = ({label, size}) => (
  <Avatar.Text size={size} label={label} />
);

export default AvatarUser;
