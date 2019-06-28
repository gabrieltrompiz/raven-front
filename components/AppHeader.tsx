import React from 'react'
import { Header } from 'react-native-elements'

interface HeaderProps {
  color: string;
  title: string;
  dark?: boolean;
  leftComponent?: {};
  rightComponent?: {};
  shadow?: boolean;
}

const AppHeader: React.FC<HeaderProps> = ({ title, color, dark, leftComponent, rightComponent, shadow }) => {
  return (
    <Header 
      backgroundColor={color}
      centerComponent={{ text: title, style: { color: '#000', fontFamily: 'Lato Black', fontWeight: '900', fontSize: 28 } }}
      containerStyle={{ shadowColor: '#DCDEF4', shadowOpacity: shadow ? 0.3 : 0, shadowOffset: { height: 10, width: 0 }, shadowRadius: 5, borderBottomWidth: 0, margin: 0, zIndex: 10 }}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
    />
  );
}

export default AppHeader;