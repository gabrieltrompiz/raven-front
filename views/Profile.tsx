import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Image, Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import AppHeader from '../components/AppHeader';
import { useSelector } from 'react-redux';
import ProfileItem from '../components/ProfileItem';
import ModalField from './ModalField';

const Profile: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const user = useSelector(store => store.user);
  const [modal, setModal] = useState(false);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  /* TODO: the fucking status */

  const setValues = (field: string, value?: string) => {
    setField(field);
    setValue(value);
    setModal(true);
  }

  const modifyUser = (field: string, value?: string) => {
    if(value) {
      //Modificar usuario con los sockets de manera asíncrona (La idea es que el usuario no se tenga que esperar a que el socket emita el evento sino que avise y ya lo que sea)
      console.log('ci ai yuser');
    } else {
      console.log('no no creo');
    }
    setModal(false);
  }

  const changeView = (label: string) => {
    console.log(label);
    switch(label) {
      case 'Status':
        navigation.navigate('StatusView')
        break;

      case 'Email':
        navigation.navigate('nada mrc cambiase el email es un culo dejalo asi salu2');
        break;

      default:
        throw new Error();
    }
  }
  
  return(
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center' }}>
      {modal && <ModalField field={field} value={value} accept={modifyUser} cancel={() => setModal(false) } />}

      <AppHeader title='Profile' color='#FFF' shadow leftComponent={<Button buttonStyle={{ borderRadius: 100, backgroundColor: 'transparent' }} 
        containerStyle={{ borderRadius: 100 }} icon={<Icon name='arrow-back' color='black' size={30} iconStyle={{ paddingTop: 6 }} />} onPress={() => navigation.goBack()} />} />
      <TouchableOpacity onPress={() => navigation.navigate('PictureViewer')}>
        <Image 
          source={require('../assets/icon.png')} 
          style={{
            width: 180, height: 180, borderRadius: 100, marginTop: 15, marginBottom: 55}}
        />
      </TouchableOpacity>

      <ProfileItem label="Username" value={user.username} iconName="person" call={setValues} />
      <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
      <ProfileItem label="Name" value={user.name} iconName="person" call={setValues} />
      <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
      <ProfileItem label="Status" value="Raven has a little green bird isn't it cute" iconName="dock" itemHeight={100} changeView={changeView} />
      <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
      <ProfileItem label="Email" value={user.email} iconName="contact-mail" changeView={changeView}/>
    </View>
    );
  }
  
  export default Profile;