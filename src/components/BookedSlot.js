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
   
    useEffect(() => {
      dispatch(fetchSlot(slotId))
    }, []);

    return (
     <div>
         <br /> 
         <br /> 
        <br /> 
         { slot ? slot.bookings.map(booking => {
             return <StoreBookingCard key={booking.id} booking={booking}/> 
         }) : "This slot has no bookings"
        }
     </div>
    );
  }
  
  export default BookedSlot; 