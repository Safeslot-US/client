import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { availSlotsReducer, allSlotsReducer } from './reducers/slotsReducer';
import storeReducer from './reducers/storeReducer';
import bookingsReducer from './reducers/bookingsReducer';
import emailReducer from './reducers/emailReducer';

const reducer = combineReducers({ availSlots: availSlotsReducer, allSlots: allSlotsReducer, store: storeReducer, bookings: bookingsReducer })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store;
export * from "./reducers/slotsReducer"; 
export * from "./reducers/storeReducer";
export * from "./reducers/bookingsReducer";
export * from "./reducers/emailReducer";