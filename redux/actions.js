import { SET_USER, DELETE_USER, ADD_MESSAGE, SET_CONNECTED, SEND_MESSAGE, ADDED_TO_GROUP, SET_BACKGROUND, SET_DARK, SET_PIC } from './actionTypes'
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
    to,
    user
  }
})

export const addedToGroup = group => ({
  type: ADDED_TO_GROUP,
  payload: {
    group
  }
})

export const setBackground = background => ({
  type: SET_BACKGROUND,
  payload: {
    background
  }
})

export const changeName = name => ({
  type: CHANGE_NAME,
  payload: {
    name
  }
})

export const changeUsername = username => ({
  type: CHANGE_USERNAME,
  payload: {
    username
  }
})

export const setStatus = status => ({
  type: SET_STATUS,
  payload: {
    status
  }
})

export const setStatusList = statusList => ({
  type: SET_STATUS_LIST,
  payload: {
    statusList
  }
})

export const setDark = dark => ({
  type: SET_DARK,
  payload: {
    dark
  }
})

export const setPic = uri => ({
  type: SET_PIC,
  payload: {
    uri
  }
})