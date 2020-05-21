import React, { useState, useEffect } from 'react';
import { fetchStore, editStore, editSlot, fetchAllSlotsToday } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import history from "../utils/history";
const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function OwnerSettings(){
    const store = useSelector(state => state.store);
    const allSlotsToday = useSelector(state => state.allSlots);
    let { storeId } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openingHour, setOpeningHour] = useState(new Date()); 
    const [closingHour, setClosingHour] = useState(new Date());
    const [maxPeoplePerSlot, setMaxPeoplePerSlot] = useState(0); 
    const [slotDuration, setSlotDuration] = useState(20);

    useEffect(() => {
         dispatch(fetchStore(storeId))
         dispatch(fetchAllSlotsToday(storeId));
    }, [])

    const isDifferent = (itemOne, itemTwo) => {
        return itemOne != itemTwo ? true : false; 
    }

    const handleSubmit = e => {
        e.preventDefault();
        const openingInMilitaryTime = moment(openingHour).format("HH:mm");
        const closingInMilitaryTime = moment(closingHour).format("HH:mm");
        let editedSettings = { 
            openingHour: openingInMilitaryTime, 
            closingHour: closingInMilitaryTime, 
            maxPeoplePerSlot: maxPeoplePerSlot, 
            slotDuration: slotDuration 
        }
        dispatch(editStore(store, editedSettings));
        const isNewMaxPeople = isDifferent(store.maxPeoplePerSlot, maxPeoplePerSlot);
        if (isNewMaxPeople) {
            allSlotsToday.map(slot => {
                dispatch(editSlot(slot.id, maxPeoplePerSlot)); 
            })
        }
        history.push(`/stores/${storeId}/bookings`);
    }

    //Possibly refactor so that we render the form display from a separate <FormDisplay> presentational component? 
    return (
        <>
        <h2>Settings</h2>
        <h2>{store ? store.name : null} </h2> 
        <form onSubmit={handleSubmit} >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
                <KeyboardTimePicker
                    margin="normal"
                    label="Store Opening Hour"
                    value={openingHour}
                    onChange={e => { setOpeningHour(e) }}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                }}
                />
                <KeyboardTimePicker
                        margin="normal"
                        label="Store Closing Hour"
                        value={closingHour}
                        onChange={e => { setClosingHour(e) }}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControl}>
                    <InputLabel>Slot Duration</InputLabel>
                        <Select
                            value={slotDuration}
                            onChange={e => { setSlotDuration(e.target.value) }}
                        >
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                    </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                    <InputLabel>Max People Per Slot</InputLabel>
                    <Input value={maxPeoplePerSlot} onChange={e => { setMaxPeoplePerSlot(e.target.value) }} />
            </FormControl>
            <br /> 
        <button>Save Changes</button>
        </form> 
        </>
    )
}

export default OwnerSettings; 
