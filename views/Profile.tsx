import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { NavigationContainerProps } from 'react-navigation';
import AppHeader from '../components/AppHeader';
import { useSelector, useDispatch } from 'react-redux';
import ProfileItem from '../components/ProfileItem';
import ModalField from './ModalField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingView from './LoadingView';
import { SET_USER } from '../redux/actionTypes'

const Profile: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const status = useSelector(state => state.status);
  const uri = useSelector(state => state.uri)
  const [modal, setModal] = useState(false);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const server = require('../config.json').server;

  const setValues = (field: string, value?: string) => {
    setField(field);
    setValue(value);
    setModal(true);
  }

  const modifyUser = async (field: string, value?: string) => {
    setModal(false);
    
    if(value) {
      let _user = user;
      setLoading(true);
      switch(field) {
        case 'Name':
          _user.name = value;
          dispatch({ type: SET_USER, payload: { user: _user }})
          setName(value);
          await AsyncStorage.setItem('RAVEN-USER', JSON.stringify(user));
          break;
        
        case 'Username':
          _user.username = value;
          dispatch({ type: SET_USER, payload: { user: _user }})
          setName(value);
          await AsyncStorage.setItem('RAVEN-USER', JSON.stringify(user));
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
          source={{ uri: server + 'picture/' + uri }}
          style={{ width: 180, height: 180, borderRadius: 90, marginTop: 15, marginBottom: 55 }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
      <ScrollView>
        <ProfileItem label="Username" value={user.username} iconName="account-circle" call={setValues} />
        <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
        <ProfileItem label="Name" value={user.name} iconName="account-circle" call={setValues} />
        <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
        <ProfileItem label="Email" value={user.email} iconName="email" changeView={changeView}/>
        <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
        <ProfileItem label="Status" value={status ? status : "Available"} iconName="access-point" itemHeight={100} changeView={changeView} />
      </ScrollView>
    </View>
    );
  }
  
  export default Profile;