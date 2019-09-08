import React, { useState, useEffect } from 'react'
import { View, Image, TextInput, Text, Animated, AsyncStorage, Keyboard, KeyboardAvoidingView } from 'react-native'
import { NavigationContainerProps, ScrollView } from 'react-navigation';
import AppHeader from '../components/AppHeader';
import { Button, Input, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as EmailValidator from 'email-validator';
import LoadingView from './LoadingView';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux'
import { SET_USER } from '../redux/actionTypes'

const LoginView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const server = require('../config.json').server

  const login = async () => {
    Keyboard.dismiss()
    setLoading(true);
    const body = {
      email: email,
      password: password
    };
    await fetch(server + 'login', { body: JSON.stringify(body), method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, credentials: 'include' })
      .then(response => response.json())
      .then(async (response) => {
        setLoading(false);
        console.log(response)
        if(response.status === 200) {     
          const user = response.user
          await AsyncStorage.setItem('RAVEN-USER', JSON.stringify(user))
          await SecureStore.setItemAsync('RAVEN-PWD', password, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY })
          navigation.navigate('App')
          dispatch({ type: SET_USER, payload: { user: user } })
        } else {
          setLoading(false)
          setLoginError('Wrong credentials. Email or password incorrect.');
        }
      }).catch(err => {
        setLoading(false);
        setLoginError('Error trying to login. Check your internet connection.')
      })
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F8F9FB' }} enabled behavior='padding'>
      {loading && <LoadingView />}
      <AppHeader shadow color='#FFF' title=''
      leftComponent={
        <Button icon={{ name: 'chevron-left', color: '#36C899' }} onPress={() => navigation.goBack()} title='Get Started' buttonStyle={{ backgroundColor: 'transparent', width: 100 }}
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />
      } />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <Image 
          source={require('../assets/raven.png')} 
          style={{
            width: 100, height: 100, overflow: 'visible', marginTop: 100
          }}/>
        <Input 
          placeholder='Email' keyboardType='email-address'
          leftIcon={<Icon name='email' color='#36C899' size={24} iconStyle={{ right: 10 }} />}
          containerStyle={{ marginTop: 40, width: '80%', backgroundColor: '#FFF', height: 50, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#36C899' }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ fontFamily: 'Lato Bold' }}
          autoCapitalize='none'
          onChange={(event) => { setEmail(event.nativeEvent.text); setLoginError(''); }}
          value={email}
          spellCheck={false}
        />
        <Input 
          placeholder='Password'
          leftIcon={<Icon name='lock' color='#36C899' size={24} iconStyle={{ right: 10 }} />}
          containerStyle={{ marginTop: 10, width: '80%', backgroundColor: '#FFF', height: 50, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#36C899' }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ fontFamily: 'Lato Bold' }}
          autoCapitalize='none'
          onChange={(event) => { setPassword(event.nativeEvent.text) }}
          value={password}
          spellCheck={false}  
          secureTextEntry    
        />
        <LinearGradient colors={['#33CA9B', '#4FC77F']} style={{ width: '80%', height: 50, marginTop: 10, borderRadius: 10,
          alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
          <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
            titleStyle={{ fontFamily: 'Lato Black' }} title="Login" onPress={() => login()}/>
        </LinearGradient>
        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
          <View style={{ width: '40%', height: 2, backgroundColor: '#E0E0E0' }}/>
          <Text style={{ fontFamily: 'Lato Bold', padding: 10, fontSize: 20 }}>OR</Text>
          <View style={{ width: '40%', height: 2, backgroundColor: '#E0E0E0' }}/>
        </View>
        <LinearGradient colors={['#4FC77F', '#33CA9B']} style={{ width: '80%', height: 50, marginTop: 15, borderRadius: 10, marginBottom: 10,
          alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
          <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
            titleStyle={{ fontFamily: 'Lato Black', fontSize: 18 }} title="Sign up" onPress={() => navigation.navigate('CodeVerificationView')}/>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
} 

export default LoginView;