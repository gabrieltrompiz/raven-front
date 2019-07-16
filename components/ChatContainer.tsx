import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { ChatProps } from '../types'
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatContainer: React.FC<ChatProps> = ({ user, messages, navigation }) => {
  return (
    <View style={{ width: '100%', height: 70, backgroundColor: 'transparent' }}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ChatView', { user: user, messages: messages, navigation: navigation }) }
        style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#DDDDDD', padding: 20, marginLeft: 10, marginRight: 10 }} />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.message}>{messages[0].body}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-around', alignContent: 'space-around', height: 60 }}>
          <Text style={styles.time}>8:53 AM</Text>
          <Image 
            source={require('../assets/right-arrow.png')}
            style={{ width: 20, height: 20, tintColor: '#36C899', alignSelf: 'flex-end', marginRight: 10 }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '600',
    paddingBottom: 2
  },
  message: {
    fontFamily: 'Lato'
  },
  time: {
    fontFamily: 'Lato Light',
    marginRight: 10
  }
})

export default ChatContainer;