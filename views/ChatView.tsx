import React , { useContext } from 'react'
import { ChatProps, User, ChatMessage } from '../types';
import { View } from 'react-native';
import { NavigationContainerProps, NavigationScreenProp, NavigationParams } from 'react-navigation';
import ChatHeader from '../components/ChatHeader';

const ChatView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const user: User = navigation.getParam('user', {})
  const messages: ChatMessage  = navigation.getParam('messages', [])

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <ChatHeader name={user.name} email={user.email} phone={user.phone} />
    </View>
  );
}

export default ChatView;