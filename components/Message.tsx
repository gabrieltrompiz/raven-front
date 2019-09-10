import React, { useEffect } from 'react'
import { View, Text } from 'react-native';
import { ChatMessage } from '../types';
import { useSelector } from 'react-redux'
import { getTime } from '../utils'
import { Image } from 'react-native-elements';

interface Message {
  message: ChatMessage,
  group: boolean
}

const Message: React.FC<Message> = ({ message, group }) => {
  const loggedUser = useSelector(state => state.user)
  const own = loggedUser.email === message.user.email
  const server = require('../config.json').server

  return (
    <View style={{ width: '100%', backgroundColor: 'tranparent', minHeight: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 3, paddingTop: 5 }}>
      <View style={{ backgroundColor: own ? '#047DFF' : '#FFFFFF', alignSelf: own ? 'flex-end' : 'flex-start', maxWidth: '70%', borderRadius: 10, padding: 10 }}>
        {group && !own && <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#4FC77F', marginBottom: 1, width: '100%' }}>{message.user.name}</Text>}
        {message.attachment !== '' && 
        <Image source={{ uri: server + 'picture/' + message.attachment }} style={{ width: '100%', height: '100%' }}/>}
        <Text style={{ fontFamily: 'Lato', color: own ? 'white' : 'black', fontSize: 16 }}>{message.body}</Text>
        <View style={{ height: 10, alignSelf: 'flex-end' }}>
          <Text style={{ fontFamily: 'Lato Light', fontSize: 12, width: '100%', textAlign: 'right', color: own ? 'white' : 'black' }}>{getTime(message.time)}</Text>
        </View>
      </View>
    </View>
  );
}

export default Message;