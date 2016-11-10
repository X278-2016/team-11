import { combineReducers } from 'redux'
import {GET_CURRENT_USER} from './actions'

function getCurrentUser(state = [], action) {
    switch (action.type) {
        case GET_CURRENT_USER:
        	return Object.assign({}, state, action.data);
            //return Object.assign({}, state, {myData: action.data});
        default:
            return state
    }
}

//api call and api call to initially fetch
const mainPage = combineReducers({
    getCurrentUser//,other things
});

export default mainPage