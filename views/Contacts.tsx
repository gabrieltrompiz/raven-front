import React, { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import AppHeader from '../components/AppHeader';
import { SearchBar } from 'react-native-elements';
import { SocketContext } from '../services/ServiceContext';
import { User } from '../types';
import { useSelector } from 'react-redux'
import ContactContainer from '../components/ContactContainer';
import { NavigationContainerProps } from 'react-navigation';

const Contacts: React.FC<NavigationContainerProps> = ({ navigation }) => {
  const socket = useContext(SocketContext)
  const connected = useSelector(state => state.connected)
  const loggedUser = useSelector(state => state.user)
  
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    if(connected) {
      _subscribeToEvents()
    }
  }, [connected])

  useEffect(() => {
    if(search.trim() !== '') {
      socket.search(search)
    } else {
      setResults([])
    }
  }, [search])

  const _subscribeToEvents = () => {
    socket.onSearch().subscribe((u: User[]) => {
      setResults(u)
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <AppHeader title='Contacts' color='#FFF' />
      <SearchBar placeholder="Search"
        containerStyle={{ backgroundColor: 'white', borderTopWidth: 0, borderBottomWidth: 0, shadowColor: '#DCDEF4', shadowOffset: { height: 10, width: 0 },
          shadowOpacity: 0.3, shadowRadius: 5, marginBottom: 10, paddingTop: 0, minHeight: 0, width: '100%' }} value={search}
        inputStyle={{ backgroundColor: '#F5F4FA', opacity: 1, minHeight: 0 }}
        inputContainerStyle={{ backgroundColor: '#F5F4FA', alignSelf: 'center', borderRadius: 10, marginBottom: 10, width: '95%' }}
        leftIconContainerStyle={{ opacity: 1 }}
        onChange={(event) => setSearch(event.nativeEvent.text)}
      />
      {results.map((user, i) => {
        const _user = { id: user.user_id, email: user.user_email, name: user.user_name, username: user.user_username, status: user.user_status, pictureUrl: user.user_picture_url }
        if(loggedUser.id !== _user.id) {
          return (<ContactContainer key={i} user={_user} status='Available' action={() => { navigation.navigate('ChatView', { user: _user }) }} />)
        }
      })}
    </View>
  );
}

export default Contacts;