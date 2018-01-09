import { combineReducers } from 'redux'

import {
  GET_MESSAGE, CLOSE_MESSAGE
} from './action'

function CurrentMessageReducer (state={
    message: '',
    messageOpen: false,
    }, action) {
    const { message } = action
    switch (action.type) {
        case GET_MESSAGE:
            return Object.assign({}, state, {
                message,
                messageOpen: true,
            })
        case CLOSE_MESSAGE:
            return Object.assign({}, state, {
                message,
                messageOpen: false,
            })
        default:
            return state
    }
}

export default combineReducers({
  CurrentMessageReducer
})