import React , { useContext, useState } from 'react'
import { ChatProps, User, ChatMessage } from '../types';
import { View, Button, Text, TouchableHighlight, KeyboardAvoidingView, Keyboard } from 'react-native';
import { NavigationContainerProps, NavigationScreenProp, NavigationParams } from 'react-navigation';
import ChatHeader from '../components/ChatHeader';
import { ScrollView } from 'react-native-gesture-handler';
import Message from '../components/Message';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Input, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { SocketContext } from '../services/ServiceContext';

const ChatView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const chats = useSelector(state => state.chats)
  const connected = useSelector(state => state.connected)
  const user: User = navigation.getParam('user', {})
  const messages: ChatMessage[]  = navigation.getParam('messages', [])

  const [input, setInput] = useState('')

  const ref = useRef(null)
  const socket = useContext(SocketContext)

  useEffect(() => {
    ref.current.scrollToEnd({ animated: true })
  }, [chats])

  const send = () => {
    if(input.trim() !== '' && connected) {
      
    }
  }

  //TODO: SET CHAT BACKGROUND
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#63BDCF' }} enabled behavior='padding' keyboardVerticalOffset={-20}>
      <ChatHeader name={user.name} email={user.email} phone={user.phone} navigation={navigation} />
      <ScrollView style={{ paddingTop: 5 }} ref={ref}>
        {messages.map((message, i) => <Message message={message} key={i}/>)}
      </ScrollView>
      <View style={{ height: 75, width: '100%', backgroundColor: '#F5F5F5', borderTopColor: '#AAAAAA', borderTopWidth: 0.4, justifyContent: 'space-around', 
        paddingBottom: 20, alignItems: 'center', flexDirection: 'row', paddingLeft: 5, paddingRight: 5 }}>
        <TouchableHighlight style={{ height: 35, width: 35, borderRadius: 17.5, alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}>
          <Icon name ='camera' color='#4FC77F' type='material-community' size={28} />
        </TouchableHighlight>
        <Input 
          containerStyle={{ borderWidth: 0.2, backgroundColor: '#FFFFFF', borderRadius: 20, width: '70%', height: 30, borderColor: '#AAAAAA', justifyContent: 'center',
          alignItems: 'center' }}  
          inputContainerStyle={{ borderBottomWidth: 0 }}
          value={input}
          onChange={(event) => { setInput(event.nativeEvent.text) }}
        />
        <LinearGradient colors={['#4FC77F', '#33CA9B']} style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name='telegram' color='white' type='material-community' size={22} containerStyle={{ marginTop: 1, marginRight: 1 }} />
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChatView;