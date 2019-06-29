import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, NavigationContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Chats from './views/Chats';
import Contacts from './views/Contacts';
import Settings from './views/Settings';
import Camera from './views/Camera';
import { ChatContext } from './services/ServiceContext';
import { SocketService } from './services/SocketService';
import { ChatMessage } from './types';

const App: React.FC = () => {
  const [isReady, setReady] = useState(false)

  const context = new SocketService();

  useEffect(() => {
    context.init()
    return (
      context.disconnect()
    );
  }, [])

  const _startAsync = () => {
      return Font.loadAsync({
        'Lato Black': require('../react-app/assets/Lato-Black.ttf'),
        'Lato': require('../react-app/assets/Lato-Regular.ttf')
      })
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
            source={focused ? require('../react-app/assets/chats.png') : require('../react-app/assets/chats-outline.png')}
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

  if(!isReady) {
    return (
      <AppLoading 
        startAsync={_startAsync}
        onError={console.warn}
        onFinish={() => setReady(true)}
      />
    );
  }

  return (
    <ChatContext.Provider value={context}>
      <AppContainer style={{ backgroundColor: 'transparent' }} />
    </ChatContext.Provider>
  );
}

export default App;