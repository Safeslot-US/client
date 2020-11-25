import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAvailSlots, fetchAllSlotsToday, fetchStore, postBooking, postEmail } from "../store"
import { useParams } from "react-router-dom";
import { useTransition, useSpring, useChain, config, animated } from 'react-spring'
import { Global, Container, Item } from '../styles'
const QRCode = require("qrcode");


function Test() {
  const slots = useSelector(state => state.availSlots);
  
  
    const hm = QRCode.toString("I am a pony")
    .then(code => {{
      return code; 
    }})
    .catch(err => {
      return err; 
    });
      
    console.log('hm is ', hm);
    return (
      <>
      hi
    </>
    )
}

export default Test; 
