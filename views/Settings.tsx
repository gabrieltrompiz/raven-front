import React, { useState } from 'react'
import { View, Text, AsyncStorage, Image, TouchableOpacity } from 'react-native'
import AppHeader from '../components/AppHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Icon } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import LoadingView from './LoadingView';
import * as SecureStore from 'expo-secure-store'
import { useDispatch } from 'react-redux'
import { DELETE_USER } from '../redux/actionTypes'

const Settings: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const server = require('../config.json').server

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const logout = async () => {
    setLoading(true)
    await fetch(server + 'logout', { credentials: 'include' } )
    .then(response => response.json())
    .then(async (response) => {
      console.log(response)
      if(response.status === 200) {
        console.log(response)
        setTimeout(async () => {
          setLoading(false)
          await AsyncStorage.removeItem('RAVEN-USER')
          await SecureStore.deleteItemAsync('RAVEN-PWD')
          navigation.dangerouslyGetParent().dangerouslyGetParent().navigate('LoginView')
          dispatch({ type: DELETE_USER })
        }, 500)
      }
    })
  }
    
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center' }}>
      {loading && <LoadingView />}
      <AppHeader title='Settings' color='#FFF' shadow/>
      <TouchableOpacity style={{ backgroundColor: 'transparent', marginTop: 3, width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      onPress={() => navigation.navigate('Profile')}>
        <Image 
          source={require('../assets/icon.png')} 
          style={{
            width: 75, height: 75, margin: 20, marginLeft: 10, marginRight: 10, borderRadius: 1000
        }}/>
        <View style={{ backgroundColor: 'transparent', width: '35%', marginRight: '20%', marginBottom: '4%' }}>
          <Text style={{ fontFamily: 'Lato Bold', padding: 0, fontSize: 22 }} >John Doe</Text>
          <Text style={{ fontFamily: 'Lato Light', paddingTop: 2, fontSize: 13 }} >Available</Text>
        </View>
        <Icon name='chevron-right' color='#36C899' size={40} iconStyle={{ right: 0 }} />
      </TouchableOpacity>
      
      <Button title="Chats" containerStyle={{ width: '90%', marginBottom: 10 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 43 }}
        titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18 }} icon={<Icon name='details' color='#36C899' size={35} />} 
        onPress={() => navigation.navigate('ChatSettings')} />
      <Button title="Notifications" containerStyle={{ width: '90%', marginBottom: 10 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 43 }}
        titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18 }} icon={<Icon name='details' color='#36C899' size={35} />}
        onPress={() => navigation.navigate('NotificationSettings')} />
      <Button title="Saved Messages" containerStyle={{ width: '90%', marginBottom: 10 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 43 }}
        titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18 }} icon={<Icon name='details' color='#36C899' size={35} />}
        onPress={() => navigation.navigate('SavedMessages')} />
      <Button title="Account" containerStyle={{ width: '90%', marginBottom: 60 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 43 }}
        titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18 }} icon={<Icon name='details' color='#36C899' size={35} />}
        onPress={() => navigation.navigate('AccountSettings')} />

      <LinearGradient colors={['#E65039', '#E63939']} style={{ width: '80%', height: 50, marginTop: 15, borderRadius: 10,
          alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
          <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
            titleStyle={{ fontFamily: 'Lato Black', fontSize: 18 }} title="Logout" onPress={() => logout()} disabled={loading}/>
        </LinearGradient>
    </View>
  );
}

export default Settings;