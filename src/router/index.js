import React from 'react'
import {Switch, Route, HashRouter} from 'react-router-dom'

import App from '../App'
import Login from '../views/login'

class MRoute extends React.Component {
  render (){
    return(
      <HashRouter>
        <Switch>
          <Route path="/login" component={ Login } />
          <App />
        </Switch>
      </HashRouter>
    )
  }
}

export default MRoute