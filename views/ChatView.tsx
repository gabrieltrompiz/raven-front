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
import Label from '../components/Label'
import { diffDays } from '../utils';
import { useDispatch } from 'react-redux'
import { SEND_MESSAGE } from '../redux/actionTypes'

const ChatView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const chats = useSelector(state => state.chats)
  const connected = useSelector(state => state.connected)
  const logged = useSelector(state => state.user)
  const background = useSelector(state => state.background);
  const dispatch = useDispatch()
  const user: User = navigation.getParam('user', {})
  const messages: ChatMessage[]  = navigation.getParam('messages', [])

  const [input, setInput] = useState('')

  const ref = useRef(null)
  const socket = useContext(SocketContext)

  useEffect(() => {
    ref.current.scrollToEnd({ animated: true })
  }, [chats])

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => { ref.current.scrollToEnd({ animated: true }) })
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow')
    }
  }, [])

  const send = () => {
    if(input.trim() !== '' && connected) {
      socket.sendMessage({ type: 1, attachment: '', body: input, to: user.id })
      dispatch({ type: SEND_MESSAGE, payload: { message: { body: input, type: 1, attachment: '', user: logged, time: Date.now() }, to: user } })
      setInput('')
    }
  }

  //TODO: SET CHAT BACKGROUND
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: background }} enabled behavior='padding' keyboardVerticalOffset={-20}>
      <ChatHeader name={user.name} email={user.email} phone={user.phone} navigation={navigation} />
      <ScrollView style={{ paddingTop: 5 }} ref={ref}>
        {messages.map((message, i) => { 
          if(i == 0 || diffDays(new Date(messages[i].time), new Date(messages[i - 1].time)) > 0) {
            return (
              <View key={i}>
                <Label time={message.time} />
                <Message message={message} />
              </View>
            )
          }
          else if(i === messages.length - 1) {
            return (
              <View key={i} style={{ marginBottom: 10 }}>
                <Message message={message} />
              </View>
            )
          }
          return <Message message={message} key={i} /> 
        })}
      </ScrollView>
      <View style={{ minHeight: 75, width: '100%', backgroundColor: '#F5F5F5', borderTopColor: '#AAAAAA', borderTopWidth: 0.4, justifyContent: 'space-around', 
        paddingBottom: 20, alignItems: 'center', flexDirection: 'row', paddingLeft: 5, paddingRight: 5, maxHeight: 200 }}>
        <TouchableHighlight style={{ height: 35, width: 35, borderRadius: 17.5, alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}>
          <Icon name ='camera' color='#4FC77F' type='material-community' size={28} />
        </TouchableHighlight>
        <Input 
          containerStyle={{ borderWidth: 0.2, backgroundColor: '#FFFFFF', borderRadius: 20, width: '70%', borderColor: '#AAAAAA', justifyContent: 'center',
          alignItems: 'center', height: 30 }}
          inputContainerStyle={{ borderBottomWidth: 0 }} numberOfLines={1}
          value={input} inputStyle={{ fontFamily: 'Lato' }}
          onChange={(event) => { setInput(event.nativeEvent.text) }}
        />
        <LinearGradient colors={['#4FC77F', '#33CA9B']} style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
          <TouchableHighlight style={{ width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' }} onPress={send}>
            <Icon name='telegram' color='white' type='material-community' size={21} containerStyle={{ marginTop: 2, marginRight: 2 }} />
          </TouchableHighlight>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChatView;