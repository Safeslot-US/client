import React, { useState, useEffect } from 'react';
import { fetchStore } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
const moment = require("moment");

function OwnerSettings(){
    const store = useSelector(state => state.store);
    let { storeId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStore(storeId))
    }, [])

    function formatHour(time) {
        const [ hour, min ] = time.split(":");
        if (hour === 12){ 
            return `${hour}:${min} p.m.`
        } else if (hour < 12) {
            return `${hour % 12}:${min} a.m.`
        } else { 
            return `${hour % 12}:${min} p.m.`
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(e.target.value);
    }

    return (
        <>
        <div>Settings</div>
        <br /> 
        <form onSubmit={handleSubmit}>
        <div>{store ? store.name : null}</div>
        <div>Phone Number: {store ? store.phoneNumber : null}</div>
        <br /> 
        <div>Opening Hour: {store && formatHour(store.openingHour)}</div>
        <div>Closing Hour: {store && formatHour(store.closingHour)}</div>
        <div>Max People Per Slot: { store && store.maxPeoplePerSlot}</div>
        <div>Slot Duration: {store && store.slotDuration} minutes </div>
        <br /> 
        <button>Save Changes</button>
        <br /> 
        </form> 
        <br /> 
        If any customers have already booked slots, changes to slot duration and max people per slot will apply for tomorrow's slots.

        </>
    )
}

export default OwnerSettings; 