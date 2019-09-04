import React, { useEffect } from 'react'
import { View, ScrollView, TouchableOpacity, AsyncStorage, Dimensions } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import { useDispatch } from 'react-redux';
import { SET_BACKGROUND } from '../redux/actionTypes'

const BackgroundPick: React.FC<NavigationContainerProps> = ({ navigation }) => {
  
  const colors = ['#101010', '#1a010d', '#a82525', '#459970', '#77a695', '#0f2966', '#326e99', '#3eb5b3', '#98d4d3', '#1aba7a', '#e6e880',
    '#d7d968', '#f7002d', '#f0f0c5', '#9dc4bb', '#cfa5c9', '#e8e1e7'];

  const divideColors = () => {
    const array = []
    while(colors.length > 0) {
      array.push(colors.splice(0, 3))
    }
    return array
  }

  const colorsDivided = divideColors()
  
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title='Chat Wallpaper' color='#FFF' leftComponent={<Button icon={{ name: 'chevron-left', color: '#36C899' }}
        onPress={() => navigation.goBack()} buttonStyle={{ backgroundColor: 'transparent', width: 50, marginTop: 5 }} 
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 50 }} style={{ width: 50 }} />} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} >
        {colorsDivided.map((_colors) =>
          <View style={{ width: '100%', height: Dimensions.get('window').width / 3, flexDirection: 'row' }} key={_colors[0]}>
            {_colors.map((color, i) => 
            <TouchableOpacity style={{ height: Dimensions.get('window').width / 3, width: Dimensions.get('window').width / 3,
              backgroundColor: color, borderColor: '#FFF', borderWidth: 2, flexDirection: 'row' }} key={i} 
              onPress={() => navigation.dangerouslyGetParent().dangerouslyGetParent().navigate('PreviewWallpaper', { color })}/>)}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default BackgroundPick;