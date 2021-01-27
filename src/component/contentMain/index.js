import React, { Component } from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from '../../views/home'
import Modify from '../../views/modify_password'
import Promotion from '../../views/orderManage/promotion'
import CouponOrder from '../../views/orderManage/coupon'

class ContentMain extends Component {
    render() {
        return (
            <div className="content">
                <Switch>
                    <Route exact path="/home" component={ Home } />
                    <Route exact path="/modify" component={ Modify } />
                    <Route exact path='/promotion' component={ Promotion }/>
                    <Route exact path='/couponOrder' component={ CouponOrder }/>
                    <Redirect exact from='/' to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(ContentMain);