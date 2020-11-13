import React from 'react'
import { Card, Row, Col } from 'antd';
import { PhoneOutlined, ScheduleOutlined } from '@ant-design/icons';

const style = { background: '#0092ff', padding: '8px 0' };

class Home extends React.Component{
  render(){
    return(
      <div className="content-head radius5">
        <Card hoverable={true}>
          <Row gutter={20}>
            <Col className="gutter-row" span={6}>
              <div className="seller">
                  <div className="seller-content">
                      <div className="title">宇智波鼬的水果店</div>
                      <div className="address">
                          <PhoneOutlined className="mr5"/>
                          <span>18651601160</span>
                          <ScheduleOutlined className="mr5" />已认证
                      </div>
                  </div>
              </div>          
            </Col>
            <Col className="gutter-row" span={6}>
              <div>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>col-6</div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

export default Home