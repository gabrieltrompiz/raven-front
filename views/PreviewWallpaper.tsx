import React from 'react'
import { NavigationContainerProps } from 'react-navigation';
import { View, AsyncStorage, Text, Dimensions } from 'react-native';
import ChatHeader from '../components/ChatHeader';
import Label from '../components/Label';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SET_BACKGROUND } from '../redux/actionTypes'

const PreviewWallpaper: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const backgroundColor = navigation.getParam('color')
  const user = useSelector(state => state.user)
  const messages = [{ user: { email: '' }, body: 'Press set to apply this color as your current wallpaper', id: -1, attachment: '', type: 0, time: Date.now(), to: 0 },
  { user, body: 'Press cancel to return', id: -1, attachment: '', type: 0, time: Date.now(), to: 0 }]
  
  const dispatch = useDispatch()

  const setWallpaper = async () => {
    await AsyncStorage.setItem('RAVEN-BACKGROUND', backgroundColor)
    dispatch({ type: SET_BACKGROUND, payload: { background: backgroundColor }})
    navigation.dangerouslyGetParent().goBack()
  }

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ChatHeader name='Wallpaper Preview' navigation={navigation} preview />
      <View style={{ paddingTop: 5 }}>
        <Label time={Date.now()} />
        {messages.map((message, i) => <Message message={message} group={false} key={i} />)}
      </View>
      <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 100, backgroundColor: 'rgba(255, 255, 255, 0.9)', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.dangerouslyGetParent().goBack()} style={{ height: '100%', width: Dimensions.get('window').width / 2, alignItems: 'center', justifyContent: 'center', 
          backgroundColor: 'transparent' }}>
          <Text style={{ fontSize: 22, fontFamily: 'Lato Light', paddingBottom: 20 }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWallpaper()} style={{ height: '100%', width: Dimensions.get('window').width / 2, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 22, fontFamily: 'Lato Light', paddingBottom: 20 }}>Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PreviewWallpaper;