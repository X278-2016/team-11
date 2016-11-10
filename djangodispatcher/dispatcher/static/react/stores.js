import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import mainPage from './reducer'

let store = createStore(mainPage,
    applyMiddleware(
        thunkMiddleware // lets us dispatch() functions
    )
);

export default store