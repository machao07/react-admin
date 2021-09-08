import { Form, Input } from 'antd';
import React, { Component } from 'react';

class Rules extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    render() {
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        };
        const onFinish = (values: any) => {

        };

        return (
            <div>
                <p style={{ color: '#999', textAlign: 'center', marginBottom: '15px' }}>结算规则配置成功后，积分兑换的商品将按照结算规则进行分佣~</p>
                <Form
                    {...layout}
                    name="basic"
                    labelAlign="left"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="推广人佣金"
                        className="ml20"
                        name="coinCredit"
                        >
                            <Form.Item>
                                <Input type='number' className="w200" placeholder="请输入" suffix="%" />
                            </Form.Item>
                            <p style={{fontSize: 12, color: 'red'}}>支持小数点后1位配置成功，每个商品订单金额将按照此比例作为佣金分给店主的上级股东</p>
                    </Form.Item>
                    <Form.Item
                        label="股东分佣"
                        className="ml20"
                        >
                            <Form.Item
                            label="银卡股东分佣"
                            name="silver">
                                <Input type='number' className="w200" placeholder="请输入" suffix="%" />
                            </Form.Item>
                            <Form.Item
                            label="金卡股东分佣"
                            name="gold">
                                <Input type='number' className="w200" placeholder="请输入" suffix="%" />
                            </Form.Item>
                            <Form.Item
                            label="黑卡股东分佣"
                            name="black">
                                <Input type='number' className="w200" placeholder="请输入" suffix="%" />
                            </Form.Item>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Rules;