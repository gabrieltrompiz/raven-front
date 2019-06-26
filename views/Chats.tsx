import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import AppHeader from '../components/AppHeader';
import { SearchBar } from 'react-native-elements';

const Chats: React.FC = () => {
  const [scrolled, setScrolled] = useState(false) // state for controlling header's shadow
  const [roundDelta, setDelta] = useState(1) // state for controlling border radius delta

  const ref = useRef(null) // ScrollView ref

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if(event.nativeEvent.contentOffset.y >= 0) {
      setDelta(((-1/58) * event.nativeEvent.contentOffset.y) + 1) // linear function to generate border radius delta
    }
    if(Math.trunc(event.nativeEvent.contentOffset.y) >= 63 && !scrolled) {
      setScrolled(true) // show header's shadow
    }
    else if(Math.trunc(event.nativeEvent.contentOffset.y) < 63 && scrolled) {
      setScrolled(false) // hide header's shadow
    }
  }

  const onRelease = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if(Math.trunc(event.nativeEvent.contentOffset.y) >= 28) {
      ref.current.scrollTo({ x: 0, y: 68, animated: true }) // scroll to place after search bar if half of it is scrolled
    }
    else if(Math.trunc(event.nativeEvent.contentOffset.y) < 28)  {
      ref.current.scrollTo({ x: 0, y: 0, animated: true }) // scroll to top if half of search bar is scrolled (upper)
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader title='Chats' color='#fff' shadow={scrolled}/>
      <ScrollView style={{ flex: 1 }} onScrollEndDrag={(event) => onRelease(event)} scrollEventThrottle={10} onScroll={(event) => onScroll(event)} ref={ref}>
        <SearchBar placeholder="Search" 
          containerStyle={{ backgroundColor: 'white', borderTopWidth: 0, borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { height: 10, width: 0 }, 
            shadowOpacity: !scrolled ? 0.05 : 0, shadowRadius: 5, borderBottomLeftRadius: 30  * roundDelta, borderBottomRightRadius: 30  * roundDelta, marginBottom: 10, paddingTop: 0 }}
          inputStyle={{ backgroundColor: '#F5F4FA' }}
          inputContainerStyle={{ backgroundColor: '#F5F4FA', alignSelf: 'center', borderRadius: 10, marginBottom: 10, width: '95%' }}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default Chats;