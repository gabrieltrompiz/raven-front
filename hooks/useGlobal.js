import React from 'react'
import useGlobalHook from './globalState.js'

import * as actions from './actions'

const initialState = {
  user: null
}

const useGlobal = useGlobalHook(React, initialState, actions)

export default useGlobal;