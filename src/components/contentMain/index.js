import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from 'views/home';
import Modify from 'views/modify_password';

/* 订单管理 */
import Promotion from 'views/orderManage/promotion'; // 股东活动订单
import CouponOrder from 'views/orderManage/coupon'; // 优惠券订单

/* 配置管理 */
import Gold from 'views/configuration_manage/gold';  // 金币配置
import Announcement from 'views/configuration_manage/announcement'; // 公告管理

/* 积分与会员配置 */
import IntegralRule from 'views/integralmember_manage'; // 积分规则

/* 小店管理 */
import Store from 'views/store_manage'; // 店铺管理

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
                    <Route exact path='/announcement' component={ Announcement }/>
                    <Route exact path='/integralRule' component={ IntegralRule }/>
                    <Route exact path='/store' component={ Store }/>
                    <Redirect exact from='/' to='/home'/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(ContentMain);