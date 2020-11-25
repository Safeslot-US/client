import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAvailSlots, fetchAllSlotsToday, fetchStore, postBooking, postEmail } from "../store"
import { useParams } from "react-router-dom";
import { useTransition, useSpring, useChain, config, animated } from 'react-spring'
import { Global, Container, Item } from '../styles'
import data from '../data'
import history from "../utils/history";
const moment = require("moment");

 //Adapted from https://codesandbox.io/embed/2v716k56pr

function Slots() {
  const slots = useSelector(state => state.availSlots);
  const store = useSelector(state => state.store); 
  const allSlotsToday = useSelector(state => state.allSlots);
  const dispatch = useDispatch();
  const [open, set] = useState(false);
  let { storeId } = useParams();

  useEffect(() => {
    dispatch(fetchAvailSlots(storeId));
    dispatch(fetchAllSlotsToday(storeId));
    dispatch(fetchStore(storeId))
  }, []); 

  const springRef = useRef()
  const { size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff, 
    from: { size: '20%', background: 'hotpink' },
    to: { size: open ? '100%' : '20%', background: open ? 'white' : 'hotpink' }
  })

  const formattedSlotsWithCSS = slots ? slots.map((slot, index) => {
    slot.formattedStartTime= moment(slot.startTime, 'HH:mm').format("h:mm a");
    slot.formattedEndTime = moment(slot.endTime, 'HH:mm').format("h:mm a")
    slot.css = data[index % data.length].css; 
    return slot; 
  }) : null;

  const transRef = useRef();
  const transitions = useTransition(open ? formattedSlotsWithCSS : [], item => item.id, {
    ref: transRef,
    unique: true,
    trail: 400 / data.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' }
  })

  const selectBooking = (booking) => {
    //Add once login fully functional-- needs userId and user email passed in:
    // dispatch(postBooking(booking));

    //generate QR code for booking
    // const generatedQRcode = 
    
    // const emailObj = { 
    //   slotDate: moment(booking.date).format("MMM Do YYYY"),
    //   //toAddress: email attached to user account, 
    //   slotTime: `${booking.formattedStartTime} - ${booking.formattedEndTime}`, 
    //   storeName: store.name, 
    //   slotId: booking.id, 
    //   QRcode: generatedQRcode
    // }
    // dispatch(postEmail(emailObj))
    // history.push('/bookingConfirmation')
  }

  // First runs the springRef then runs the transferRef 
  useChain(open ? [springRef, transRef] : [transRef, springRef], [0, open ? 0.1 : 0.6])
  
    return (
      <>
      <Global />
      <Container style={{ ...rest, width: size, height: size }} onClick={() => set(open => !open)}>
      { transitions ? transitions.map(({ item, key, props }) => (
          <Item key={key} style={{ ...props, background: item.css }} onClick= { e => selectBooking(item)} ><br /> {item.formattedStartTime}-{item.formattedEndTime} <br /> <br /></Item>
        )) : "There are no available slots today." }
      </Container>
    </>
    )
}

export default Slots; 

