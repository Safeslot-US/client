import axios from 'axios';

const GET_BOOKINGS = 'GET_BOOKINGS';

const POST_BOOKING = 'POST_BOOKING';

const getBookings = bookings => {
    return { type: GET_BOOKINGS, bookings }
}

const addBooking = booking => {
    return { type: POST_BOOKING, booking }
}

export const fetchBookings = userId => {
    return dispatch => {
        axios.get(`/api/users/${userId}/bookings`)
            .then(res => res.data)
            .then(bookings => {
                dispatch(getBookings(bookings))
            })
            .catch(err => console.log(err))
    }
}

export const postBooking = (newBooking, bookingId) => {
    return dispatch => {
        axios.post("/api/bookings", newBooking)
            .then(res => res.data)
            .then(createdBooking => {
                dispatch(addBooking(createdBooking))
            })
            .catch(err => console.log(err))
    }
}

const bookingsReducer = function(state=null, action) {
    switch (action.type) {
        case GET_BOOKINGS: 
            return action.bookings
        default: 
            return state; 
    }
}

export default bookingsReducer; 