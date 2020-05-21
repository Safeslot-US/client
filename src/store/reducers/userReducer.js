import axios from "axios";
import { API_URL } from "../../common/consts"; 

//Action Types 
const GET_USER = "GET_USER";

//Action Creators 
const getUser = user => {
    return { type: "GET_USER", user };
}

//Thunks 
export const fetchUser = (userId) => {
    return dispatch => {
        axios.get(`${API_URL}/users/${userId}`)
            .then(res => res.data)
            .then(user => {
                dispatch(getUser(user))
            })
            .catch(console.error)
    }
}


//Reducer 
const userReducer = function(state=null, action ){
    switch (action.type) {
        case GET_USER: 
            return action.user;
        default: 
            return state;
    }
}

export default userReducer; 