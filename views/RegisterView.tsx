import React, { useRef, useState } from 'react'
import { View, Animated, Text } from 'react-native'
import LottieView from 'lottie-react-native'
import { NavigationContainerProps } from 'react-navigation';
import AppHeader from '../components/AppHeader';
import { Button, Input, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as EmailValidator from 'email-validator'

const RegisterView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const progress = new Animated.Value(0.2)
  const server = require('../config.json').server

  const sendCode = async () => {
    if(!EmailValidator.validate(email)) {
      setEmailError('Invalid email address. Please verify your input.')
    } else {
      await fetch(server + 'session/checkEmail?email=' + email)
      .then(response => response.json())
      .then(response => {
        if(response.status === 200) {
          fetch(server + 'session/sendCode', { method: 'POST', body: JSON.stringify({ email: email }), headers: { "Content-Type": "application/json; charset=utf-8" }})
          .then(response => response.json())
          .then(response => {
            if(response.status === 200) {
              Animated.timing(progress, { toValue: 0.8, duration: 3000 }).start()
            } else {
              console.log(response.message)
              setEmailError('Could not send verification email. Please verify your internet connection.')
            }
          })
        } else {
          setEmailError('Email already in use. Please enter another email.')
        }
      })
      .catch(err => {
        setEmailError('Error checking email. Please verify your internet connection.')
        console.log(err)
      })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center' }}>
      <AppHeader shadow color='#FFF' title=''
      leftComponent={
        <Button icon={{ name: 'chevron-left', color: '#36C899' }} onPress={() => navigation.goBack()} title='Login' buttonStyle={{ backgroundColor: 'transparent', width: 60 }}
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 60 }} style={{ width: 60 }} />
      } />
      {/* <Animated.View style={{  }}> */}
        <LottieView source={require('../assets/send-animation.json')} style={{ width: 200, height: 200, marginTop: -5 }} progress={progress}/>
      {/* </Animated.View> */}
      <Text style={{ fontFamily: 'Lato Bold', fontSize: 20, textAlign: 'center', marginTop: -30 }}>
        Please enter your email to continue{'\n'}with your register. We will send you{'\n'}a verification code.
      </Text>
      <Input 
        placeholder='Email'
        leftIcon={<Icon name='email' color='#36C899' size={24} iconStyle={{ right: 10 }} />}
        containerStyle={{ marginTop: 30, width: '80%', backgroundColor: '#FFF', height: 50, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: emailError ? 'red' : '#36C899' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{ fontFamily: 'Lato Bold' }}
        autoCapitalize='none'
        onChange={(event) => { setEmailError(''); setEmail(event.nativeEvent.text) }}
        value={email}
        spellCheck={false} 
        autoFocus blurOnSubmit={false} 
      />
      <Text style={{ color: 'red', fontFamily: 'Lato Bold', top: 5, textAlign: 'center' }}>{emailError}</Text>
      <LinearGradient colors={['#4FC77F', '#33CA9B']} style={{ width: '80%', height: 50, marginTop: 15, borderRadius: 10,
        alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
        <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
          titleStyle={{ fontFamily: 'Lato Black', fontSize: 18 }} title="Sign up" onPress={() => sendCode()}/>
      </LinearGradient>
    </View>
  );
}

export default RegisterView;