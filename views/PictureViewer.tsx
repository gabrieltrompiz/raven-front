import React from 'react'
import { View, Dimensions } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button, Image } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

const PictureViewer: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center' }}>
      <AppHeader title='Profile Photo' color='#000' fontColor='#FFF' shadow leftComponent={<Button icon={{ name: 'chevron-left', color: '#FFF' }}
        onPress={() => navigation.goBack()} title='Profile' buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5, marginLeft: -10 }} 
        titleStyle={{ color: '#FFF', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />}
        rightComponent={<Button icon={{ name: 'chevron-right', color: '#FFF' }} iconRight
        onPress={() => console.log('pending change')} title='Change' buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5, marginLeft: 10 }} 
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