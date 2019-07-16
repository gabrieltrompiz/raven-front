import React, { useRef, useState, useEffect } from 'react'
import { View, Animated, Text, NativeSyntheticEvent, TextInputChangeEventData, AsyncStorage } from 'react-native'
import LottieView from 'lottie-react-native'
import { NavigationContainerProps } from 'react-navigation';
import AppHeader from '../components/AppHeader';
import { Button, Input, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as EmailValidator from 'email-validator'
import LoadingView from './LoadingView';

const CodeVerificationView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [showingEmail, setShowingEmail] = useState(true)
  const [showingCode, setShowingCode] = useState(false)
  const [code, setCode] = useState('******')
  const [codeError, setCodeError] = useState('')

  const progress = useState(new Animated.Value(0.20))[0]
  const opacity = useState(new Animated.Value(1))[0]
  const inversedOpacity = useState(new Animated.Value(0))[0]
  
  const server = require('../config.json').server

  const refs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

  const sendCode = async () => {
    if(!EmailValidator.validate(email)) {
      setEmailError('Invalid email address. Please verify your input.')
    } else {
      setLoading(true)
      setDisabled(true)
      await fetch(server + 'checkEmail?email=' + email)
      .then(response => response.json())
      .then(response => {
        if(response.status === 200) {
          fetch(server + 'sendCode', { method: 'POST', body: JSON.stringify({ email: email }), headers: { "Content-Type": "application/json; charset=utf-8" }})
          .then(response => response.json())
          .then(response => {
            if(response.status === 200) {
              setLoading(false)
              Animated.timing(progress, { toValue: 0.6, duration: 3000 }).start()
              Animated.timing(opacity, { toValue: 0, duration: 500, delay: 2000 }).start(() => { setShowingEmail(false); setShowingCode(true) })
              Animated.timing(inversedOpacity, { toValue: 1, duration: 500, delay: 3000 }).start()
            } else {
              setLoading(false)
              setDisabled(false)
              setEmailError('Could not send verification email. Please verify your internet connection.')
            }
          })
        } else {
          setLoading(false)
          setDisabled(false)
          setEmailError('Email already in use. Please enter another email.')
        }
      })
      .catch(err => {
        setLoading(false)
        setDisabled(false)
        setEmailError('Error checking email. Please verify your internet connection.')
      })
    }
  }

  const onChange = async (event: NativeSyntheticEvent<TextInputChangeEventData>, i: number) => {
    if(event.nativeEvent.text === '') { event.nativeEvent.text = "*" }
    const fullCode = code.slice(0, i) + event.nativeEvent.text + code.slice(i + 1, 6)
    setCode(fullCode)
    if(event.nativeEvent.text === '*' && i > 0) { refs[i - 1].current.focus() }
    else if(i < 5) { refs[i + 1].current.focus() } 
    else if(i === 5 && !fullCode.includes('*')) {     
      setLoading(true)
      await fetch(server + 'checkCode?email=' + email + "&code=" + fullCode)
      .then(response => response.json())
      .then(response => {
        if(response.status === 200) {
          setTimeout(() => setLoading(false), 500)
          AsyncStorage.setItem('RAVEN-TOKEN', response.token)
          AsyncStorage.setItem('RAVEN-TOKEN-EMAIL', email)
          navigation.navigate('RegisterView', { token: response.token, email: email })
        } else {
          setTimeout(() => { 
            setLoading(false)
            setCodeError('Invalid code. Please try again.')
          }, 500)
        }
      })
      .catch(err => {
        setTimeout(() => { 
          setLoading(false) 
          setCodeError('Error verifying code. Please check your internet connection.')
        }, 500)
      })
     }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center' }}>
      {loading && <LoadingView />}
      <AppHeader shadow color='#FFF' title=''
      leftComponent={
        <Button icon={{ name: 'chevron-left', color: '#36C899' }} onPress={() => navigation.goBack()} title='Login' buttonStyle={{ backgroundColor: 'transparent', width: 60 }}
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 60 }} style={{ width: 60 }} />
      } />
      <LottieView source={require('../assets/send-animation.json')} style={{ width: 200, height: 200, marginTop: -5 }} progress={progress}/>
      {showingEmail && 
      <Animated.View style={{ opacity: opacity, width: '100%', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Lato Bold', fontSize: 20, textAlign: 'center', marginTop: -30 }}>
          Please enter your email address to continue{'\n'}with your register. We will send you{'\n'}a verification code.
        </Text>
        <Input 
          placeholder='Email' keyboardType='email-address'
          leftIcon={<Icon name='email' color='#36C899' size={24} iconStyle={{ right: 10 }} />}
          containerStyle={{ marginTop: 30, width: '80%', backgroundColor: '#FFF', height: 50, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: emailError ? 'red' : '#36C899' }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ fontFamily: 'Lato Bold' }}
          autoCapitalize='none'
          onChange={(event) => { setEmailError(''); setEmail(event.nativeEvent.text); }}
          value={email} editable={!disabled}
          spellCheck={false} onSubmitEditing={() => sendCode()} 
        />
        <Text style={{ color: 'red', fontFamily: 'Lato Bold', top: 5, textAlign: 'center' }}>{emailError}</Text>
        <LinearGradient colors={['#4FC77F', '#33CA9B']} style={{ width: '80%', height: 50, marginTop: 15, borderRadius: 10,
          alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
          <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
            titleStyle={{ fontFamily: 'Lato Black', fontSize: 18 }} title="Send code" onPress={() => sendCode()} disabled={disabled}/>
        </LinearGradient>
      </Animated.View>}
      {showingCode && 
      <Animated.View style={{ opacity: inversedOpacity, width: '100%', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Lato Bold', fontSize: 20, textAlign: 'center', marginTop: -30 }}>
          {'Please enter the code we sent you to \n'}
          <Text style={{ fontFamily: 'Lato Bold', fontSize: 20, textAlign: 'center', color: '#36C899' }}>{email}</Text>
          {' to verify your email.'}
        </Text>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            return (
              <Input keyboardType='number-pad' autoFocus={i === 0} 
              containerStyle={{ marginTop: 30, width: 50, height: 60, backgroundColor: '#FFF', justifyContent: 'center', borderRadius: 10, borderWidth: 0.5, borderColor: '#DCDEF4',
              shadowColor: '#DCDEF4', shadowOpacity: 0.3, shadowOffset: { height: 0, width: 0 }, shadowRadius: 3 }}
              inputContainerStyle={{ borderBottomWidth: 0 }} ref={refs[i]} maxLength={1}
              inputStyle={{ fontFamily: 'Lato Bold', textAlign: 'center', fontSize: 25 }} key={i}
              onChange={(event) => onChange(event, i)}/>
            );
          })}
        </View>
        <Text style={{ color: 'red', fontFamily: 'Lato Bold', top: 5, textAlign: 'center' }}>{codeError}</Text>
      </Animated.View>}
    </View>
  );
}

export default CodeVerificationView;