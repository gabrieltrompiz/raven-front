import { AsyncStorage } from 'react-native'

export const setUser = async (store, user) => {
  await AsyncStorage.setItem('RAVEN-USER', JSON.stringify(user))
  store.setState({ user })
}