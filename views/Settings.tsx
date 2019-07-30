import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import AppHeader from '../components/AppHeader';
import { Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux'
import LoadingView from './LoadingView';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DELETE_USER } from '../redux/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';

const Settings: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(store => store.user);
  const server = require('../config.json').server

  const dispatch = useDispatch()

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
      <AppHeader title='Settings' color='#FFF' shadow/>
      {loading && <LoadingView />}
      <TouchableOpacity style={{ backgroundColor: 'transparent', marginTop: 3, width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      onPress={() => navigation.navigate('Profile')}>
        <Image 
          source={require('../assets/icon.png')} 
          style={{
            width: 75, height: 75, margin: 20, marginLeft: 10, marginRight: 10, borderRadius: 1000
        }}/>
        <View style={{ backgroundColor: 'transparent', width: '65%', marginBottom: '4%' }}>
          <Text style={{ fontFamily: 'Lato Bold', padding: 0, fontSize: 22 }} >{user.name}</Text>
          <Text style={{ fontFamily: 'Lato Light', paddingTop: 2, fontSize: 13 }} >Available</Text>
        </View>
        <Icon name='chevron-right' color='#36C899' size={40} iconStyle={{ right: 0 }} />
      </TouchableOpacity>
      
      <Button title="Saved Messages" containerStyle={{ width: '90%', marginBottom: 50 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 48,
        justifyContent: 'flex-start' }} titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18, paddingLeft: 10 }} icon={<LinearGradient 
          colors={['#2BBEE3', '#2B90E3']} style={{ width: 38, height: 38, borderRadius: 12,
          alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}><Icon name='tag' color='#FFF' size={30} 
          iconStyle={{ marginRight: 5, marginLeft: 5, paddingTop: 5 }} /></LinearGradient>} onPress={() => navigation.navigate('SavedMessages')} />

      <Button title="Dark Mode" containerStyle={{ width: '90%', marginBottom: 10 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 48,
        justifyContent: 'flex-start' }} titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18, paddingLeft: 10 }} icon={<LinearGradient 
          colors={['#060654', '#020235']} style={{ width: 38, height: 38, borderRadius: 12,
          alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}><Icon name='weather-night' color='#FFF' size={30} 
          iconStyle={{ marginRight: 5, marginLeft: 5, paddingTop: 5 }} /></LinearGradient>} 
        onPress={() => console.log('toggle dark mode')} />

      <Button title="Background Color" containerStyle={{ width: '90%', marginBottom: 50 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 48,
        justifyContent: 'flex-start' }} titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18, paddingLeft: 10 }} icon={<LinearGradient 
          colors={['#db9832', '#db6d07']} style={{ width: 38, height: 38, borderRadius: 12,
          alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}><Icon name='brush' color='#FFF' size={30} 
          iconStyle={{ marginRight: 5, marginLeft: 5, paddingTop: 5 }} /></LinearGradient>}
        onPress={() => navigation.navigate('BackgroundPick')} />
        
      <Button title="Blocked Users" containerStyle={{ width: '90%', marginBottom: 10 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 48,
        justifyContent: 'flex-start' }} titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18, paddingLeft: 10 }} icon={<LinearGradient 
          colors={['#3dd973', '#0cc74d']} style={{ width: 38, height: 38, borderRadius: 12,
          alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}><Icon name='account-off' color='#FFF' size={30} 
          iconStyle={{ marginRight: 5, marginLeft: 5, paddingTop: 5 }} /></LinearGradient>}
        onPress={() => navigation.navigate('BlockedView')} />
        
      <Button title="Log out" containerStyle={{ width: '90%', marginBottom: 10 }} buttonStyle={{ backgroundColor: '#FFF', borderRadius: 16, height: 48,
        justifyContent: 'flex-start' }} titleStyle={{ fontFamily: 'Lato', color: 'black', fontSize: 18, paddingLeft: 10 }} icon={<LinearGradient 
        colors={['#E65039', '#e62222']} style={{ width: 38, height: 38, borderRadius: 12,
        alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}><Icon name='power-standby' color='#FFF' size={30} 
        iconStyle={{ marginRight: 5, marginLeft: 5, paddingTop: 5 }} /></LinearGradient>}
        onPress={() => logout()} />
    </View>
  );
}

export default Settings;