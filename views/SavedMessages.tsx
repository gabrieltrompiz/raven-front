import React from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Button, Image } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import { ChatMessage } from '../types';
import Message from '../components/Message';
import { getDate } from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SavedMessages: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const messages: ChatMessage[] = [
    { id: 1, user: {name: 'Soy el yo', phone: '04160005000', email: 'luis26-99@hotmail.com'}, attachment: '', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quasi odio soluta, velit quisquam culpa autem aperiam ipsam eaque assumenda modi voluptate, nulla nobis molestias cumque dignissimos laborum sed neque.', time: Date.now(), chat: 1, type: 1},
    { id: 2, user: {name: 'Soy el yo', phone: '04160005000', email: 'elyo@yo.yo'}, attachment: '', body: 'xd3 culo webazo', time: Date.now(), chat: 1, type: 1},
    { id: 3, user: {name: 'Soy el yo', phone: '04160005000', email: 'elyo@yo.yo'}, attachment: '', body: 'xd3 culo webazo', time: Date.now(), chat: 1, type: 1},
    { id: 4, user: {name: 'Soy el yo', phone: '04160005000', email: 'elyo@yo.yo'}, attachment: '', body: 'xd3 culo webazo', time: new Date('July 28, 2018 03:24:00').getTime(), chat: 1, type: 1}
  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <AppHeader title='Saved Messages' color='#FFF' shadow leftComponent={<Button icon={{ name: 'chevron-left', color: '#36C899' }} title=''
        onPress={() => navigation.goBack()} buttonStyle={{ backgroundColor: 'transparent', width: 50, marginTop: 5 }} 
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 50 }} style={{ width: 50 }} />} />
      <ScrollView>
      {messages.map((message, i) => 
        <View key={i}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: '70%', fontFamily: 'Lato Bold', fontSize: 12, paddingLeft: 10, paddingTop: 10, paddingBottom: 4 }}>{message.user.name}</Text>
              <Text style={{ width: '30%', textAlign: 'right', fontFamily: 'Lato Light', fontSize: 12, paddingTop: 10, paddingRight: 10, paddingBottom: 4 }}>{getDate(message.time) + ''}<Icon name='chevron-right'/></Text>
            </View>
            <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
              <Message message={message} />
            </View>
          </View>
          <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
        </View>
      )}
      </ScrollView>
    </View>
  );
}

export default SavedMessages;