import React, { useState } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import LoadingView from './LoadingView';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store'
import { DELETE_USER } from '../redux/actionTypes'

const AccountSettings: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const server = require('../config.json').server

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
      <AppHeader title='Account Settings' color='#FFF' shadow leftComponent={<Button buttonStyle={{ borderRadius: 100, backgroundColor: 'transparent' }} 
        containerStyle={{ borderRadius: 100 }} icon={<Icon name='arrow-back' color='black' size={30} iconStyle={{ paddingTop: 6 }} />} onPress={() => navigation.goBack()} />} />
      {loading && <LoadingView />}

      <LinearGradient colors={['#E65039', '#E63939']} style={{ width: '80%', height: 50, marginTop: 15, borderRadius: 10,
          alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
          <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
            titleStyle={{ fontFamily: 'Lato Black', fontSize: 18 }} title="Logout" onPress={() => logout()} disabled={loading}/>
      </LinearGradient>
    </View>
  );
}

export default AccountSettings;