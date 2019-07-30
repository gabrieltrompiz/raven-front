import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import { ChatMessage } from '../types';
import ContactContainer from '../components/ContactContainer';

const BlockedView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const users = [{name: 'Soy el yo', phone: '04160005000', email: 'luis26-99@hotmail.com'}, {name: 'Soy el tu', phone: '04160005000', email: 'luis2asdas6-99@hotmail.com'}]
  const blocked = [false, true];
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title='Blocked Users' color='#FFF' shadow leftComponent={<Button icon={{ name: 'chevron-left', color: '#36C899' }} title=''
        onPress={() => navigation.goBack()} buttonStyle={{ backgroundColor: 'transparent', width: 50, marginTop: 5 }} 
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 50 }} style={{ width: 50 }} />} />
      <View>
        {users.map((user, i) => 
        <ContactContainer user={user} key={i} toggle={blocked[i]} status={null} action={undefined} />
        )}
      </View>
    </View>
  );
}

export default BlockedView;