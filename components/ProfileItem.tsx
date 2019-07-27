import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface ProfileItemProps {
  labelName: string,
  labelValue: string,
  iconName: string
  itemHeight?: number
}
const ProfileItem: React.FC<ProfileItemProps> = ({ labelName, labelValue, iconName, itemHeight }) => {
  return(
    <TouchableOpacity style={{ flexDirection: 'row', height: itemHeight ? itemHeight: 75 }} onPress={() => console.log(labelName)}>
      <View style={{ width: '15%', height: '100%', backgroundColor: 'transparent' }}>
        <Icon name={iconName} color='#36C899' size={30} iconStyle={{ marginTop: 8 }} />
      </View>
      
      <View style={{ width: '65%', height: '100%', backgroundColor: 'transparent' }}>
        <View>
          <Text style={{ fontFamily: 'Lato Light', fontSize: 13, paddingTop: 5 }}>{labelName}</Text>
        </View>

        <View>
          <Text style={{ fontFamily: 'Lato', fontSize: 19, paddingTop: 0 }}>{labelValue}</Text>
        </View>
      </View>
      <View style={{ width: '20%', height: '100%' }} />
    </TouchableOpacity>
  );
}

export default ProfileItem;