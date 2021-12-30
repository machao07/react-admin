import React from 'react'
import { Form, Input, Button, notification } from 'antd';
import { modifyPassword } from 'api/home'

class ModifyPassword extends React.Component {
    state = {
        oldPassWord: undefined,
        newPassWord: undefined,
        re_newPassWord: undefined
    }
    render() {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const tailLayout = {
            wrapperCol: { offset: 6, span: 18 },
        };
        const reRule = [
            { required: true, message: '密码不能为空' },
            {
                validator: async (rule: any, value: any) => {
                    console.log(value)
                    console.log(this.state.newPassWord)
                    if (value === '') {
                        throw new Error('请再次输入密码')
                    } else if (value !== this.state.newPassWord) {
                        throw new Error('两次输入的密码不一致')
                    } else {
                        throw new Error()
                    }
                }
            }
        ]
        const onFinish = (values: any) => {
            modifyPassword(values).then(() => {
                notification.open({
                    message: '成功',
                    description: '密码修改成功',
                    type: 'success'
                })
            })
        }
        return (
            <div className="container">
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="原始密码："
                        name="oldPassWord"
                        rules={[{ required: true, message: '密码不能为空' }]}>
                        <Input.Password className="w300" placeholder="请输入原始密码" />
                    </Form.Item>

                    <Form.Item
                        label="新密码："
                        name="newPassWord"
                        rules={[{ required: true, message: '密码不能为空' }]}>
                        <Input.Password className="w300" placeholder="请输入新密码" />
                    </Form.Item>

                    <Form.Item
                        label="确认新密码："
                        name="re_newPassWord"
                        rules={reRule}>
                        <Input.Password className="w300" placeholder="请输入确认新密码" />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default ModifyPassword;