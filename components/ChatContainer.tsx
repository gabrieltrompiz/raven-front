import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { ChatProps } from '../types'

const ChatContainer: React.FC<ChatProps> = ({ user, messages }) => {
  return (
    <View style={{ width: '100%', height: 70, backgroundColor: 'transparent', flexDirection: 'row' }}>
      <Text style={styles.name}>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '600'
  }
})

export default ChatContainer;