import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native'
import { NavigationContainerProps, ScrollView } from 'react-navigation';
import { Button } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalField from './ModalField';
import LoadingView from './LoadingView';

const StatusView: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actualStatus, setActualStatus] = useState('This is a test I already can handle overflow pretty good');
  const [statusList, setStatusList] = useState(['This is a test can you fucking overflow pls now my life goes around u to see if u fucking overflow my fucking ass oh my fucking god can i pls die today',
  'This is another test i cant explain how happy i am'])

  
  const newStatus = async (field, status) => {
    if(status) {
      setLoading(true);
      //Await verga XDDDDD No ai soke
      let statuses = statusList;
      statuses.reverse().push(status);
      statuses.reverse();
      setStatusList(statuses);
      setActualStatus(status);

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
      {modal && <ModalField field='status' value={actualStatus} cancel={() => setModal(false)} accept={newStatus} long />}
      <AppHeader title='Status' color='#FFF' shadow leftComponent={<Button icon={{ name: 'chevron-left', color: '#36C899' }} title='Profile'
        onPress={() => navigation.goBack()} buttonStyle={{ backgroundColor: 'transparent', width: 100, marginTop: 5 }} 
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 100 }} style={{ width: 100 }} />} />
      <View>
        <Text style={{ fontFamily: 'Lato Bold', fontSize: 16, color: '#36C899', paddingLeft: 25, paddingTop: 10, paddingBottom: 7 }}>Current Status</Text>
        <TouchableOpacity style={{ flexDirection: 'row', width: '100%', backgroundColor: 'transparent', height: 60 }} onPress={() => setModal(true)}>
          <View style={{ width: '87%', height: '100%', padding: 2, paddingTop: 7 }}>
            <Text numberOfLines={3} style={{ fontFamily: 'Lato', fontSize: 14, color: 'black', paddingRight: 10, paddingLeft: 15 }}>{actualStatus}</Text>
          </View>
          <View style={{ width: '13%', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
            <Icon name='pencil' color='black' size={25} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#E0E0E0', height: 1, width: '100%' }}></View>
      <Text style={{ fontFamily: 'Lato Bold', fontSize: 15, color: '#36C899', paddingLeft: 25, paddingTop: 10, marginBottom: 15 }}>Select Status</Text>
      <ScrollView>
        {statusList.map((status, key) => 
          <TouchableOpacity key={key} style={{ width: '100%', backgroundColor: 'transparent', height: 45 }} onPress={() => changeStatus('status', status)}>
            <Text numberOfLines={1} style={{ fontFamily: 'Lato', fontSize: 14, color: 'black', padding: 10, paddingHorizontal: 15 }}>{status}</Text>
          </TouchableOpacity>)
        }
        
      </ScrollView>
    </View>
  );
}

export default StatusView;