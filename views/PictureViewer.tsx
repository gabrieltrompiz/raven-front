import React, { useContext, useState } from 'react'
import { View, Dimensions,Image, AsyncStorage } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { SET_PIC } from '../redux/actionTypes';
import LoadingView from './LoadingView';

const PictureViewer: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const width = Dimensions.get('window').width;
  const user = useSelector(state => state.user);
  const uri = useSelector(state => state.uri)
  const server = require('../config.json').server;

  const dispatch = useDispatch();

  const selectPicture = () => {
    ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true
    })
    .then(res => {
      if(!res.cancelled) {
        setLoading(true);
        changePicture(res.base64);
        setLoading(false);
      }
    }).catch(console.log);
    setLoading(false);
  }

  const changePicture = async (base64) => {
    const _uri = user.email + Date.now() + '.png';
    const body = {
      uri: _uri,
      oldUri: uri,
      base64: base64
    }
    setLoading(true)
    await fetch(server + 'picture', { method: 'POST', body: JSON.stringify(body), credentials: 'include', headers: { "Content-Type": "application/json; charset=utf-8" } })
    .then(res => res.json()).then(async (res) => {
      dispatch({ type: SET_PIC, payload: { uri: _uri }})
      setLoading(false)
      navigation.goBack()
    })
    .then(async () => {
      await AsyncStorage.setItem('RAVEN-USER', JSON.stringify(user))
    })
    .catch((reason) => {
      setLoading(false)
      console.warn(reason)
    });
    
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center' }}>
      <AppHeader title='Profile Photo' color='#000' fontColor='#FFF' leftComponent={<Button icon={{ name: 'chevron-left', color: '#FFF' }}
        onPress={() => navigation.goBack()} title='Profile' buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5, marginLeft: -10 }} 
        titleStyle={{ color: '#FFF', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />}
        rightComponent={<Button onPress={selectPicture} title='Change' buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5, marginLeft: 10 }} 
        titleStyle={{ color: '#FFF', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />}/>
      
      {loading && <LoadingView />}
      <View style={{ width: '100%', height: '100%' }}>
        <Image
          source={{ uri: server + 'picture/' + uri }}
          style={{ width: width, height: width, marginVertical: 100 }}
        />
      </View>
    </View>
  );
}

export default PictureViewer;