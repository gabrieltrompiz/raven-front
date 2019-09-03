import React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { ChatProps } from '../types'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getTime } from '../utils'
import { useSelector } from 'react-redux'

const ChatContainer: React.FC<ChatProps> = ({ user, group, messages, navigation }) => {
  const loggedUser = useSelector(state => state.user)

  return (
    <View style={{ width: '100%', height: 70, backgroundColor: 'transparent' }}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dangerouslyGetParent().navigate('ChatView', { user: user, messages: messages, navigation: navigation, group: group }) }
        style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#DDDDDD', padding: 20, marginLeft: 10, marginRight: 10 }} />
          <View style={{ width: '65%' }}>
            <Text style={styles.name}>{user ? user.name : group.name}</Text>
            <Text style={styles.message} numberOfLines={2}>
              {group && <Text style={{ color: 'black' }}>{messages[messages.length - 1].user.id === loggedUser.id ? 'You:\n' : messages[messages.length - 1].user.name + ':\n'}</Text>}
              {messages.length > 0 ? messages[messages.length - 1].body : group.creator.id === loggedUser.id ? 'You created this ' + (group.type === 2 ? 'group.' : 'channel.') : 
              group.creator.name + ' added you to this ' + (group.type === 2 ? 'group.' : 'channel.')}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-around', alignContent: 'space-around', height: 60, right: 10 }}>
          <Text style={styles.time}>
            {messages.length > 0 ? getTime(messages[messages.length - 1].time) : getTime(group.creationTime)}
          </Text>
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
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Lato Light',
    paddingBottom: 2
  },
  message: {
    fontFamily: 'Lato',
    width: '100%',
    color: '#666666'
  },
  time: {
    fontFamily: 'Lato Light',
    marginRight: 10
  }
})

export default ChatContainer;