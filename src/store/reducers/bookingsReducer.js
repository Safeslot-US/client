import axios from 'axios';
import { API_URL } from "../../common/consts"; 

const GET_BOOKINGS = 'GET_BOOKINGS';

const POST_BOOKING = 'POST_BOOKING';

const getBookings = bookings => {
    return { type: GET_BOOKINGS, bookings }
}

const addBooking = booking => {
    return { type: POST_BOOKING, booking }
}

export const fetchUserBookings = userId => {
    return dispatch => {
        axios.get(`${API_URL}/users/${userId}/bookings`)
            .then(res => res.data)
            .then(bookings => {
                dispatch(getBookings(bookings))
            })
            .catch(err => console.log(err))
    }
}

export const fetchStoreBookings = storeId => {
    return dispatch => {
        axios.get(`${API_URL}/stores/${storeId}/bookings`)
            .then(res => res.data)
            .then(bookings => {
                dispatch(getBookings(bookings))
            })
            .catch(err => console.log(err))
    }
}

export const postBooking = (newBooking, bookingId) => {
    return dispatch => {
        axios.post(`${API_URL}/bookings`, newBooking)
            .then(res => res.data)
            .then(createdBooking => {
                dispatch(addBooking(createdBooking))
            })
            .catch(err => console.log(err))
    }
}

export const userBookingsReducer = function(state=null, action) {
    switch (action.type) {
        case GET_BOOKINGS: 
            return action.bookings
        default: 
            return state; 
    }
}

export const storeBookingsReducer = function(state=null, action) {
    switch (action.type) {
        case GET_BOOKINGS: 
            return action.bookings
        default: 
            return state; 
    }
}