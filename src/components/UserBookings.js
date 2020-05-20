import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserBookings } from "../store"
import { useParams } from "react-router-dom";
import { Global, Container, Item } from '../styles'
import BookingCard from "./BookingCard";
import data from '../data'
import history from "../utils/history";
const moment = require("moment");

function UserBookings() {
  const userBookings = useSelector(state => state.userBookings);
  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUserBookings(userId))
  }, []); 

  //render bookings. 
    //for each booking, render a booking card 

  console.log('bookings are... ', userBookings);
    return (
      <>
      <h1>Your Bookings</h1>
      { userBookings ? userBookings.map((booking, i) => 
      <BookingCard key={booking.id} number={i} booking={booking}/>)
    : "You haven't made any bookings yet." }
    </>
    )
}

export default UserBookings; 
