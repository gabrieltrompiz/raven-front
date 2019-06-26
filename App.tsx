import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, NavigationContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Chats from './views/Chats';
import Contacts from './views/Contacts';
import Settings from './views/Settings';
import Camera from './views/Camera';

const App: React.FC = () => {
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
      style: { borderTopWidth: 0, shadowColor: 'black', shadowOpacity: 0.1, shadowOffset: { width: 0, height: -2 }, shadowRadius: 10, height: 50 },
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
  return (
    <AppContainer style={{ backgroundColor: 'transparent' }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;