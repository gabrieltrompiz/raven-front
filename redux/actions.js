import { SET_USER, DELETE_USER, ADD_MESSAGE, SET_CONNECTED, SEND_MESSAGE, ADDED_TO_GROUP } from './actionTypes'

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

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: {
    message,
    to
  }
})

export const addedToGroup = group => ({
  type: ADDED_TO_GROUP,
  payload: {
    group
  }
})