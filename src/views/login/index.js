import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockFilled } from '@ant-design/icons';
import './style.css'

class Login extends React.Component{
  render(){

    const layout = {
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    };
    const tailLayout = {
      wrapperCol: { offset: 0, span: 24 },
    };

    const onFinish = values => {
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return(
      <div className="wrap">
        <div className="header">
          <img src={require("../../assets/logo.png")} className="logo"/>
          <span className="companyName">商户中心</span>
        </div>

        <div className="login-box">
          <div className="login-main">
            <div className="login-tab">
              <h2 className="login-h">Hi，欢迎登录惠联生花商户管理平台！</h2>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
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
                  <Input.Password placeholder="请输入密码" prefix={<LockFilled />} />
                </Form.Item>

                {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>记住</Checkbox>
                </Form.Item> */}

                <Form.Item {...tailLayout}>
                  <Button style={{width: '100%'}} type="primary" htmlType="submit">登录</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>

        <div className="footer">
          Copyright © 1994-2019 南京云惠联科技有限公司 All Rights Reserved.<br />
          备案号：苏ICP备19006197号 联系方式：025-58856499
        </div>
      </div>
    )
  }
}

export default Login