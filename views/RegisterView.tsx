import React, { useState } from 'react';
import { View, Text, Keyboard, AsyncStorage, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';
import { Input, Button, Image } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'
import LoadingView from './LoadingView'
import { NavigationContainerProps, ScrollView } from 'react-navigation';
import * as SecureStore from 'expo-secure-store'
import { useDispatch } from 'react-redux'
import { SET_USER, SET_STATUS, SET_STATUS_LIST, SET_PIC } from '../redux/actionTypes'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const RegisterView: React.FC<NavigationContainerProps> = ({ navigation, screenProps }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [_password, setPasswordConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorUsername, setErrorUsername] = useState('')
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [base64, setBase64] = useState('')
  const [uri, setUri] = useState('');
  const _token = screenProps.token ? screenProps.token : navigation.getParam('token', null)
  const _email = screenProps.email ? screenProps.email : navigation.getParam('email', null)

  const server = require('../config.json').server

  const uploadPicture = () => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      if(base64.trim() !== '') {
        const picBody = {
          oldUri: '',
          uri: uri,
          base64: base64,
        }
        await fetch(server + 'picture', { method: 'POST', body: JSON.stringify(picBody), headers: { "Content-Type": "application/json; charset=utf-8" } })
        .then(res => res.json()).then(async res => {
          if(res.status === 200) {
            console.log('Image Uploaded')
            resolve()
          } else {
            reject('error')
          }
        }).catch(reject);
        setLoading(false);
      } else {
        resolve()
      }
    })
  }

  const register = async () => {
    const body = {
      email: _email,
      password: password,
      name: name,
      token: _token,
      username: username,
      pictureUrl: uri
    }
    await fetch(server + "register", { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json; charset=utf-8' } })
      .then(resp => resp.json()).then(async resp => {
        if(resp.status === 200) {
          const user = resp.user;
          await AsyncStorage.removeItem('RAVEN-TOKEN')
          await AsyncStorage.removeItem('RAVEN-TOKEN-EMAIL')
          await AsyncStorage.setItem('RAVEN-USER', JSON.stringify(user))
          await SecureStore.setItemAsync('RAVEN-PWD', password, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY })
          setLoading(false)
          dispatch({ type: SET_USER, payload: { user } })
          dispatch({ type: SET_PIC, payload: { uri } })
          dispatch({ type: SET_STATUS, payload: { status: 'Available' } })
          dispatch({ type: SET_STATUS_LIST, payload: { statusList: [] } })
          await uploadPicture().then(() => {
            navigation.navigate('App')
          }).catch(console.warn)
        } else {
          console.log('Couldnt register');
          console.log(resp);
        }
    }).catch(console.log);
  }

  const selectPicture = async () => {
    console.log('xd')
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    console.log(status)
    if(status === 'granted') {
      ImagePicker.launchImageLibraryAsync({
        base64: true,
        aspect: [1, 1],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true
      })
      .then(res => {
        if(!res.cancelled) {
          setImage(res.uri);
          setBase64(res.base64);
          setUri(_email + Date.now() + '.png');
        }
      }).catch(console.log);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F8F9FB' }} enabled behavior='padding'>
      {loading && <LoadingView />}
      <AppHeader shadow color='#FFF' title='Profile' />
      <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', top: 25, left: 25, alignItems: 'center' }}>
          <TouchableOpacity onPress={selectPicture}>
            <Image
              source={image === '' ? require('../assets/default.png') : { uri: image }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          </TouchableOpacity>
          <Text style={{ width: 200, fontSize: 16, fontFamily: 'Lato Bold', textAlign: 'center' }}>
            Touch to add a picture
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
          value={name} editable={!disabled} onSubmitEditing={() => Keyboard.dismiss()}
          spellCheck={false} 
        />  
        <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#AAAAAA', marginTop: 20, marginLeft: 5 }}>USERNAME</Text> 
        <Input 
          placeholder='Username'
          containerStyle={{ marginTop: 5, width: '100%', backgroundColor: '#F8F9FB', height: 50, justifyContent: 'center', borderWidth: 0.5, borderColor: '#DADADA' }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ fontFamily: 'Lato Bold' }}
          onChange={(event) => { setUsername(event.nativeEvent.text); }}
          value={username} editable={!disabled} onSubmitEditing={() => Keyboard.dismiss()}
          spellCheck={false} autoCapitalize='none'
        />  
        <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#AAAAAA', marginTop: 20, marginLeft: 5 }}>PASSWORD</Text> 
        <Input 
          placeholder='Password' secureTextEntry
          containerStyle={{ marginTop: 5, width: '100%', backgroundColor: '#F8F9FB', height: 50, justifyContent: 'center', borderWidth: 0.5, borderColor: '#DADADA' }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ fontFamily: 'Lato Bold' }} 
          onChange={(event) => { setPassword(event.nativeEvent.text); }}
          value={password} editable={!disabled} onSubmitEditing={() => Keyboard.dismiss()}
          spellCheck={false} 
        />
        <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#AAAAAA', marginTop: 20, marginLeft: 5 }}>CONFIRM PASSWORD</Text> 
        <Input 
          placeholder='Confirm Password' secureTextEntry
          containerStyle={{ marginTop: 5, width: '100%', backgroundColor: '#F8F9FB', height: 50, justifyContent: 'center', borderWidth: 0.5, borderColor: '#DADADA' }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ fontFamily: 'Lato Bold' }}
          onChange={(event) => { setPasswordConfirm(event.nativeEvent.text); }}
          value={_password} editable={!disabled} onSubmitEditing={() => Keyboard.dismiss()}
          spellCheck={false} 
        />
        <LinearGradient colors={['#4FC77F', '#33CA9B']} style={{ width: '80%', height: 50, marginTop: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 10 }} 
          start={[0, 0]}>
          <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
            titleStyle={{ fontFamily: 'Lato Black', fontSize: 18 }} title="Register" onPress={() => register()} disabled={disabled}/>
        </LinearGradient>   
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterView;