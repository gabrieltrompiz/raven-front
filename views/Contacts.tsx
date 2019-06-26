import React from 'react'
import { View, Text } from 'react-native'
import AppHeader from '../components/AppHeader';

const Contacts: React.FC = () => {
  return (
    <View>
      <AppHeader title='Contacts' color='#fff'/>
    </View>
  );
}

export default Contacts;