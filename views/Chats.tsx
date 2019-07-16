import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native'
import AppHeader from '../components/AppHeader';
import { SearchBar } from 'react-native-elements';
import ChatContainer from '../components/ChatContainer';
import { NavigationContainerProps } from 'react-navigation';

const Chats: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const message = { user: { name: 'Gabriel Trompiz', phone: '+58 412-7645681', email: 'gab.tc@icloud.com' }, attachment: '', body: 'Hello', id: 1, time: Date.now() }
  const chatExample = { user: { name: 'Gabriel Trompiz', phone: '+58 412-7645681', email: 'gab.tc@icloud.com' }, messages: [message, message] }

  const [chats, setChats] = useState([chatExample, chatExample]) // chatlist state
  const [scrolled, setScrolled] = useState(false) // state for controlling header's shadow
  const [roundDelta, setRoundDelta] = useState(1) // state for controlling border radius delta
  const [opacityDelta, setOpacityDelta] = useState(1) // state for controllling search bar opacity

  const ref = useRef(null) // ScrollView ref

  useEffect(() => {
       
  }, [])

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => { // linear functions generate a coefficient from 0 to 1 according to scrolled distance
    const roundDelta = ((-1/55) * event.nativeEvent.contentOffset.y) + 1 > 0 ? ((-1/55) * event.nativeEvent.contentOffset.y) + 1 : 0 // linear function to set border roundness
    const opacityDelta = ((-1/20) * event.nativeEvent.contentOffset.y) + 1 > 0 ? ((-1/20) * event.nativeEvent.contentOffset.y) + 1 : 0 // linear function to set opacity
    setRoundDelta(roundDelta) // update round delta state
    setOpacityDelta(opacityDelta) // update opacity delta state
    if(Math.trunc(event.nativeEvent.contentOffset.y) >= 58 && !scrolled) {
      setScrolled(true) // show header's shadow
    }
    else if(Math.trunc(event.nativeEvent.contentOffset.y) < 58 && scrolled) {
      setScrolled(false) // hide header's shadow
    }
  }

  const onRelease = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if(Math.trunc(event.nativeEvent.contentOffset.y) >= 28 && Math.trunc(event.nativeEvent.contentOffset.y) <= 68) {
      ref.current.scrollTo({ x: 0, y: 68, animated: true }) // scroll to place after search bar if half of it is scrolled
    }
    else if(Math.trunc(event.nativeEvent.contentOffset.y) < 28)  {
      ref.current.scrollTo({ x: 0, y: 0, animated: true }) // scroll to top if half of search bar is scrolled (upper)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <AppHeader title='Chats' color='#FFF' shadow={scrolled}/>
      <ScrollView style={{ flex: 1 }} onScrollEndDrag={(event) => onRelease(event)} scrollEventThrottle={16} onScroll={(event) => onScroll(event)} ref={ref}>
        <View style={{ backgroundColor: '#FFF', height: Dimensions.get('window').height, width: '100%', position: 'absolute', top: -Dimensions.get('window').height, left: 0, right: 0}}></View>
        <SearchBar placeholder="Search"
          containerStyle={{ backgroundColor: 'white', borderTopWidth: 0, borderBottomWidth: 0, shadowColor: '#DCDEF4', shadowOffset: { height: 10, width: 0 },
            shadowOpacity: !scrolled ? 0.3 : 0, shadowRadius: 5, borderBottomLeftRadius: roundDelta <= 1 ? 30  * roundDelta : 30, borderBottomRightRadius: roundDelta <= 1 ? 30  * roundDelta : 30,
            marginBottom: 10, paddingTop: 0, minHeight: 0, width: '100%' }}
          inputStyle={{ backgroundColor: '#F5F4FA', opacity: 1 * opacityDelta, minHeight: 0 }}
          inputContainerStyle={{ backgroundColor: '#F5F4FA', alignSelf: 'center', borderRadius: 10, marginBottom: 10, width: '95%' }}
          leftIconContainerStyle={{ opacity: 1 * opacityDelta }}
        />
        {chats.map((chat, index) => {
          return (<View style={{ width: '100%', alignItems: 'center' }} key={index}>
            <ChatContainer user={chat.user} messages={chat.messages} key={index} navigation={navigation} />
            <View style={{ width: '95%', height: 1, backgroundColor: '#EEEEEE', marginTop: 5, marginBottom: 5 }}/>  
          </View>)
        })}
      </ScrollView>
    </View>
  );
}

export default Chats;