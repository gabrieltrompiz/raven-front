import { SET_USER, DELETE_USER, ADD_MESSAGE } from './actionTypes'

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