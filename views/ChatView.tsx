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
import * as ImagePicker from 'expo-image-picker';

const pickerOptions = {
  base64: true,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true
};

const ChatView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const chats = useSelector(state => state.chats)
  const connected = useSelector(state => state.connected)
  const logged = useSelector(state => state.user)
  const background = useSelector(state => state.background);
  const dispatch = useDispatch()
  const user: User = navigation.getParam('user', null)
  const group = navigation.getParam('group', null)
  const messages = chats[user ? user.email : group.id] ? chats[user ? user.email : group.id].messages : navigation.getParam('messages', []);
  
  const server = require('../config.json').server;
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

  const send = (attachment?) => {
    console.log(attachment);
    if((input.trim() !== '' || attachment) && connected) {
      socket.sendMessage({ type: user ? 1 : 2, attachment: attachment ? attachment : '', body: input, to: user ? user.id : group.id })
      dispatch({ type: SEND_MESSAGE, payload: { message: { body: input, type: user ? 1 : 2, attachment: '', user: logged, time: Date.now() }, to: user ? user.email : group.id, user } })
      setInput('')
    }
  }

  const selectPicture = async () => {
    ImagePicker.launchImageLibraryAsync(pickerOptions)
      .then(res => {
        if(!res.cancelled) {
          uploadPicture(res.base64);
        }
      })
  }

  const uploadPicture = async (base64) => {
    const date = new Date();
    const body = {
      base64: base64,
      filename: '' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1))
      + date.getFullYear() + '_' + date.getHours() + date.getMinutes() + date.getSeconds()
      + '_' + logged.id + (user ? user.id : group.id) + '.png'
    };
    fetch(server + 'upload', { method: 'POST', body: JSON.stringify(body), credentials: 'include', headers: { "Content-Type": "application/json; charset=utf-8" } })
      .then(res => res.json()).then(res => {
        send(res.data.filePath);
      })
  }

  //TODO: SET CHAT BACKGROUND
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: background }} enabled behavior='padding' keyboardVerticalOffset={-20}>
      <ChatHeader name={user ? user.name : group.name} navigation={navigation} />
      <ScrollView style={{ paddingTop: 5 }} ref={ref}>
        {messages.map((message, i) => { 
          if(i == 0 || diffDays(new Date(messages[i].time), new Date(messages[i - 1].time)) > 0) {
            return (
              <View key={i}>
                <Label time={message.time} />
                <Message message={message} group={user === null} />
              </View>
            )
          }
          else if(i === messages.length - 1) {
            return (
              <View key={i} style={{ marginBottom: 10 }}>
                <Message message={message} group={user === null}/>
              </View>
            )
          }
          return <Message message={message} group={user === null} key={i} /> 
        })}
      </ScrollView>
      <View style={{ minHeight: 75, width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderTopColor: '#AAAAAA', borderTopWidth: 0.4, justifyContent: 'space-around', 
        paddingBottom: 20, alignItems: 'center', flexDirection: 'row', paddingLeft: 5, paddingRight: 5, maxHeight: 200 }}>
        <TouchableHighlight style={{ height: 35, width: 35, borderRadius: 17.5, alignItems: 'center', justifyContent: 'center', marginLeft: 5 }}
          onPress={selectPicture}>
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
          <TouchableHighlight style={{ width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' }} onPress={() => send()}>
            <Icon name='telegram' color='white' type='material-community' size={21} containerStyle={{ marginTop: 2, marginRight: 2 }} />
          </TouchableHighlight>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChatView;