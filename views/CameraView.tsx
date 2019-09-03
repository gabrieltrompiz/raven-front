import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CameraView: React.FC = () => {
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [permissions, setPermissions] = useState(null);
  const [flash, setFlash] = useState(0);
  const [camera, setCamera] = useState(null);
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
      let photo = await camera.takePictureAsync({ quality: 1 });
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1, justifyContent: 'flex-end' }} type={type} ratio='16:9' ref={ref => setCamera(ref)}>
        <View style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', margin: 10, width: '100%' }}>
          <TouchableOpacity onPress={() => setType( type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
            <Icon name='camera-party-mode' size={30} color='#EFEFEF'></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTakePicture}>
            <Icon name='circle-outline' size={100} color='#EFEFEF'></Icon>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFlashSwitch}>
            <Icon name={getFlashValue()} size={30} color='#EFEFEF'></Icon>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraView;