import React, { useState } from 'react'
import { View, Dimensions } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button, Image } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import * as ImagePicker from 'expo-image-picker';

const pickerOptions = {
  base64: true,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1]
};

const PictureViewer: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [imgUri, setImgUri] = useState('');
  const width = Dimensions.get('window').width;

  const selectPicture = () => {
    ImagePicker.launchImageLibraryAsync(pickerOptions)
      .then(res => {
        console.log(res);
        if(!res.cancelled) {
          changePicture(res.base64);
        }
      }).catch(console.log);
  }

  const changePicture = async (base64) => {

    // const response = await fetch(imgUri);
    // response.blob()
    //   .then(async _blob => {
        
    //   })
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