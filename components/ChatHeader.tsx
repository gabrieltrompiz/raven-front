import React from 'react'
import { User } from '../types';
import { Header } from 'react-native-elements';

const ChatHeader: React.FC<User> = ({ name, email, phone }) => {
  return (
    <Header 
      backgroundColor='#FFFFFF'
      containerStyle={{ shadowOpacity: 0.3, shadowOffset: { height: 10, width: 0 }, shadowRadius: 5, borderBottomWidth: 0, margin: 0, zIndex: 10 }}
      centerComponent={{ text: name, style: { color: '#000', fontFamily: 'Lato', fontSize: 20 } }}
    />
  );
}

export default ChatHeader;