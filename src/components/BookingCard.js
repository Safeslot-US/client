import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux"
import { fetchSlot, fetchStore } from "../store";
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const moment = require("moment");

//Adapted from Material UI's https://codesandbox.io/s/e2z1m?file=/demo.js

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function BookingCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const slot = useSelector(state => state.slot);
  const store = useSelector(state => state.store);

  useEffect(() => {
    dispatch(fetchSlot(props.booking.slotId));
    dispatch(fetchStore(props.booking.storeId))
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          { slot ? moment(slot.date).format("L") : null }
        </Typography>
        <Typography variant="h5" component="h2">
          {store && store.name }
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          { store && store.address }
        </Typography>
        <Typography variant="body2" component="p">
            Slot Time: { slot && moment(slot.startTime, 'HH:mm').format("h:mm a")} - { slot && moment(slot.endTime, 'HH:mm').format("h:mm a")}
            <br /> 
            QR Code: 
          <br />
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" a href={ store && `/stores/${store.id}/slots`}>Book Store Again</Button> 
      </CardActions>
    </Card>
  );
}

export default BookingCard; 