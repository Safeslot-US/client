import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import slotsReducer from './reducers/slotsReducer';
import storeReducer from './reducers/storeReducer';

const reducer = combineReducers({slots: slotsReducer, store: storeReducer})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store;
export * from "./reducers/slotsReducer"; 
export * from "./reducers/storeReducer";