import {createStore, combineReducers} from 'redux'
import {reducerA} from './reducers'

const rootReducer = combineReducers(reducerA)

export const store = createStore(rootReducer)
