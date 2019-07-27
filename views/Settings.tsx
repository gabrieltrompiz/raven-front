import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import AppHeader from '../components/AppHeader';
import { Button, Icon } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux'

const Settings: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const user = useSelector(store => store.user);

  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center' }}>
      <AppHeader title='Settings' color='#FFF' shadow/>
      <TouchableOpacity style={{ backgroundColor: 'transparent', marginTop: 3, width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      onPress={() => navigation.navigate('Profile')}>
        <Image 
          source={require('../assets/icon.png')} 
          style={{
            width: 75, height: 75, margin: 20, marginLeft: 10, marginRight: 10, borderRadius: 1000
        }}/>
        <View style={{ backgroundColor: 'transparent', width: '65%', marginBottom: '4%' }}>
          <Text style={{ fontFamily: 'Lato Bold', padding: 0, fontSize: 22 }} >{user.name}</Text>
          <Text style={{ fontFamily: 'Lato Light', paddingTop: 2, fontSize: 13 }} >Raven has a little green bird isn't it cute {/* TODO: store.status (status isn't stored yet) */}</Text>
        </View>
        <Icon name='chevron-right' color='#36C899' size={40} iconStyle={{ right: 0 }} />
      </TouchableOpacity>
      
      <Button title="Chats" containerStyle={{ width: '90%', marginBottom: 10 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 43,
        justifyContent: 'flex-start' }} titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18 }} icon={<Icon name='chat' color='#36C899' size={33} iconStyle={{ marginRight: 5, marginLeft: 5, paddingTop: 3 }} />} 
        onPress={() => navigation.navigate('ChatSettings')} />
      <Button title="Notifications" containerStyle={{ width: '90%', marginBottom: 10 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 43,
        justifyContent: 'flex-start' }} titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18 }} icon={<Icon name='notifications' color='#36C899' size={33} iconStyle={{ marginRight: 5, marginLeft: 5, paddingTop: 3 }} />}
        onPress={() => navigation.navigate('NotificationSettings')} />
      <Button title="Saved Messages" containerStyle={{ width: '90%', marginBottom: 10 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 43,
        justifyContent: 'flex-start' }} titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18 }} icon={<Icon name='save' color='#36C899' size={33} iconStyle={{ marginRight: 5, marginLeft: 5, paddingTop: 3 }} />}
        onPress={() => navigation.navigate('SavedMessages')} />
      <Button title="Account Settings" containerStyle={{ width: '90%', marginBottom: 60 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 43,
        justifyContent: 'flex-start' }} titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18 }} icon={<Icon name='storage' color='#36C899' size={33} iconStyle={{ marginRight: 5, marginLeft: 5, paddingTop: 3 }} />}
        onPress={() => navigation.navigate('AccountSettings')} />
    </View>
  );
}

export default Settings;