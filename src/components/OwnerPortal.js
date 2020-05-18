import React, { useState, useEffect } from 'react';
import { fetchStoreBookings } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
const moment = require("moment");

function OwnerPortal(){
    //get bookings for their store today-- sorted by each time slot (owner can click time slot, and then sees all booked names)
        //each booking should have the customer's QR code on it 
    const bookings = useSelector(state => state.bookings);
    let { storeId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStoreBookings(storeId))
    }, [])

    const dateToday = moment().format("MMMM Do, YYYY");
    console.log('bookings looks like ', bookings);

    return (
        <>
        <div>{dateToday}</div>
        <br /> 
        <div>store's bookings here</div>
        <br /> 
        <a href={`/stores/${storeId}/settings`}>Settings</a> 
        </>
    )
}

export default OwnerPortal; 