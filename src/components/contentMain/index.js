import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../../views/home';
import Modify from '../../views/modify_password';

/* 订单管理 */
import Promotion from '../../views/orderManage/promotion';
import CouponOrder from '../../views/orderManage/coupon';

/* 配置管理 */
import Gold from '../../views/configuration_manage/gold';

/* 积分与会员配置 */
import IntegralRule from '../../views/integralmember_manage';

class ContentMain extends Component {
    render() {
        return (
            <div className="content">
                <Switch>
                    <Route exact path="/home" component={ Home } />
                    <Route exact path="/modify" component={ Modify } />
                    <Route exact path='/promotion' component={ Promotion }/>
                    <Route exact path='/couponOrder' component={ CouponOrder }/>
                    <Route exact path='/gold' component={ Gold }/>
                    <Route exact path='/integralRule' component={ IntegralRule }/>
                    <Redirect exact from='/' to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(ContentMain);