import React from 'react'
import { View, Text } from 'react-native'
import AppHeader from '../components/AppHeader';

const Contacts: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <AppHeader title='Contacts' color='#FFF' shadow/>
    </View>
  );
}

export default Contacts;