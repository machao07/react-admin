import React from 'react'
import { Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, ScheduleOutlined } from '@ant-design/icons';

const style = { background: '#0092ff', padding: '8px 0' };
const headBackground = 'http://obs.dynamic.huilianshenghua.com/2020/04-13/i70riuwn5v3okibmf6a4vqjm25perz7v.jpg'

class Home extends React.Component{
  render(){
    return(
      <div className="content-head radius5">
        <Card hoverable={true}>
          <Row gutter={20}>
            <Col span={8}>
              <div className="seller">
                  <div className="icon" style={{backgroundImage: `url(${headBackground}`}}></div>
                  <div className="seller-content">
                      <div className="title">宇智波鼬的水果店</div>
                      <div className="address">
                          <PhoneOutlined className="iconColor mr5"/>
                          <span className="mr5">18651601160</span>
                          <ScheduleOutlined className="iconColor mr5" />
                          <span>已认证</span>
                      </div>
                  </div>
              </div>          
            </Col>
            <Col className="br tc" span={4}>
              <p className="price">0</p>
              <p className="label">今日交易金额(元)</p>
            </Col>
            <Col className="br tc" span={4}>
              <p className="price">0</p>
              <p className="label">本月销售额</p>
            </Col>
            <Col className="br tc" span={4}>
              <p className="price">0</p>
              <p className="label">账户余额</p>
            </Col>
            <Col className="br tc" span={4}>
              <p>
                <Button type="primary" size="small">提现</Button>
              </p>
              <p>
                <Button type="text" size="small">账户中心</Button>
              </p>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

export default Home