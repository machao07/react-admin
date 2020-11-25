import React from 'react'
import './style.css'
import { Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, ScheduleOutlined } from '@ant-design/icons';
import { getSellerName, getSellerId } from '../../utils/storage'
import { getSellerInfo, getAmount } from '../../api/home'

const style = { background: '#0092ff', padding: '8px 0' };
const headBackground = 'http://obs.dynamic.huilianshenghua.com/2020/04-13/i70riuwn5v3okibmf6a4vqjm25perz7v.jpg'

class Home extends React.Component{
  // 声明
  state = {
    sellerInfo:{
      picture: undefined,
      contactPhone: undefined,
    },
    report: {
      orderPayMoneyToday: undefined,
      salesAmountMonth: undefined,
      balance: undefined
    }
  }

  componentDidMount(){
    // 商户信息
    getSellerInfo(getSellerId()).then((res) => {
      let data = res.data;
      let pic
      if(data.detail && data.detail.pics){
        pic = JSON.parse(data.detail.pics)
      }
      this.setState({
        sellerInfo:{
          picture: pic.shop[0].url,
          contactPhone : data.detail.contactPhone,
        }
      })
    }).catch(()=>{})

    // 获取金额
    getAmount(getSellerId()).then((res) => {
      let data = res.data
      this.setState({
        report:{
          orderPayMoneyToday: data.orderPayMoneyToday,
          salesAmountMonth: data.salesAmountMonth,
          balance: data.balance
        }
      })
    })
  }

  render(){
    return(
      <div className="content-head radius5">
        <Card hoverable={true}>
          <Row gutter={20}>
            <Col span={8}>
              <div className="seller">
                <div className="icon" style={{backgroundImage: `url(${this.state.sellerInfo.picture}`}}></div>
                <div className="seller-content">
                <div className="title">{getSellerName()}</div>
                    <div className="address">
                        <PhoneOutlined className="iconColor mr5"/>
                        <span className="mr5">{this.state.sellerInfo.contactPhone}</span>
                        <ScheduleOutlined className="iconColor mr5" />
                        <span>已认证</span>
                    </div>
                </div>
              </div>
            </Col>
            <Col className="br tc" span={4}>
            <p className="price">{this.state.report.orderPayMoneyToday}</p>
              <p className="label">今日交易金额 (元)</p>
            </Col>
            <Col className="br tc" span={4}>
              <p className="price">{this.state.report.salesAmountMonth}</p>
              <p className="label">本月销售额 (元)</p>
            </Col>
            <Col className="br tc" span={4}>
              <p className="price">{this.state.report.balance}</p>
              <p className="label">账户余额 (元)</p>
            </Col>
            <Col className="br tc" span={4}>
              <p>
                <Button type="primary" size="small">提现</Button>
              </p>
              <p className="label">
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