import React from 'react'
import { ChatHeaderProps } from '../types';
import { Header, Button } from 'react-native-elements';

const ChatHeader: React.FC<ChatHeaderProps> = ({ name, navigation, preview }) => {
  return (
    <Header 
      backgroundColor='rgba(255, 255, 255, 0.9)'
      containerStyle={{ shadowColor: '#DCDEF4', borderBottomWidth: 0.2, margin: 0, zIndex: 10, borderBottomColor: '#AAAAAA' }}
      centerComponent={{ text: name, style: { color: '#000', fontFamily: 'Lato Bold', fontSize: 20 } }}
      leftComponent={
        <Button icon={{ name: 'chevron-left', color: '#36C899' }} onPress={() => navigation.goBack()} title='Chats' buttonStyle={{ backgroundColor: 'transparent', left: -12 }}
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold', left: -6 }}/>
      }
    />
  );
}

export default ChatHeader;