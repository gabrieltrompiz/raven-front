import React from 'react'
import { Header } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { AsyncStorage } from 'react-native';

interface HeaderProps {
  color: string;
  title: string;
  leftComponent?: {};
  rightComponent?: {};
  shadow?: boolean;
  fontColor?: string;
  logged?: boolean;
}

const AppHeader: React.FC<HeaderProps> = ({ title, color, leftComponent, rightComponent, shadow, fontColor, logged = false }) => {
  const connected = useSelector(state => state.connected)

  return (
    <Header 
      backgroundColor={color}
      centerComponent={{ text: connected ? title : (logged ? 'Connecting' : title), style: { color: typeof fontColor === 'undefined' ? '#000': fontColor, 
        fontFamily: connected ? 'Lato Black' : (logged ? 'Lato Light' : 'Lato Black'), fontSize: connected ? 24 : 20 } }}
      containerStyle={{ shadowColor: '#DCDEF4', shadowOpacity: shadow ? 0.3 : 0, shadowOffset: { height: 10, width: 0 }, shadowRadius: 5, borderBottomWidth: 0, margin: 0, zIndex: 10, elevation: shadow ? 3 : 0 }}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
    />
  );
}

export default AppHeader;