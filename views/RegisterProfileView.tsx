import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AppHeader from '../components/AppHeader';
import { Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'
import LoadingView from './LoadingView'
import useGlobal from '../hooks/useGlobal'

interface RPProps {
  token?: string;
  email?: string;
  navigation?: any;
}

const RegisterProfileView: React.FC<RPProps> = ({ token, email, navigation }) => {
  const [globalState, globalActions] = useGlobal()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorUsername, setErrorUsername] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const _token = token ? token : navigation.getParam('token', '');
  const _email = email ? email : navigation.getParam('email', '');
  
  console.log(_token + ":" + _email)

  const server = require('../config.json').server

  const register = async () => {
    if(name.trim() === '') { setErrorName('Please enter your name.') }
    else if(phone.trim() === '') { setErrorPhone('Please enter a valid phone number.') }
    else if(password.trim() === '') { setErrorPassword('Please enter a valid password.') }
    else if(username.trim() === '') { setErrorUsername('Please enter a valid username.') }
    else {
      const body = {
        email: _email,
        password: password,
        phone: phone,
        name: name,
        token: _token,
        username: username
      }
      await fetch(server + "register", { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .then(response => response.json())
      .then(response => {
        if(response.status === 200) {
          const user = response.data
          globalActions.setUser(user)
        }
        else {
          console.log(response.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      {loading && <LoadingView />}
      <AppHeader shadow color='#FFF' title='Profile' />
      <View style={{ flexDirection: 'row', top: 25, left: 25, alignItems: 'center' }}>
        <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: '#ECECEC' }} />
        <Text style={{ width: 200, fontSize: 16, fontFamily: 'Lato Bold', textAlign: 'center' }}>
          Enter your name and add an optional profile picture.
        </Text>
      </View> 
      <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#AAAAAA', marginTop: 40, marginLeft: 5 }}>NAME</Text> 
      <Input 
        placeholder='Name'
        containerStyle={{ marginTop: 5, width: '100%', backgroundColor: '#F8F9FB', height: 50, justifyContent: 'center', borderWidth: 0.5, borderColor: '#DADADA' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{ fontFamily: 'Lato Bold' }}
        autoCapitalize='words'
        onChange={(event) => { setErrorName(''); setName(event.nativeEvent.text); }}
        value={name} editable={!disabled}
        spellCheck={false} 
      />  
      <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#AAAAAA', marginTop: 20, marginLeft: 5 }}>PHONE NUMBER</Text> 
      <Input 
        placeholder='Phone Number' keyboardType='phone-pad'
        containerStyle={{ marginTop: 5, width: '100%', backgroundColor: '#F8F9FB', height: 50, justifyContent: 'center', borderWidth: 0.5, borderColor: '#DADADA' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{ fontFamily: 'Lato Bold' }}
        onChange={(event) => { setPhone(event.nativeEvent.text); }}
        value={phone} editable={!disabled}
        spellCheck={false} 
      />
      <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#AAAAAA', marginTop: 20, marginLeft: 5 }}>USERNAME</Text> 
      <Input 
        placeholder='Username'
        containerStyle={{ marginTop: 5, width: '100%', backgroundColor: '#F8F9FB', height: 50, justifyContent: 'center', borderWidth: 0.5, borderColor: '#DADADA' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{ fontFamily: 'Lato Bold' }}
        onChange={(event) => { setUsername(event.nativeEvent.text); }}
        value={username} editable={!disabled}
        spellCheck={false} autoCapitalize='none'
      />  
      <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#AAAAAA', marginTop: 20, marginLeft: 5 }}>PASSWORD</Text> 
      <Input 
        placeholder='Password' secureTextEntry
        containerStyle={{ marginTop: 5, width: '100%', backgroundColor: '#F8F9FB', height: 50, justifyContent: 'center', borderWidth: 0.5, borderColor: '#DADADA' }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        inputStyle={{ fontFamily: 'Lato Bold' }}
        onChange={(event) => { setPassword(event.nativeEvent.text); }}
        value={password} editable={!disabled}
        spellCheck={false} 
      />
      <LinearGradient colors={['#4FC77F', '#33CA9B']} style={{ width: '80%', height: 50, marginTop: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }} 
        start={[0, 0]}>
        <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
          titleStyle={{ fontFamily: 'Lato Black', fontSize: 18 }} title="Register" onPress={() => register()} disabled={disabled}/>
      </LinearGradient>   
    </View>
  );
}

export default RegisterProfileView;