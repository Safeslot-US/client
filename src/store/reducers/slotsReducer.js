import axios from "axios";
import { API_URL } from "../../common/consts"; 

//Action Types 
const GET_AVAIL_SLOTS = "GET_AVAIL_SLOTS";
const GET_ALL_SLOTS_TODAY = "GET_ALL_SLOTS_TODAY";
const GET_SLOT = "GET_SLOT";
const UPDATE_SLOT = "UPDATE_SLOT";

//Action Creators 
const getAvailSlots = slots => {
    return { type: "GET_AVAIL_SLOTS", slots };
}

const getAllSlotsToday = slots => {
    return { type: "GET_ALL_SLOTS_TODAY", slots };
}

const updateSlot = slot => {
    return { type: "UPDATE_SLOTS", slot };
}

const getSlot = slot => {
    return { type: "GET_SLOT", slot };
}

//Thunks 
export const fetchAvailSlots = (storeId) => {
    return dispatch => {
        axios.get(`${API_URL}/allSlotsToday`, storeId)
            .then(res => res.data)
            .then(slots => {
                const avail = slots.filter((booking) => {
                    let numBookings = booking.bookings.length; 
                    let maxPeoplePerSlot = booking.maxPeoplePerSlot; 
                    return numBookings < maxPeoplePerSlot; 
                })
                dispatch(getAvailSlots(avail))
            })
            .catch(console.error)
    }
}

export const fetchAllSlotsToday = (storeId) => {
    return dispatch => {
        axios.get(`${API_URL}/allSlotsToday`, storeId)
            .then(res => res.data)
            .then(slots => {
                dispatch(getAllSlotsToday(slots))
            })
            .catch(console.error)
    }
}

export const editSlot = (slotId, newMaxPeoplePerSlot) => {
    return dispatch => {
        axios.patch(`${API_URL}/slots/${slotId}`, { maxPeoplePerSlot: newMaxPeoplePerSlot } )
            .then(res => res.data)
            .then(updatedSlot => {
                dispatch(updateSlot(updatedSlot))
            })
            .catch(console.error)
    }
}

export const fetchSlot = slotId => {
    return dispatch => {
        axios.get(`${API_URL}/slots/${slotId}`)
            .then(res => res.data)
            .then(slot => {
                dispatch(getSlot(slot))
            })
            .catch(console.error)
    }
}

//Reducer 
export const availSlotsReducer = function(state=null, action ){
    switch (action.type) {
        case GET_AVAIL_SLOTS: 
            return action.slots;
        default: 
            return state;
    }
}

export const allSlotsReducer = function(state=null, action) {
    switch (action.type) {
        case GET_ALL_SLOTS_TODAY: 
            return action.slots; 
        case UPDATE_SLOT: 
            return state.map(slot => (
                action.slot.id === slot.id ? action.slot : slot
            ))
        default: 
            return state;
    }
}

export const slotReducer = function(state=null, action) {
    switch (action.type) {
        case GET_SLOT: 
            return action.slot; 
        default: 
            return state; 
    }
}