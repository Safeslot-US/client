import React, { useEffect } from 'react';
import { fetchStoreBookings, fetchStore } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const _ = require("lodash");
const moment = require("moment");

//Adapted from Material UI's https://codesandbox.io/s/tfbeb

const useStyles = makeStyles((theme) => ({
    root: {
      width: '25%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  
function OwnerPortal(){
    const bookedSlots = useSelector(state => state.storeBookings);
    const store = useSelector(state => state.store);
    let { storeId } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(fetchStoreBookings(storeId))
        dispatch(fetchStore(storeId))
    }, [])

    const slotsByHour = _.groupBy(bookedSlots, (slot => slot.startTime.split(":")[0]));
    const sortedHours = Object.keys(slotsByHour).sort();

    //OwnerPortal should also have link to ownerSettings via nav or side bar
    
    return (
        <>  
            <h2>Store Bookings</h2>
            <div> 
            { store ? store.name : null }
            <br /> 
            { store ? store.address : null }
            </div> 
            <br /> 
            <br /> 
            <div className={classes.root}>
                {
                    sortedHours.map(baseHour => {
                        return (
                            <ExpansionPanel key={baseHour}> 
                                <ExpansionPanelSummary 
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                 <Typography className={classes.heading}>{moment(baseHour, "HH:mm").format("h:mm a")}</Typography>
                                </ExpansionPanelSummary> 
                                <ExpansionPanelDetails>
                                <Typography>
                                       { slotsByHour[baseHour].map(slot => {
                                           return (
                                           <div key={slot.id}> <a href= {slot && `/slots/${slot.id}`}>{`${moment(slot.startTime, "HH:mm").format("h:mm")}`} - {`${moment(slot.endTime, "HH:mm").format("h:mm a")}`}</a> </div>
                                           )
                                       })}
                                </Typography>
                                </ExpansionPanelDetails>

                            </ExpansionPanel>
                        )
                    })
                }
          </div> 
        </>
    )
}

export default OwnerPortal; 