import { combineReducers } from 'redux'
import {GET_COMMITS} from './actions'

function getCommits(state = [], action) {
    switch (action.type) {
        case GET_COMMITS:
            return Object.assign({}, state, {myData: action.data});
        default:
            return state
    }
}

//api call and api call to initially fetch
const mainPage = combineReducers({
    getCommits//,other things
});

export default mainPage