import React, { useContext, useState } from 'react'
import { View, Dimensions,Image } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER } from '../redux/actionTypes';
import LoadingView from './LoadingView';

const pickerOptions = {
  base64: true,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1]
};

const PictureViewer: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const width = Dimensions.get('window').width;
  const user = useSelector(store => store.user);
  const server = require('../config.json').server;

  const dispatch = useDispatch();

  const selectPicture = () => {
    ImagePicker.launchImageLibraryAsync(pickerOptions)
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
    console.log(_uri);
    const body = {
      uri: _uri,
      oldUri: user.pictureUrl,
      base64: base64
    }
    await fetch(server + 'picture', { method: 'POST', body: JSON.stringify(body), credentials: 'include', headers: { "Content-Type": "application/json; charset=utf-8" } })
      .then(res => res.json()).then(res => {
        dispatch({ type: SET_USER, payload: { user: { creationTime: user.creationTime, email: user.email, id: user.id, name: user.name, pictureUrl: _uri, username: user.username } } })
      }).catch(console.log);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center' }}>
      <AppHeader title='Profile Photo' color='#000' fontColor='#FFF' shadow leftComponent={<Button icon={{ name: 'chevron-left', color: '#FFF' }}
        onPress={() => navigation.goBack()} title='Profile' buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5, marginLeft: -10 }} 
        titleStyle={{ color: '#FFF', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />}
        rightComponent={<Button icon={{ name: 'chevron-right', color: '#FFF' }} iconRight
        onPress={selectPicture} title='Change' buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5, marginLeft: 10 }} 
        titleStyle={{ color: '#FFF', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />}/>
      
      {loading && <LoadingView />}
      <View style={{ width: '100%', height: '100%' }}>
        <Image
          source={{ uri: server + 'picture/' + user.pictureUrl }}
          style={{ width: width, height: width, marginVertical: 100 }}
        />
      </View>
    </View>
  );
}

export default PictureViewer;