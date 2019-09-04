import { SET_USER, DELETE_USER, ADD_MESSAGE, SET_CONNECTED, SET_CHAT_TIMELINE, SEND_MESSAGE, ADDED_TO_GROUP, SET_BACKGROUND,
   SET_STATUS, SET_STATUS_LIST, SET_DARK } from '../actionTypes'

const initialState = {
  user: null,
  chats: {},
  connected: false,
  timeline: [],
  background: '#63BDCF',
  dark: false
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
          chats[id].id = id
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
      const { message, to, user } = action.payload
      const chats = Object.assign({}, state.chats)
      let timeline = [...state.timeline]
      if(typeof chats[to] === 'undefined') {
        chats[to] = {}
        chats[to].messages = []
        chats[to].user = user
      }
      chats[to].messages.push(message)
      if(timeline.includes(to) && timeline.indexOf(to) > 0) {
        timeline.splice(timeline.indexOf(to))
        timeline.unshift(to)
      } else if(timeline.indexOf(to) === -1) {
        timeline.unshift(to)
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
      chats[group.id] = {}
      chats[group.id].messages = []
      chats[group.id].creator = group.creator
      chats[group.id].participants = group.users
      chats[group.id].creationTime = group.creationTime
      chats[group.id].name = group.name
      chats[group.id].type = group.type
      let timeline = [...state.timeline]
      if(timeline.includes(group.id) && timeline.indexOf(group.id) > 0) {
        timeline.splice(timeline.indexOf(group.id))
        timeline.unshift(group.id)
      } else if(timeline.indexOf(group.id) === -1) {
        timeline.unshift(group.id)
      }
      return {
        ...state,
        chats: chats,
        timeline: timeline
      }
    }

    case SET_BACKGROUND: {
      const { background } = action.payload
      return {
        ...state, 
        background: background
      }
    }

    case SET_STATUS: {
      const { status } = action.payload;
      return {
        ...state,
        status: status
      }
    }

    case SET_STATUS_LIST: {
      const { statusList } = action.payload;
      return {
        ...state,
        statusList: statusList
      }
    }

    case SET_DARK: {
      const { dark } = action.payload;
      return {
        ...state,
        dark
      }
    }

    default: return state;
  }
}