import React, { useState } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import AppHeader from '../components/AppHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
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
      <LinearGradient colors={['#E65039', '#E63939']} style={{ width: '80%', height: 50, marginTop: 15, borderRadius: 10,
          alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
          <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
            titleStyle={{ fontFamily: 'Lato Black', fontSize: 18 }} title="Logout" onPress={() => logout()} disabled={loading}/>
        </LinearGradient>
    </View>
  );
}

export default Settings;