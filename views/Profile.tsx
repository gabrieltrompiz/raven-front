import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Image, Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import AppHeader from '../components/AppHeader';
import { useSelector } from 'react-redux';
import ProfileItem from '../components/ProfileItem';

const Profile: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const user = useSelector(store => store.user);
  /* TODO: the fucking status */

  return(
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center' }}>
      <AppHeader title='Profile' color='#FFF' shadow leftComponent={<Button buttonStyle={{ borderRadius: 100, backgroundColor: 'transparent' }} 
        containerStyle={{ borderRadius: 100 }} icon={<Icon name='arrow-back' color='black' size={30} iconStyle={{ paddingTop: 6 }} />} onPress={() => navigation.goBack()} />} />
      <Image 
        source={require('../assets/icon.png')} 
        style={{
          width: 180, height: 180, borderRadius: 100, marginTop: 15, marginBottom: 55
        }} />

      <ProfileItem labelName="Username" labelValue={user.username} iconName="person" />
      <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
      <ProfileItem labelName="Name" labelValue={user.name} iconName="person" />
      <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
      <ProfileItem labelName="Status" labelValue="Raven has a little green bird isn't it cute" iconName="dock" itemHeight={100} />
      <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
      <ProfileItem labelName="Email" labelValue={user.email} iconName="contact-mail" />
    </View>
    );
  }
  
  export default Profile;