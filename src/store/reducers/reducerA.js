import axios from 'axios'
import {apiURL} from '../../utils'

// this is just an example reducer. you can use it to create a template for your own reducer

/**
 * ACTION TYPES
 */
const SET_VALUE = 'SET_VALUE'

/**
 * INITIAL STATE
 */
const initialState = {
  value: 0,
}

/**
 * ACTION CREATORS
 */
export const setValue = (value) => ({
  type: SET_VALUE,
  value,
})

/**
 * THUNK CREATORS
 */
export const fetchValue = () => async (dispatch) => {
  const {data} = await axios.get(`${apiURL}/value`)
  dispatch(setValue(data))
}

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_VALUE:
      return {...state, value: action.value}
    default:
      return state
  }
}
