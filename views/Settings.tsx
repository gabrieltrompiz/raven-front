import React, { useState } from 'react'
import { View, Text, TouchableOpacity, AsyncStorage, Animated, ActivityIndicator } from 'react-native'
import AppHeader from '../components/AppHeader';
import { Button, Image } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux'
import LoadingView from './LoadingView';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DELETE_USER, SET_DARK } from '../redux/actionTypes';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

const Settings: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const status = useSelector(state => state.status);
  const user = useSelector(state => state.user);
  const uri = useSelector(state => state.uri)
  const server = require('../config.json').server
  const dark = useSelector(state => state.dark)
  const progress = useState(new Animated.Value(dark ? 0.35 : 0.25))[0]

  const dispatch = useDispatch()

  const logout = async () => {
    setLoading(true)
    await fetch(server + 'logout', { credentials: 'include' } )
    .then(response => response.json())
    .then(async (response) => {
      console.log(response)
      if(response.status === 200) {
        setTimeout(async () => {
          setLoading(false)
          await AsyncStorage.multiRemove(['RAVEN-USER', 'RAVEN-CHATS', 'RAVEN-TIMELINE', 'RAVEN-DARK'])
          await SecureStore.deleteItemAsync('RAVEN-PWD')
          navigation.dangerouslyGetParent().dangerouslyGetParent().navigate('LoginView')
          dispatch({ type: DELETE_USER })
        }, 500)
      }
    })
  }

  const toggleDarkMode = async () => {
    if(dark) {
      Animated.timing(progress, { toValue: 0.25, duration: 1000 }).start(async () => {
        dispatch({ type: SET_DARK, payload: { dark: false } })
        await AsyncStorage.setItem('RAVEN-DARK', JSON.stringify(false))
      })
    } else {
      Animated.timing(progress, { toValue: 0.35, duration: 1000 }).start(async () => {
        dispatch({ type: SET_DARK, payload: { dark: true } })
        await AsyncStorage.setItem('RAVEN-DARK', JSON.stringify(true))
      })
    }
  }

  console.log(user.pictureUrl)

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center' }}>
      <AppHeader title='Settings' color='#FFF' shadow/>
      {loading && <LoadingView />}
      <TouchableOpacity style={{ backgroundColor: 'transparent', marginTop: 3, width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      onPress={() => navigation.navigate('Profile')}>
        <Image
          source={{ uri: server + 'picture/' + uri }} 
          style={{ width: 80, height: 80, margin: 20, marginLeft: 10, marginRight: 10, borderRadius: 40 }}
          PlaceholderContent={<ActivityIndicator />} />
        <View style={{ backgroundColor: 'transparent', width: '65%', marginBottom: '4%' }}>
          <Text style={{ fontFamily: 'Lato Bold', padding: 0, fontSize: 22 }} >{user.name}</Text>
          <Text style={{ fontFamily: 'Lato Light', paddingTop: 2, fontSize: 13 }} >{status ? status : 'Available'}</Text>
        </View>
        <Icon name='chevron-right' color='#36C899' size={40} iconStyle={{ right: 0 }} />
      </TouchableOpacity>

      <TouchableOpacity style={{ width: '100%', backgroundColor: '#FFF', height: 48, flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}
        onPress={() => navigation.navigate('SavedMessages')}>
        <LinearGradient colors={['#2BBEE3', '#2B90E3']} style={{ width: 30, height: 30, borderRadius: 12, marginLeft: 10, marginRight: 10,
        alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}>
          <Icon name='tag' color='#FFF' size={15}/>
        </LinearGradient>
        <Text style={{ fontFamily: 'Lato', fontSize: 16 }}>Saved Messages</Text>
        <View style={{ position: 'absolute', right: 10 }}><Icon name='chevron-right' color='#AAA' size={20}/></View>
      </TouchableOpacity>

      <TouchableOpacity style={{ width: '100%', backgroundColor: '#FFF', height: 48, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}
        onPress={() => toggleDarkMode()}>
        <LinearGradient colors={['#060654', '#020235']} style={{ width: 30, height: 30, borderRadius: 12, marginLeft: 10, marginRight: 10,
        alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}>
          <Icon name='weather-night' color='#FFF' size={15}/>
        </LinearGradient>
        <Text style={{ fontFamily: 'Lato', fontSize: 16 }}>Dark Mode</Text>
        <LottieView source={require('../assets/toggle.json')} progress={progress} style={{ width: 80, height: 80, position: 'absolute', right: 0 }}/>
      </TouchableOpacity>

      <TouchableOpacity style={{ width: '100%', backgroundColor: '#FFF', height: 48, flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}
        onPress={() => navigation.navigate('BackgroundPick')}>
        <LinearGradient colors={['#db9832', '#db6d07']} style={{ width: 30, height: 30, borderRadius: 12, marginLeft: 10, marginRight: 10,
        alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}>
          <Icon name='brush' color='#FFF' size={15}/>
        </LinearGradient>
        <Text style={{ fontFamily: 'Lato', fontSize: 16 }}>Background Color</Text>
        <View style={{ position: 'absolute', right: 10 }}><Icon name='chevron-right' color='#AAA' size={20}/></View>
      </TouchableOpacity>

      <TouchableOpacity style={{ width: '100%', backgroundColor: '#FFF', height: 48, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}
        onPress={() => navigation.navigate('BlockedView')}>
        <LinearGradient colors={['#3dd973', '#0cc74d']} style={{ width: 30, height: 30, borderRadius: 12, marginLeft: 10, marginRight: 10,
        alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}>
          <Icon name='account-off' color='#FFF' size={15}/>
        </LinearGradient>
        <Text style={{ fontFamily: 'Lato', fontSize: 16 }}>Blocked Users</Text>
        <View style={{ position: 'absolute', right: 10 }}><Icon name='chevron-right' color='#AAA' size={20}/></View>
      </TouchableOpacity>
      
      <TouchableOpacity style={{ width: '100%', backgroundColor: '#FFF', height: 48, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}
        onPress={() => logout()}>
        <LinearGradient colors={['#E65039', '#e62222']} style={{ width: 30, height: 30, borderRadius: 12, marginLeft: 10, marginRight: 10,
        alignItems: 'center', justifyContent: 'center' }} start={[1, 1]}>
          <Icon name='power-standby' color='#FFF' size={15}/>
        </LinearGradient>
        <Text style={{ fontFamily: 'Lato', fontSize: 16 }}>Log Out</Text>
        <View style={{ position: 'absolute', right: 10 }}><Icon name='chevron-right' color='#AAA' size={20}/></View>
      </TouchableOpacity>

    </View>
  );
}

export default Settings;