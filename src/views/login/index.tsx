import React from 'react'
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockFilled } from '@ant-design/icons';
import { loginName } from 'api/login';
import { setToken } from 'api/token';
import './style.css';

class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }
    render() {
        const layout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
        };
        const tailLayout = {
            wrapperCol: { offset: 0, span: 24 },
        };

        // 表单提交
        const onFinish = (values: any) => {
            // console.log('Success:', values);
            loginName(values).then((res) => {
                let status = res.data.status;
                if (res.data.token) {
                    // 结算主体
                    let lb = res.data.lb;
                    if (!lb) {
                        lb = "";
                    }
                    //商户信息
                    let si = res.data.si;
                    if (!si) {
                        si = "";
                    }
                    let bs = res.data.bs;
                    if (!bs) {
                        bs = "";
                    }
                    setToken(res.data.token);
                    localStorage.setItem("role", res.data.role);
                    localStorage.setItem("lb", lb);
                    localStorage.setItem("si", si);
                    localStorage.setItem("bs", bs);
                    notification.open({
                        message: '成功',
                        description: '登录成功',
                        type: 'success'
                    })
                    this.props.history.push('home');
                } else {
                    let errmsg = '登录失败'
                    if (status === '5') {
                        errmsg = '账户或密码错误'
                    }
                    notification.open({
                        message: '失败',
                        description: errmsg,
                        type: 'error',
                    });
                }
            }).catch(() => {

            })
        };

        return (
            <div className="wrap">
                <div className="header">
                    {/* <img src={require("../../assets/logo.png")} className="logo" alt="" /> */}
                    <span>某某某</span>
                    <span className="companyName">商户中心</span>
                </div>

                <div className="login-box">
                    <div className="login-main">
                        <div className="login-tab">
                            <h2 className="login-h">Hi，欢迎登录商户管理平台！</h2>
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label=""
                                    name="account"
                                    rules={[{ required: true, message: '企业账号不能为空' }]}>
                                    <Input placeholder="请输入企业账号" prefix={<UserOutlined />} />
                                </Form.Item>

                                <Form.Item
                                    label=""
                                    name="username"
                                    rules={[{ required: true, message: '用户名不能为空' }]}>
                                    <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
                                </Form.Item>

                                <Form.Item
                                    label=""
                                    name="password"
                                    rules={[{ required: true, message: '密码不能为空' }]}>
                                    <Input.Password placeholder="请输入密码" autoComplete="new-password" prefix={<LockFilled />} />
                                </Form.Item>

                                {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                <Checkbox>记住</Checkbox>
                                </Form.Item> */}

                                <Form.Item {...tailLayout}>
                                    <Button style={{ width: '100%' }} type="primary" htmlType="submit">登录</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    Copyright © 1994-2022 南京xxxx有限公司 All Rights Reserved.<br />
                    备案号：苏ICP备199xxxx号 联系方式：025-xxxxxx
                </div>
            </div>
        )
    }
}

export default Login