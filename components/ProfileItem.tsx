import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProfileItemProps {
  label: string,
  value: string,
  iconName: string
  itemHeight?: number,
  call?: Function
  changeView?: Function
}
const ProfileItem: React.FC<ProfileItemProps> = ({ label, value, iconName, itemHeight, call, changeView }) => {
  return(
    <TouchableOpacity style={{ flexDirection: 'row', height: itemHeight ? itemHeight: 75 }} onPress={() => call ? call(label, value): changeView(label)}>
      <View style={{ width: '15%', height: '100%', backgroundColor: 'transparent' }}>
        <Icon name={iconName} color='#36C899' size={30} style={{ marginTop: 10, marginLeft: 10 }} />
      </View>
      
      <View style={{ width: '65%', height: '100%', backgroundColor: 'transparent' }}>
        <View>
          <Text style={{ fontFamily: 'Lato Light', fontSize: 13, paddingTop: 5 }}>{label}</Text>
        </View>

        <View>
          <Text style={{ fontFamily: 'Lato', fontSize: 19, paddingTop: 0 }}>{value}</Text>
        </View>
      </View>
      <View style={{ width: '20%', height: '100%' }} />
    </TouchableOpacity>
  );
}

export default ProfileItem;