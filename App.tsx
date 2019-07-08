import React, { useEffect, useState } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, NavigationContainer, NavigationTransitionProps } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chats from './views/Chats';
import Contacts from './views/Contacts';
import Settings from './views/Settings';
import Camera from './views/Camera';
import GetStarted from './views/GetStarted';
import LoginView from './views/LoginView';
import { SocketContext } from './services/ServiceContext';
import { SocketService } from './services/SocketService';
import useGlobal from './hooks/useGlobal'
import RegisterView from './views/RegisterView';

const App: React.FC = () => {
  const [isReady, setReady] = useState(false)
  const [globalState, globalActions] = useGlobal()
  
  const socket = new SocketService();

  useEffect(() => { 
    _retrieveState()
    socket.init()
    return () => {
      socket.disconnect()
    };
  }, [])

  const _retrieveState = async () => {
    const user = await AsyncStorage.getItem('RAVEN-USER');
    if(user !== null) { globalActions.setUser(JSON.parse(user)) }
  }

  const _startAsync = async () => {
    await Font.loadAsync({
      'Lato Black': require('./assets/Lato-Black.ttf'),
      'Lato': require('./assets/Lato-Regular.ttf'),
      'Lato Bold': require('./assets/Lato-Bold.ttf')
    })
    await Asset.loadAsync([require('./assets/raven.png')])
  }

  const ChatsStack: NavigationContainer = createStackNavigator({
    Chats: Chats
  }, { headerMode: 'none' });
  const ContactsStack: NavigationContainer = createStackNavigator({
    Contacts: Contacts
  }, { headerMode: 'none' })
  const SettingsStack: NavigationContainer = createStackNavigator({
    Settings: Settings
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

  const LoginStack: NavigationContainer = createStackNavigator({
    GetStarted: GetStarted,
    LoginView: LoginView,
    RegisterView: RegisterView
  }, {
    headerMode: 'none',
    initialRouteName: 'RegisterView'
  })

  const LoginContainer: NavigationContainer = createAppContainer(LoginStack)
  const AppContainer: NavigationContainer = createAppContainer(TabNav)

  if(!isReady) {
    return (
      <AppLoading 
        startAsync={_startAsync}
        onError={console.warn}
        onFinish={() => setReady(true)}
      />
    );
  }
  else if(globalState.user !== null) {
    return (
      <SocketContext.Provider value={socket}>
        <AppContainer style={{ backgroundColor: 'transparent' }} />
      </SocketContext.Provider>
    );
  }
  else {
    return (
      <LoginContainer />
    );
  }
}

export default App;