import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {HomePage} from '../../components'

const Routes = function (props) {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  )
}
export default Routes
