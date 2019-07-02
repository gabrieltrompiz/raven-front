import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationContainerProps } from 'react-navigation';
import useGlobal from '../hooks/useGlobal'

const GetStarted: React.FC<NavigationContainerProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center', justifyContent: 'center' }}>
      <Image 
        source={require('../assets/raven.png')} 
        style={{
          width: 150, height: 150, overflow: 'visible', top: -40
        }}/>
      <Text style={{ fontSize: 50, fontFamily: 'Lato Black', top: -30 }}>Raven</Text>
      <Text style={{ fontSize: 22, fontFamily: 'Lato Bold', top: 15, textAlign: 'center' }}>
        Cross-platform mobile messaging.{'\n'}Fast and secure.
      </Text>
      <LinearGradient colors={['#33CA9B', '#4FC77F']} style={{ width: '80%', height: 50, position: 'absolute', bottom: 50, borderRadius: 10,
        alignItems: 'center', justifyContent: 'center' }} start={[0, 0]}>
        <Button containerStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} buttonStyle={{ backgroundColor: 'transparent', width: '100%', height: '100%' }} 
          titleStyle={{ fontFamily: 'Lato Black' }} title="Get Started" onPress={() => { navigation.navigate('LoginView') }}/>
      </LinearGradient>
    </View>
  );
}

export default GetStarted;