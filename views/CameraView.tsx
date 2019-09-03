import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ImageBackground, Dimensions, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainerProps } from 'react-navigation';
import { Input } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const CameraView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [permissions, setPermissions] = useState(null);
  const [flash, setFlash] = useState(0);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null)
  const [caption, setCaption] = useState('')
  const FLASH_OFF = 0
  const FLASH_ON = 1;
  const FLASH_AUTO = 2;

  useEffect(() => {
    askPermissions().then(data => setPermissions(data.status));
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    }
  })

  const askPermissions = async () => {
    return await Permissions.askAsync(Permissions.CAMERA);
  }

  const getFlashValue = () => {
    switch(flash) {
      case FLASH_OFF:
        return 'flash-off';

      case FLASH_ON:
        return 'flash';

      case FLASH_AUTO:
        return 'flash-auto';

      default: return null;
    }
  }

  const handleFlashSwitch = () => {
    setFlash(flash === 2 ? 0 : flash + 1)
  }

  const handleTakePicture = async () => {
    if(camera) {
      const { base64 } = await camera.takePictureAsync({ quality: 1, base64: true });
      setPhoto('data:image/jpg;base64,' + base64)
      console.log('xd')
    }
  }

  if(!photo) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Camera style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column' }} type={type} ratio='16:9' ref={ref => setCamera(ref)}>
          <TouchableOpacity onPress={() => navigation.dangerouslyGetParent().goBack()} style={{ alignSelf: 'flex-end', marginTop: 20, marginRight: 20 }}>
            <Icon name='close' size={30} color='#EFEFEF' />
          </TouchableOpacity>
          <View style={{ flex: 0.1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginBottom: 40 }}>
            <TouchableOpacity onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
              <Icon name='camera-party-mode' size={30} color='#EFEFEF'></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTakePicture}>
              <Icon name='circle-outline' size={78} color='#EFEFEF' style={{ paddingBottom: 20 }}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFlashSwitch}>
              <Icon name={getFlashValue()} size={30} color='#EFEFEF'></Icon>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
  else {
    return (
      <View style={{ backgroundColor: 'black' }}>
        <Image source={{ uri: photo, width: Dimensions.get('window').width, height: Dimensions.get('window').height }} 
          style={{ transform: type === Camera.Constants.Type.front ? [{ rotateY: '180deg' }] : [] }}/>
        <TouchableOpacity onPress={() => setPhoto(null)} style={{ position: 'absolute', right: 20, top: 20 }}>
          <Icon name='close' size={30} color='#EFEFEF' />
        </TouchableOpacity>
        <View style={{ width: '100%', height: 50, position: 'absolute', bottom: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <Input 
            containerStyle={{ borderWidth: 0.2, backgroundColor: '#FFFFFF', borderRadius: 20, width: '70%', borderColor: '#AAAAAA', justifyContent: 'center',
            alignItems: 'center', height: 40 }} placeholder='Add a caption...'
            inputContainerStyle={{ borderBottomWidth: 0 }} numberOfLines={1}
            value={caption} inputStyle={{ fontFamily: 'Lato' }}
            onChange={(event) => { setCaption(event.nativeEvent.text) }}
          />
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4FC77F' }}>
            <Icon name='telegram' color='white' type='material-community' size={26} containerStyle={{ marginTop: 2, marginRight: 2 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CameraView;