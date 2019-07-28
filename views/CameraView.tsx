import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Camera } from 'expo-camera'

const CameraView: React.FC = () => {
  const [type, setType] = useState(Camera.Constants.Type.back)

  return (
    <Camera style={{ flex: 1 }} type={type} >

    </Camera>
  );
}

export default CameraView;