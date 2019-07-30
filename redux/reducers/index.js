import { SET_USER, DELETE_USER, ADD_MESSAGE, SET_CONNECTED, SET_CHAT_TIMELINE, SEND_MESSAGE, ADDED_TO_GROUP } from '../actionTypes'
import { AsyncStorage } from 'react-native'

const initialState = {
  user: null,
  chats: {},
  connected: false,
  timeline: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_USER: {
      const { user } = action.payload
      return {
        ...state, 
        user: user
      }
    }

    case DELETE_USER: {
      return {
        ...state,
        user: null
      }
    }

    case ADD_MESSAGE: {
      const { message, id } = action.payload
      const chats = Object.assign({}, state.chats);
      let timeline = [...state.timeline]
      if(message.type === 1) {
        if(typeof chats[message.user.email] === 'undefined') {
          chats[message.user.email] = {}
          chats[message.user.email].messages = []
          chats[message.user.email].user = message.user
        }
        chats[message.user.email].messages.push(message)
        if(timeline.includes(message.user.email) && timeline.indexOf(message.user.email) > 0) {
          timeline.splice(timeline.indexOf(message.user.email))
          timeline.unshift(message.user.email)
        } else if(timeline.indexOf(message.user.email) === -1) {
          timeline.unshift(message.user.email)
        }
      }
      else {
        if(typeof chats[id] === 'undefined') {
          chats[id] = {}
          chats[id].messages = []
          chats[id].user = message.user
        }
        chats[id].messages.push(message)
        if(timeline.includes(id) && timeline.indexOf(id) > 0) {
          timeline.splice(timeline.indexOf(id))
          timeline.unshift(id)
        } else if(timeline.indexOf(id) === -1) {
          timeline.unshift(id)
        }
      }
      return {
        ...state,
        chats: chats,
        timeline: timeline
      }
    }

    case SET_CONNECTED: {
      const { connected } = action.payload
      return {
        ...state,
        connected: connected 
      }
    }

    case SET_CHAT_TIMELINE: {
      const { chats, timeline } = action.payload
      return {
        ...state,
        chats: chats,
        timeline: timeline
      }
    } 

    case SEND_MESSAGE: {
      const { message, to } = action.payload
      const chats = Object.assign({}, state.chats)
      let timeline = [...state.timeline]
      if(message.type === 1) {
        if(typeof chats[to.email] === 'undefined') {
          chats[to.email] = {}
          chats[to.email].messages = []
          chats[to.email].user = to
        }
        chats[to.email].messages.push(message)
        if(timeline.includes(to.email) && timeline.indexOf(to.email) > 0) {
          timeline.splice(timeline.indexOf(to.email))
          timeline.unshift(to.email)
        } else if(timeline.indexOf(to.email) === -1) {
          timeline.unshift(to.email)
        }
      }
      
      return {
        ...state,
        chats: chats,
        timeline: timeline
      }
    }

    case ADDED_TO_GROUP: {
      const { group } = action.payload
      const chats = Object.assign({}, state.chats)
      chats[group.chat.id] = {}
      chats[group.chat.id].messages = []
      chats[group.chat.id].user = group.creator
      let timeline = [...state.timeline]
      if(timeline.includes(group.chat.id) && timeline.indexOf(group.chat.id) > 0) {
        timeline.splice(timeline.indexOf(group.chat.id))
        timeline.unshift(group.chat.id)
      } else if(timeline.indexOf(group.chat.id) === -1) {
        timeline.unshift(group.chat.id)
      }
      return {
        ...state,
        chats: chats,
        timeline: timeline
      }
    }

    default: return state;
  }
}