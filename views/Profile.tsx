import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import AppHeader from '../components/AppHeader';
import { useSelector } from 'react-redux';
import ProfileItem from '../components/ProfileItem';
import ModalField from './ModalField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingView from './LoadingView';

const Profile: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const user = useSelector(store => store.user);
  const [modal, setModal] = useState(false);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const setValues = (field: string, value?: string) => {
    setField(field);
    setValue(value);
    setModal(true);
  }

  const modifyUser = async (field: string, value?: string) => {
    setModal(false);
    
    if(value) {
      setLoading(true);
      switch(field) {
        case 'Name':
          //await
          setName(value);
          break;
        
        case 'Username':
          //await
          setUsername(value);
          break;

        default:
          console.log('bro what the actual fuck: ' + field + ', ' + value);
      }

    } else {
      console.log('no no creo');
    }
    setLoading(false);
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
    <View style={{ flex: 1, backgroundColor: '#F8F9FB', alignItems: 'center' }} >
      {modal && <ModalField field={field} value={value} accept={modifyUser} cancel={() => setModal(false) } />}
      {loading && <LoadingView />}
      
      <AppHeader title='Profile' color='#FFF' shadow leftComponent={<Button icon={{ name: 'chevron-left', color: '#36C899' }} title='Settings'
        onPress={() => navigation.goBack()} buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5 }} 
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />} />
      <TouchableOpacity onPress={() => navigation.navigate('PictureViewer')}>
        <Image 
          source={require('../assets/icon.png')} 
          style={{ width: 180, height: 180, borderRadius: 100, marginTop: 15, marginBottom: 55 }}
        />
      </TouchableOpacity>
      <ScrollView>
        <ProfileItem label="Username" value={username} iconName="account-circle" call={setValues} />
        <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
        <ProfileItem label="Name" value={name} iconName="account-circle" call={setValues} />
        <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
        <ProfileItem label="Email" value={user.email} iconName="email" changeView={changeView}/>
        <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
        <ProfileItem label="Status" value="Raven has a little green bird isn't it cute" iconName="access-point" itemHeight={100} changeView={changeView} />
      </ScrollView>
    </View>
    );
  }
  
  export default Profile;