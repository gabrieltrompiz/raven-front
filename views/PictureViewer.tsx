import React from 'react'
import { View, Dimensions } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button, Image } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

const PictureViewer: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center' }}>
      <AppHeader title='Profile Picture' color='#000' fontColor='#FFF' shadow leftComponent={<Button buttonStyle={{ borderRadius: 100, backgroundColor: 'transparent' }} 
        containerStyle={{ borderRadius: 100 }} icon={<Icon name='arrow-back' color='#FFF' size={30} iconStyle={{ paddingTop: 6 }} />} onPress={() => navigation.goBack()} />} 
        rightComponent={<Button buttonStyle={{ borderRadius: 100, backgroundColor: 'transparent' }} containerStyle={{ borderRadius: 100 }} 
        icon={<Icon name='arrow-forward' /* cambiar el icon a edit vos sabei */ color='#FFF' size={30} iconStyle={{ paddingTop: 6 }} />} onPress={() => console.log('aja modificate mardita abri el File explorer')} />}/>
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