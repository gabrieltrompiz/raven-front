import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native'
import { NavigationContainerProps, ScrollView } from 'react-navigation';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalField from './ModalField';
import LoadingView from './LoadingView';
import { SET_STATUS, SET_STATUS_LIST } from '../redux/actionTypes'

const StatusView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const status = useSelector(store => store.status);
  const statusList = useSelector(store => store.statusList);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actualStatus, setActualStatus] = useState('This is a test I already can handle overflow pretty good');

  
  const newStatus = async (field, status) => {
    if(status) {
      setLoading(true);
      dispatch({ type: SET_STATUS, payload: { status: status } })
      let statuses = statusList;
      if(!statuses) statuses = [];
      statuses.unshift(status);
      dispatch({ type: SET_STATUS_LIST, payload: { statusList: statuses } })
      await AsyncStorage.setItem('RAVEN-USER-STATUS', JSON.stringify(status));
      await AsyncStorage.setItem('RAVEN-USER-STATUS-LIST', JSON.stringify(statuses))
      setLoading(false);
    }
    setModal(false);
  }

  const changeStatus = async (field, status) => {
    if(status) {
      setLoading(true);
      //Await verga XDDDDD No ai soke
      setActualStatus(status);

      setLoading(false);
    }
    setModal(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      {loading && <LoadingView />}
      {modal && <ModalField field='status' value={status ? status: 'Available'} cancel={() => setModal(false)} accept={newStatus} long />}
      <AppHeader title='Status' color='#FFF' shadow leftComponent={<Button icon={{ name: 'chevron-left', color: '#36C899' }} title='Profile'
        onPress={() => navigation.goBack()} buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5 }} 
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />} />
      <View>
        <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#36C899', paddingLeft: 25, paddingTop: 10, paddingBottom: 7 }}>Current Status</Text>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', backgroundColor: 'transparent', height: 60 }} onPress={() => setModal(true)}>
          <View style={{ width: '87%', height: '100%', padding: 2, paddingTop: 7 }}>
            <Text numberOfLines={3} style={{ fontFamily: 'Lato', fontSize: 14, color: 'black', paddingRight: 10, paddingLeft: 15 }}>{status ? status: 'Available'}</Text>
          </View>
          <View style={{ width: '13%', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            <Icon name='pencil' color='black' size={25} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
      <Text style={{ fontFamily: 'Lato Bold', fontSize: 15, color: '#36C899', paddingLeft: 25, paddingTop: 10, marginBottom: 15 }}>Select Status</Text>
      <ScrollView>
        {statusList && statusList.map((status, key) => 
          <TouchableOpacity key={key} style={{ width: '100%', backgroundColor: 'transparent', height: 45 }} onPress={() => changeStatus('status', status)}>
            <Text numberOfLines={1} style={{ fontFamily: 'Lato', fontSize: 14, color: 'black', padding: 10, paddingHorizontal: 15 }}>{status}</Text>
          </TouchableOpacity>)
        }
        
      </ScrollView>
    </View>
  );
}

export default StatusView;