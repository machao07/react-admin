import React from 'react'
import { Form, Input, Row, Col } from 'antd'

export interface State{
    activityName: string,
    memberName: string,
    mobile: number,
    start: number,
    end: number
}

class Promotion extends React.Component{
  render(){
    const onFinish = (values: object) => {
        console.log('success', values)
    }
    const onFinishFailed = (errorInfo: object) => {
        console.log('failes', errorInfo)
    }
    return(
      <div className="container">
          <div className="ikd-page-header"><div className="title">推广活动管理</div></div>
          <div className="list-filter">
            <Form
                layout="inline"
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="活动名称："
                    name="activityName">
                    <Input className="w200" placeholder="请输入活动名称" />
                </Form.Item>
                <Form.Item
                    label="购买用户昵称："
                    name="memberName">
                    <Input className="w200" placeholder="请输入购买用户昵称" />
                </Form.Item>
            </Form>
          </div>
      </div>
    )
  }
}

export default Promotion