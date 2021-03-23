import React, { Component } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { getSellerId } from 'utils/storage';
import { getCoin, addCoin } from 'api/configuration/gold';


class Gold extends Component {
    componentDidMount(){
        this.getCoin()
    }
    //金币配置回显 
    getCoin(){
        getCoin(getSellerId()).then( res =>{
            
        })
    }
    render(){
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        };
        const onFinish = (values: object) => {
            console.log(JSON.parse(JSON.stringify(values)))
            const { coinCredit } = JSON.parse(JSON.stringify(values))
            addCoin(getSellerId(), coinCredit).then((res: any) => {
                notification.open({
                    message: '成功',
                    description: '登录成功',
                    type: 'success'
                })
            }).catch(()=>{})
        };
        const onFinishFailed = (errorInfo: object) => {
            console.log('Failed:', errorInfo);
        };
        return (
            <div className="container">
                <div className="ikd-page-header"><div className="title">金币规则配置</div></div>
                <Form
                {...layout}
                name="basic"
                labelAlign="left"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                    <h3 style={{margin:'15px 0 20px 20px'}}>1、金币兑换积分规则</h3>
                    <Form.Item
                    label="1金币&nbsp;=&nbsp;&nbsp;？积分"
                    className="ml20"
                    name="coinCredit">
                        <Input className="w200" placeholder="请输入" />
                    </Form.Item>
                    <h3 style={{margin:'0 0 20px 20px'}}>2、金币提现规则</h3>
                    <Form.Item
                    label="1金币&nbsp;=&nbsp;&nbsp;？元"
                    className="ml20"
                    name="coinMoney">
                        <Input className="w200" placeholder="请输入" disabled />
                    </Form.Item>
                    <Form.Item>
                        <Button className="ml20" shape="round" type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Gold;
