import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

const ChatSettings: React.FC<NavigationContainerProps> = ({ navigation }) => {
  return (
    <View>
      <AppHeader title='Chat Settings' color='#FFF' shadow leftComponent={<Button buttonStyle={{ borderRadius: 100, backgroundColor: 'transparent' }} 
        containerStyle={{ borderRadius: 100 }} icon={<Icon name='arrow-back' color='black' size={30} iconStyle={{ paddingTop: 6 }} />} onPress={() => navigation.goBack()} />} />
      <Text>ChatSettings</Text>
    </View>
  );
}

export default ChatSettings;