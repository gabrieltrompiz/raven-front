import React, { useState } from 'react';
import { ContactProps } from '../types';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ContactContainer: React.FC<ContactProps> = ({ user, status, toggle, action }) => {
  const [toggled, setToggled] = useState(toggle);
  const server = require('../config.json').server;

  const toggleBlock = () => {
    setToggled(!toggled);
  }

  console.log(server + 'picture/' + user.pictureUrl)

  return(
    <View style={{ width: '100%', height: 70, backgroundColor: 'transparent' }}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => typeof action === 'undefined' ? toggleBlock() : action() }
        style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: server + 'picture/' + user.pictureUrl }}
            style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#DDDDDD', padding: 20, marginTop: 3, marginLeft: 10, marginRight: 10 }}
          />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.message}>{status}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-around', alignContent: 'space-around', height: 60, right: 0 }}>
          {typeof toggle !== 'undefined' && <Icon name={ toggled ? 'close-circle' : 'circle' } size={35} color={ toggled ? '#f21616' : '#22d40f' } />}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Lato Light',
    paddingBottom: 2
  },
  message: {
    fontFamily: 'Lato',
    maxWidth: '100%'
  },
  time: {
    fontFamily: 'Lato Light',
    marginRight: 10
  }
})

export default ContactContainer;