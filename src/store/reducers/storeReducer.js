import axios from "axios";

//Action Types 
const GET_STORE = "GET_STORE";
const EDIT_STORE = "EDIT_STORE";

//Action Creators 
const getStore = store => {
    return { type: "GET_STORE", store };
}

const updateStore = (store) => {
    return { type: "EDIT_STORE", store}
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

export const editStore = (store, editedObj) => {
    return dispatch => {
        axios.patch(`/api/stores/${store.id}`, editedObj)
            .then(res => res.data) 
            .then(editedStore => {
                dispatch(updateStore(editedStore))
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