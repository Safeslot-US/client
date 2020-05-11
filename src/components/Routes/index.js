import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage} from '../../components'
import BookingConfirmation from '../BookingConfirmation';
import Slots from '../Slots';

class Routes extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component= {HomePage} />
        <Route exact path="/stores/:storeId/slots" component= {Slots} /> 
        <Route exact path="/bookingConfirmation" component= {BookingConfirmation} /> 
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    )
    }
}

export default Routes; 
