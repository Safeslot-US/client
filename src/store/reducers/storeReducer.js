import axios from "axios";

//Action Types 
const GET_STORE = "GET_STORE";

//Action Creators 
const getStore = store => {
    return { type: "GET_STORE", store };
}

//Thunks 
export const fetchStore = (store) => {
    return dispatch => {
        axios.get(`/api/stores/${store}`)
            .then(res => res.data)
            .then(store => {
                dispatch(getStore(store))
            })
            .catch(console.error)
    }
}

//Reducer 
const storeReducer = function(state=null, action ){
    switch (action.type) {
        case GET_STORE: 
            return action.store;
        default: 
            return state;
    }
}

export default storeReducer; 