import React, { useEffect, useState } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, NavigationContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chats from './views/Chats';
import Contacts from './views/Contacts';
import Settings from './views/Settings';
import Camera from './views/Camera';
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
import { SET_USER, ADD_MESSAGE } from './redux/actionTypes'
import { ChatMessage } from './types';
import AccountSettings from './views/AccountSettings';
import ChatSettings from './views/ChatSettings';
import NotificationSettings from './views/NotificationSettings';
import SavedMessages from './views/SavedMessages';
import Profile from './views/Profile';

const ConsumerApp: React.FC = () => {
  //Dev:
  console.disableYellowBox = true;

  const server = require('./config.json').server

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [isReady, setReady] = useState(false)
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState(null)

  const socket = new SocketService();

  useEffect(() => { 
    _retrieveState()
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if(user !== null) {
      subscribeToEvents()
    }
  }, [user])

  const subscribeToEvents = async () => {
    await _autoLogin()
    socket.init()
    socket.onRelog().subscribe(async () => {
      socket.disconnect()
      await _autoLogin()
      socket.init()
    })
    socket.onMessage().subscribe((m: ChatMessage) => {
      dispatch({ type: ADD_MESSAGE, payload: { message: m, id: m.chat } })
    })
  }

  const _retrieveState = async () => {
    // await AsyncStorage.removeItem('RAVEN-TOKEN')
    // await AsyncStorage.removeItem('RAVEN-TOKEN-EMAIL')
    // await AsyncStorage.removeItem('RAVEN-USER')
    const _user = await AsyncStorage.getItem('RAVEN-USER');
    const _token = await AsyncStorage.getItem('RAVEN-TOKEN')
    const _email = await AsyncStorage.getItem('RAVEN-TOKEN-EMAIL')
    if(_token !== null) { setToken(_token) }
    if(_email !== null) { setEmail(_email) }
    if(_user !== null) { dispatch({ type: SET_USER, payload: { user: JSON.parse(_user) } }); }
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
    ChatView: ChatView
  }, { headerMode: 'none' });
  const ContactsStack: NavigationContainer = createStackNavigator({
    Contacts: Contacts
  }, { headerMode: 'none' })
  const SettingsStack: NavigationContainer = createStackNavigator({
    Settings: Settings,
    Profile: Profile,
    AccountSettings: AccountSettings,
    ChatSettings: ChatSettings,
    NotificationSettings: NotificationSettings,
    SavedMessages: SavedMessages
  }, { headerMode: 'none' })
  const CameraStack: NavigationContainer = createStackNavigator({
    Camera: Camera
  }, { headerMode: 'none' })
  const TabNav: NavigationContainer = createBottomTabNavigator({
    Contacts: ContactsStack,
    Camera: CameraStack,
    Chats: ChatsStack,
    Settings: SettingsStack
  }, {
    initialRouteName: 'Chats',
    tabBarOptions: {
      style: { borderTopWidth: 0, shadowColor: '#DCDEF4', shadowOpacity: 0.3, shadowOffset: { width: 0, height: -5 }, shadowRadius: 10, height: 50 },
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
      }
    })
  })

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
    Login: LoginContainer 
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