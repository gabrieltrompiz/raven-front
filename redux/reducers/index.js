import { SET_USER, DELETE_USER, ADD_MESSAGE } from '../actionTypes'

const initialState = {
  user: null,
  chats: {}
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
      if(typeof chats[id] === 'undefined') {
        chats[id] = {}
        chats[id].messages = []
        chats[id].user = message.user
      }
      chats[id].messages.push(message)
      return {
        ...state,
        chats: chats
      }
    }

    default: return state;
  }
}