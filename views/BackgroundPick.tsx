import React from 'react'
import { View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import AppHeader from '../components/AppHeader';
import { useDispatch } from 'react-redux';
import { SET_BACKGROUND } from '../redux/actionTypes'

const BackgroundPick: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const dispatch = useDispatch()

  const colors = ['#101010', '#1a010d', '#a82525', '#459970', '#77a695', '#0f2966', '#326e99', '#3eb5b3', '#98d4d3', '#1aba7a', '#e6e880',
    '#d7d968', '#f7002d', '#f0f0c5', '#9dc4bb', '#cfa5c9', '#e8e1e7'];

  const setWallpaper = async (color) => {
    await AsyncStorage.setItem('RAVEN-BACKGROUND', color)
    dispatch({ type: SET_BACKGROUND, payload: { background: color }})
  }
  
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title='Backgrounds' color='#FFF' leftComponent={<Button icon={{ name: 'chevron-left', color: '#36C899' }} title=''
        onPress={() => navigation.goBack()} buttonStyle={{ backgroundColor: 'transparent', width: 50, marginTop: 5 }} 
        titleStyle={{ color: '#36C899', fontFamily: 'Lato Bold' }} containerStyle={{ width: 50 }} style={{ width: 50 }} />} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {colors.map((color, i) => 
          <TouchableOpacity style={{ height: 120, backgroundColor: color, borderColor: '#FFF', borderWidth: 2 }} key={i} onPress={() => setWallpaper(color)}/>
        )}
      </ScrollView>
    </View>
  );
}

export default BackgroundPick;