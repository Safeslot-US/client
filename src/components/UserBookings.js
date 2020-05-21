import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserBookings } from "../store"
import { useParams } from "react-router-dom";
import UserBookingCard from "./UserBookingCard";

function UserBookings() {
  const userBookings = useSelector(state => state.userBookings);
  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    dispatch(fetchUserBookings(userId))
  }, []); 

    return (
      <>
      <h1>Your Bookings</h1>
      { userBookings ? userBookings.map((booking) => 
      < UserBookingCard key={ booking.id } booking= { booking }/>)
    : "You haven't made any bookings yet." }
    </>
    )
}

export default UserBookings; 
