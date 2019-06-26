import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import AppHeader from '../components/AppHeader';
import { SearchBar } from 'react-native-elements';

const Chats: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  const ref = useRef(null)

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
     if(Math.trunc(event.nativeEvent.contentOffset.y) >= 63 && !scrolled) {
      setScrolled(true)
    }
    else if(Math.trunc(event.nativeEvent.contentOffset.y) < 63 && scrolled) {
      setScrolled(false)
    }
  }

  const onRelease = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if(Math.trunc(event.nativeEvent.contentOffset.y) >= 28) {
      ref.current.scrollTo({ x: 0, y: 68, animated: true })
    }
    else if(Math.trunc(event.nativeEvent.contentOffset.y) < 28)  {
      ref.current.scrollTo({ x: 0, y: 0, animated: true })
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader title='Chats' color='#fff' shadow={scrolled}/>
      <ScrollView style={{ flex: 1 }} onScrollEndDrag={(event) => onRelease(event)} scrollEventThrottle={10} onScroll={(event) => onScroll(event)} ref={ref}>
        <SearchBar placeholder="Search" 
          containerStyle={{ backgroundColor: 'white', borderTopWidth: 0, borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { height: 10, width: 0 }, 
            shadowOpacity: !scrolled ? 0.05 : 0, shadowRadius: 5, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginBottom: 10, paddingTop: 0 }}
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