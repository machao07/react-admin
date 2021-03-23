import React, {Component} from 'react';
import { Row, Col } from 'antd';
import { getDetail } from 'api/order/index'

interface Props {
    currentId: number
}

interface State {
    currentId: number,
    detail: any
}

class Detail extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentId: this.props.currentId,
            detail: {}
        }
    }
    componentDidMount(){
        this.getObj()
    }
    getObj() {
        getDetail(this.state.currentId).then( res => {
            this.setState({
                detail: res.data
            })
        })
    }
    render(){
        return (
            <div>
                <Row>
                    <Col span={3}>订单编号：</Col>
                    <Col span={5}>{this.state.detail.orderId}</Col>
                    <Col span={3}>活动名称：</Col>
                    <Col span={5}>{this.state.detail.activityName}</Col>
                    <Col span={3}>购买用户昵称：</Col>
                    <Col span={5}>{this.state.detail.memberName}</Col>
                </Row>
                <Row>
                    <Col span={3}>绑定手机号：</Col>
                    <Col span={5}>{this.state.detail.mobile?this.state.detail.mobile:'----'}</Col>
                    <Col span={3}>分享人：</Col>
                    <Col span={5}>{this.state.detail.sharer?this.state.detail.sharer:'----'}</Col>
                    <Col span={3}>订单金额：</Col>
                    <Col span={5}>{this.state.detail.payMoney}</Col>
                </Row>
                <Row>
                    <Col span={3}>下单时间：</Col>
                    <Col span={5}>{this.state.detail.timeAt}</Col>
                    <Col span={3}>购买赠送积分：</Col>
                    <Col span={5}>{this.state.detail.credit}</Col>
                    <Col span={3}></Col>
                    <Col span={5}></Col>
                </Row>
                <h4 style={{margin: '10px 0'}}>活动内容：</h4>
                <h4 style={{margin: '10px 0'}}>1、充值套餐</h4>
                <Row>
                    <Col span={3}>购买金额：</Col>
                    <Col span={5}>{this.state.detail.rechargeValue?this.state.detail.rechargeValue:'----'}</Col>
                    <Col span={3}>购买后余额增加：</Col>
                    <Col span={5}>{this.state.detail.rechargeReal}</Col>
                    <Col span={3}></Col>
                    <Col span={5}></Col>
                </Row>
            </div>
        )
    }
}

export default Detail;