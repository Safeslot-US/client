import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { availSlotsReducer, allSlotsReducer, slotReducer } from './reducers/slotsReducer';
import storeReducer from './reducers/storeReducer';
import { userBookingsReducer, storeBookingsReducer } from './reducers/bookingsReducer';
import emailReducer from './reducers/emailReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers(
  { 
    availSlots: availSlotsReducer, 
    allSlots: allSlotsReducer, 
    slot: slotReducer,
    store: storeReducer, 
    userBookings: userBookingsReducer, 
    storeBookings: storeBookingsReducer, 
    user: userReducer
  }
);

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
export * from "./reducers/userReducer";