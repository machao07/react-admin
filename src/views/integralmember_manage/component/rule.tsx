import React, {Component} from 'react';
import { Form, Input } from 'antd';

class Rule extends Component {
    render(){
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        }
        const onFinish = (values: any) => {
            console.log('Success:', values);
        }
        return(
            <div>
                <p className="mb15">支付金额兑换积分规则：</p>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        label="积分价值"
                        name="moneyCreditRatio"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input className="w200"/>
                        
                    </Form.Item>
                    <Form.Item>
                        <p>兑换率：100%   用户消费金额转化为积分的比例。</p>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Rule;