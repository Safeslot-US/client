import axios from "axios";

//Action Types 
const GET_AVAIL_SLOTS = "GET_AVAIL_SLOTS";

//Action Creators 
const getAvailSlots = slots => {
    return { type: "GET_AVAIL_SLOTS", slots };
}

//Thunks 
export const fetchAvailSlots = (storeId) => {
    return dispatch => {
        axios.get("/api/availableSlots", storeId)
            .then(res => res.data)
            .then(slots => {
                dispatch(getAvailSlots(slots))
            })
            .catch(console.error)
    }
}

//Reducer 
const slotsReducer = function(state=null, action ){
    switch (action.type) {
        case GET_AVAIL_SLOTS: 
            return action.slots;
        default: 
            return state;
    }
}

export default slotsReducer; 