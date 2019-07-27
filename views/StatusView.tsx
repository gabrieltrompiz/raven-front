import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

const StatusView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <AppHeader title='Status' color='#FFF' shadow leftComponent={<Button buttonStyle={{ borderRadius: 100, backgroundColor: 'transparent' }} 
        containerStyle={{ borderRadius: 100 }} icon={<Icon name='arrow-back' color='black' size={30} iconStyle={{ paddingTop: 6 }} />} onPress={() => navigation.goBack()} />} />
      <View>
        <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#36C899', paddingLeft: 25, paddingTop: 10 }}>Current Status</Text>
        <Button title="This is a test because I dont know how to handle overflow" containerStyle={{ width: '100%' }} buttonStyle={{ backgroundColor: 'transparent', height: 48 }} 
          titleStyle={{ fontFamily: 'Lato', fontSize: 14, color: 'black', paddingHorizontal: 10 }} iconRight={true} icon={<Icon name='chat' color='black' size={30} />} />
      </View>
      <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
      <View>
        <Text style={{ fontFamily: 'Lato Bold', fontSize: 15, color: '#36C899', paddingLeft: 25, paddingTop: 10 }}>Select Status</Text>
        <Button title="This is a test too" containerStyle={{ width: '100%' }} buttonStyle={{ backgroundColor: 'transparent', height: 45, justifyContent: 'flex-start' }} 
          titleStyle={{ fontFamily: 'Lato', fontSize: 14, color: 'black', paddingHorizontal: 10 }} />
        <Button title="This is also a test" containerStyle={{ width: '100%' }} buttonStyle={{ backgroundColor: 'transparent', height: 45, justifyContent: 'flex-start' }} 
          titleStyle={{ fontFamily: 'Lato', fontSize: 14, color: 'black', paddingHorizontal: 10 }} />
        <Button title="I don't know how many test do I have to do to know how the fuck handle overflow why did I live in a fucking house with no fucking internet connection marditasea matenme" containerStyle={{ width: '100%' }} buttonStyle={{ backgroundColor: 'transparent', height: 45, justifyContent: 'flex-start' }} 
          titleStyle={{ fontFamily: 'Lato', fontSize: 14, color: 'black', paddingHorizontal: 10 }} />
      </View>
    </View>
  );
}

export default StatusView;