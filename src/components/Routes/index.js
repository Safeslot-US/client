import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {HomePage} from '../../components'
import Slots from '../Slots';

class Routes extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/stores/:storeId/slots" component={Slots} /> 
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    )
    }
}

export default Routes; 
