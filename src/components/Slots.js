import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAvailSlots, fetchStore } from "../store"
import { useParams } from "react-router-dom";
import { useTransition, useSpring, useChain, config, animated } from 'react-spring'
import { Global, Container, Item } from '../styles'
import { displayFive } from "../utils/helpers";
import data from '../data'
const moment = require("moment");
const _ = require("underscore");

function Slots() {
  const slots = useSelector(state => state.slots);
  const store = useSelector(state => state.store); 
  const dispatch = useDispatch();
  const [open, set] = useState(false);
  let { storeId } = useParams();

  useEffect(() => {
    dispatch(fetchAvailSlots(storeId));
    dispatch(fetchStore(storeId))
  }, []); 

  const springRef = useRef()
  const { size, opacity, ...rest } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: '30%', background: 'hotpink' },
    to: { size: open ? '100%' : '20%', background: open ? 'white' : 'hotpink' }
  })

  const transRef = useRef()
  const transitions = useTransition(open ? data : [], item => item.name, {
    ref: transRef,
    unique: true,
    trail: 400 / data.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' }
  })

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
// first run the springRef then run the transferRef 
  useChain(open ? [springRef, transRef] : [transRef, springRef], [0, open ? 0.1 : 0.6])

    return (
      <>
      <Global />
      <Container style={{ ...rest, width: size, height: size }} onClick={() => set(open => !open)}>
        {transitions.map(({ item, key, props }) => (
          <Item key={key} style={{ ...props, background: item.css }}>test </ Item>
        ))}
      </Container>
      </> 
    )
  
}



export default Slots; 

    // {/* <div><h3>{store ? store.name : null }</h3>
    //     {moment().format("MMMM Do, YYYY")}</div>  */}
// Create bucket for each hour of schedule 
//     const byHour = _.groupBy(availableSlots, (slot) => { 
//       let formatted = Math.floor(slot.startTime.split(":")[0]);
//       if (formatted < 12) { 
//         return `${formatted} a.m.`
//       } else if (formatted === 12) {
//         return `${formatted} p.m.` 
//       } else { 
//         return `${formatted % 12} p.m.`
//       }
//       })