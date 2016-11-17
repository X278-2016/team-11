import { combineReducers } from 'redux'
import {GET_CURRENT_USER, GET_OPERATOR_DATA} from './actions'

function getCurrentUser(state = [], action) {
    switch (action.type) {
        case GET_CURRENT_USER:
        	return Object.assign({}, state, action.data);
        default:
            return state
    }
}

function operatorData(state = [], action) {
    switch (action.type) {
        case GET_OPERATOR_DATA:
        	return Object.assign({}, state, action.data);
        default:
            return state
    }
}

const mainPage = combineReducers({
    getCurrentUser, operatorData
});

export default mainPage