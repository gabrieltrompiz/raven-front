import React from 'react'
import { Header } from 'react-native-elements'
import { useSelector } from 'react-redux'

interface HeaderProps {
  color: string;
  title: string;
  leftComponent?: {};
  rightComponent?: {};
  shadow?: boolean;
  fontColor?: string
}

const AppHeader: React.FC<HeaderProps> = ({ title, color, leftComponent, rightComponent, shadow, fontColor }) => {
  const connected = useSelector(state => state.connected)
  const user = useSelector(state => state.user)

  return (
    <Header 
      backgroundColor={color}
      centerComponent={{ text: connected ? title : 'Connecting', style: { color: typeof fontColor === 'undefined' ? '#000': fontColor, 
        fontFamily: connected ? 'Lato Black' : 'Lato Light', fontSize: connected ? 28 : 24 } }}
      containerStyle={{ shadowColor: '#DCDEF4', shadowOpacity: shadow ? 0.3 : 0, shadowOffset: { height: 10, width: 0 }, shadowRadius: 5, borderBottomWidth: 0, margin: 0, zIndex: 10, elevation: shadow ? 3 : 0 }}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
    />
  );
}

export default AppHeader;