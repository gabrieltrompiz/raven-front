import React, { useEffect, useState } from 'react';
import { Image, AsyncStorage, StatusBar, Platform } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, NavigationContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chats from './views/Chats';
import Contacts from './views/Contacts';
import Settings from './views/Settings';
import GetStarted from './views/GetStarted';
import LoginView from './views/LoginView';
import CodeVerificationView from './views/CodeVerificationView';
import RegisterView from './views/RegisterView';
import ChatView from './views/ChatView'
import { SocketContext } from './services/ServiceContext';
import { SocketService } from './services/SocketService';
import * as SecureStore from 'expo-secure-store';
import store from './redux/store'
import { Provider, useDispatch, useSelector, connect } from 'react-redux'
import { SET_USER, SET_CONNECTED, SET_CHAT_TIMELINE, SET_STATUS, SET_STATUS_LIST } from './redux/actionTypes'
import { ChatMessage } from './types';
import CameraView from './views/CameraView';
import BlockedView from './views/BlockedView';
import BackgroundPick from './views/BackgroundPick';
import SavedMessages from './views/SavedMessages';
import Profile from './views/Profile';
import StatusView from './views/StatusView';
import PictureViewer from './views/PictureViewer';

const ConsumerApp: React.FC = () => {
  //Dev:
  console.disableYellowBox = true;

  const server = require('./config.json').server

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [isReady, setReady] = useState(false)
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState(null)

  const init = new SocketService();
  const [socket, setSocket] = useState(init)

  useEffect(() => { 
    _retrieveState()
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if(user !== null) {
      _subscribeToEvents()
    }
  }, [user])

  const _subscribeToEvents = async () => {
    await _autoLogin()
    setSocket(socket.init())
    dispatch({ type: SET_CONNECTED, payload: { connected: true }})
    socket.onRelog().subscribe(async () => {
      socket.disconnect()
      dispatch({ type: SET_CONNECTED, payload: { connected: false } })
      await _autoLogin()
      setSocket(socket.init())
      dispatch({ type: SET_CONNECTED, payload: { conencted: true }})
    })
  }

  const _retrieveState = async () => {
    // await AsyncStorage.removeItem('RAVEN-TOKEN')
    // await AsyncStorage.removeItem('RAVEN-TOKEN-EMAIL')
    // await AsyncStorage.removeItem('RAVEN-USER')
    const _user = await AsyncStorage.getItem('RAVEN-USER')
    const _token = await AsyncStorage.getItem('RAVEN-TOKEN')
    const _email = await AsyncStorage.getItem('RAVEN-TOKEN-EMAIL')
    const _currStatus = await AsyncStorage.getItem('RAVEN-USER-STATUS')
    const _statusList = await AsyncStorage.getItem('RAVEN-USER-STATUS-LIST')
    if(_token !== null) { setToken(_token) }
    if(_email !== null) { setEmail(_email) }
    if(_user !== null) { 
      // await AsyncStorage.removeItem('RAVEN-CHATS-' + JSON.parse(_user).email.toUpperCase())
      // await AsyncStorage.removeItem('RAVEN-TIMELINE-' + JSON.parse(_user).email.toUpperCase())
      dispatch({ type: SET_USER, payload: { user: JSON.parse(_user) } }); 
      const _chats = await AsyncStorage.getItem('RAVEN-CHATS-' + JSON.parse(_user).email.toUpperCase())
      const _timeline = await AsyncStorage.getItem('RAVEN-TIMELINE-' + JSON.parse(_user).email.toUpperCase())
      dispatch({ type: SET_CHAT_TIMELINE, payload: { chats: _chats ? JSON.parse(_chats) : {}, timeline: _timeline ? JSON.parse(_timeline) : []  } })
      if(_currStatus !== null) { dispatch({ type: SET_STATUS, payload: { _currStatus } }) }
      if(_statusList !== null) { dispatch({ type: SET_STATUS_LIST, payload: { _statusList } }) }
    }
    
  }

  const _autoLogin = async () => {
    console.log('loggin auto')
    const _pwd = await SecureStore.getItemAsync('RAVEN-PWD')
    const body = {
      email: user.email,
      password: _pwd
    }
    await fetch(server + 'login', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json; charset=utf-8' }, credentials: 'include' })
    .catch(console.log)
  }

  const _startAsync = async () => {
    await Font.loadAsync({
      'Lato Black': require('./assets/Lato-Black.ttf'),
      'Lato': require('./assets/Lato-Regular.ttf'),
      'Lato Bold': require('./assets/Lato-Bold.ttf'),
      'Lato Light': require('./assets/Lato-Light.ttf')
    })
    await Asset.loadAsync([require('./assets/raven.png'), require('./assets/right-arrow.png')])
  }

  const ChatsStack: NavigationContainer = createStackNavigator({
    Chats: Chats,
  }, { headerMode: 'none' });
  const ContactsStack: NavigationContainer = createStackNavigator({
    Contacts: Contacts
  }, { headerMode: 'none' })
  const SettingsStack: NavigationContainer = createStackNavigator({
    Settings: Settings,
    Profile: Profile,
    BackgroundPick: BackgroundPick,
    BlockedView: BlockedView,
    SavedMessages: SavedMessages,
    StatusView: StatusView,
    PictureViewer: PictureViewer
  }, { headerMode: 'none' })
  const CameraStack: NavigationContainer = createStackNavigator({
    Camera: CameraView
  }, { headerMode: 'none' })
  const TabNav: NavigationContainer = createBottomTabNavigator({
    Contacts: ContactsStack,
    Camera: CameraStack,
    Chats: ChatsStack,
    Settings: SettingsStack
  }, {
    initialRouteName: 'Chats',
    tabBarOptions: {
      style: { borderTopWidth: 0.2, borderTopColor: '#AAAAAA' },
      activeTintColor: '#36C899',
      labelStyle: { fontWeight: '600', top: 0 }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let icon;
        switch(routeName) {
          case 'Chats': icon = <Image 
            source={focused ? require('./assets/chats.png') : require('./assets/chats-outline.png')}
            style={{ width: 25, height: 25, bottom: 4, tintColor: tintColor, marginTop: 15 }}/>; break;
          case 'Camera': icon = <Icon name={focused ? 'camera' : 'camera-outline'} size={28} color={tintColor} style={{ top: 5 }}/>; break;
          case 'Contacts': icon = <Icon name={focused ? 'account-group' : 'account-group-outline'} size={28} color={tintColor} style={{ top: 5 }}/>; break;
          case 'Settings': icon = <Icon name={focused ? 'settings' : 'settings-outline'} size={28} color={tintColor} style={{ top: 5 }}/>; break;
          default: break;
        }
        return icon;
      }, tabBarVisible: getVisible(navigation)
    })
  })

  const getVisible = ( navigation ) => {
    const route = navigation.state.routes[navigation.state.index].routeName;
    //Lo puse así pa que le agreguei más rutas if u want
    return (route !== 'PictureViewer');
  }

  const AppContainer: NavigationContainer = createAppContainer(TabNav)

  const LoginStack: NavigationContainer = createStackNavigator({
    GetStarted: GetStarted,
    LoginView: LoginView,
    CodeVerificationView: CodeVerificationView,
    RegisterView: RegisterView,
  }, {
    headerMode: 'none',
    initialRouteName: !token ? 'GetStarted' : 'RegisterView'
  })

  const LoginContainer: NavigationContainer = createAppContainer(LoginStack)

  const AppStack: NavigationContainer = createStackNavigator({
    App: AppContainer,
    Login: LoginContainer,
    ChatView: ChatView 
  }, {
    headerMode: 'none',
    initialRouteName: user ? 'App' : 'Login',
  })

  const MainApp: NavigationContainer = createAppContainer(AppStack)

  if(!isReady) {
    return (
      <AppLoading 
        startAsync={_startAsync}
        onError={console.warn}
        onFinish={() => setReady(true)}
      />
    );
  }
  else {
    return (
      <SocketContext.Provider value={socket}>
        {Platform.OS === 'android' && <StatusBar barStyle='dark-content'/>}
        <MainApp style={{ backgroundColor: 'transparent' }} screenProps={{ token: token, email: email }} />
      </SocketContext.Provider>
    );
  }
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConsumerApp />
    </Provider>
  )
}

export default App;