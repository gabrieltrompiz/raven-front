import React, { useState, useEffect } from 'react'
import { View, Image, TextInput, Text, Animated } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import AppHeader from '../components/AppHeader';
import { Button, Input, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as EmailValidator from 'email-validator';
import { useAnimation } from '../hooks/useAnimation'
import useGlobal from '../hooks/useGlobal'
import { animationFrameScheduler } from 'rxjs';

const LoginView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const config = require('../config.json')

  const [globalState, globalActions] = useGlobal()
  const [email, setEmail] = useState('gab.trompizcianci@gmail.com')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)

  const checkEmail = async () => {
    if(EmailValidator.validate(email)) {
      await fetch(config.server + 'session/email?email=' + encodeURI(email))
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if(response.status === 200) { // if email is registered
          //goto register
        }
        else if(response.status === 202) { 
    
        }
        else {
        }
      }).catch(err => {
        console.log(err)
      })
    }
    else {
      setEmailError(true)
    }
  } 

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center' }}>
      <AppHeader shadow color='#FFF' title=''
      leftComponent={
        <Button icon={{ name: 'chevron-left', color: '#36C899' }} onPress={() => navigation.goBack()} title='Get Started' buttonStyle={{ backgroundColor: 'transparent', width: 100 }}
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />
      } />
      <Image 
        source={require('../assets/raven.png')} 
        style={{
          width: 100, height: 100, overflow: 'visible', marginTop: 100
        }}/>
      <Input 
        placeholder='Email'
        leftIcon={<Icon name='email' color='#36C899' size={24} iconStyle={{ right: 10 }} />}
        containerStyle={{ marginTop: 40, width: '80%', backgroundColor: '#FFF', height: 50, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: emailError ? 'red' : '#36C899' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{ fontFamily: 'Lato Bold' }}
        autoCapitalize='none'
        onChange={(event) => { setEmailError(false); setEmail(event.nativeEvent.text) }}
        value={email}
        spellCheck={false}        
      />
      <Input 
        placeholder='Password'
        leftIcon={<Icon name='lock' color='#36C899' size={24} iconStyle={{ right: 10 }} />}
        containerStyle={{ marginTop: 10, width: '80%', backgroundColor: '#FFF', height: 50, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: emailError ? 'red' : '#36C899' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{ fontFamily: 'Lato Bold' }}
        autoCapitalize='none'
        onChange={(event) => { setPassword(event.nativeEvent.text) }}
        value={password}
        spellCheck={false}  
        secureTextEntry    
      />
      <Text style={{ color: 'red', fontFamily: 'Lato Bold', top: 5 }}>{emailError ? 'Invalid email. Please check your input.' : ''}</Text>
      <LinearGradient colors={['#33CA9B', '#4FC77F']} style={{ width: '80%', height: 50, marginTop: 0, borderRadius: 10,
        alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
        <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
          titleStyle={{ fontFamily: 'Lato Black' }} title="Login" onPress={() => checkEmail()}/>
      </LinearGradient>
      <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <View style={{ width: '40%', height: 2, backgroundColor: '#E0E0E0' }}/>
        <Text style={{ fontFamily: 'Lato Bold', padding: 10, fontSize: 20 }}>OR</Text>
        <View style={{ width: '40%', height: 2, backgroundColor: '#E0E0E0' }}/>
      </View>
      <LinearGradient colors={['#4FC77F', '#33CA9B']} style={{ width: '80%', height: 50, marginTop: 15, borderRadius: 10,
        alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
        <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
          titleStyle={{ fontFamily: 'Lato Black', fontSize: 18 }} title="Sign up" onPress={() => navigation.navigate('RegisterView')}/>
      </LinearGradient>
    </View>
  );
} 

export default LoginView;