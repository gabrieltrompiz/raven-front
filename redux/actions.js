import { SET_USER, DELETE_USER, ADD_MESSAGE, SET_CONNECTED } from './actionTypes'

export const setUser = user => ({
  type: SET_USER,
  payload: {
    user
  }
});

export const deleteUser = () => ({
  type: DELETE_USER,
  payload: {}
});

export const addMessage = (message, id) => ({
  type: ADD_MESSAGE,
  payload: {
    message,
    id
  }
})

export const setConnected = connected => ({
  type: SET_CONNECTED,
  payload: {
    connected
  }
})

export const setChatsTimeline = (chats, timeline) => ({
  type: SET_CHATS,
  payload: {
    chats,
    timeline
  }
})