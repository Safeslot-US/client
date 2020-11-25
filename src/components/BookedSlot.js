import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { fetchSlot } from "../store";
import { useParams } from "react-router-dom";
import StoreBookingCard from "./StoreBookingCard";

function BookedSlot() {
    const dispatch = useDispatch();
    const slot = useSelector(state => state.slot);
    const user = useSelector(state => state.user);
    let { slotId } = useParams();
   
    //so actually i guess it's better to just fetch all the bookings for this time slot, an
    useEffect(() => {
      dispatch(fetchSlot(slotId))
    }, []);

    const bookings = slot && slot.bookings.map(booking => {
       return <StoreBookingCard key={booking.id} booking={booking} slot={slot} />
    })

    return (
     <div>
         <br /> 
         <br /> 
        <br /> 
        { bookings } 
     </div>
    );
  }
  
  export default BookedSlot; 