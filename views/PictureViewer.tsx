import React, { useContext } from 'react'
import { View, Dimensions } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button, Image } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import Base64 from 'Base64';

const pickerOptions = {
  base64: true,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1]
};

const PictureViewer: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const width = Dimensions.get('window').width;
  const user = useSelector(store => store.user);
  const server = require('../config.json').server;

  const selectPicture = () => {
    ImagePicker.launchImageLibraryAsync(pickerOptions)
      .then(res => {
        // console.log(res);
        if(!res.cancelled) {
          changePicture(res.uri);
        }
      }).catch(console.log);
  }

  const changePicture = async (uri) => {
    console.log('aqui tamo')
    const res = await fetch(uri);
    res.blob().then(async (blob) => {
      console.log('el blob cachuo')
      const file = new File([blob], 'cojondemono.png');
      let body = new FormData();
      body.append('avatar', file);
      // body.append('email', user.email);
      console.log('file y formdata cirben')
      console.log(server + 'picture');
      await fetch(server + 'picture', { method: 'POST', body: body, credentials: 'include', headers: { "Content-Type": "multipart/form-data" } })
        .then(res => res.json()).then(res => {
          console.log(res);
        }).catch(err => {
          console.log('no c ba a pode')
          console.log(err);
        });
    })
  }

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = Base64.btoa(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

  return (
    <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center' }}>
      <AppHeader title='Profile Photo' color='#000' fontColor='#FFF' shadow leftComponent={<Button icon={{ name: 'chevron-left', color: '#FFF' }}
        onPress={() => navigation.goBack()} title='Profile' buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5, marginLeft: -10 }} 
        titleStyle={{ color: '#FFF', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />}
        rightComponent={<Button icon={{ name: 'chevron-right', color: '#FFF' }} iconRight
        onPress={selectPicture} title='Change' buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5, marginLeft: 10 }} 
        titleStyle={{ color: '#FFF', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />}/>
      
      <View style={{ width: '100%', height: '100%' }}>
        <Image
          source={require('../assets/icon.png')}
          style={{ width: width, height: width, marginVertical: 100 }}
        />
      </View>
    </View>
  );
}

export default PictureViewer;