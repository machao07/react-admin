import React from 'react';
import './style.css';
import { Card, Row, Col, Button } from 'antd';
import { PhoneOutlined, ScheduleOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
import { getSellerName, getSellerId } from 'utils/storage';
import DateFilter from 'utils/dateFilter';
import { 
  getSellerInfo, 
  getAmount, 
  getTodayRevenue, 
  getMemberData, 
  getTodayPay, 
  dashBoard 
} from 'api/home';
import ReactEcharts from 'echarts-for-react'
// import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2196242_llztnu5z71.js', // icon-wo icon-qian icon-zengjiarenyuan
  ],
});
// const style = { background: '#0092ff', padding: '8px 0' };
// const headBackground = 'http://obs.dynamic.huilianshenghua.com/2020/04-13/i70riuwn5v3okibmf6a4vqjm25perz7v.jpg'

class Home extends React.Component{
  // 声明
  constructor(props){
    super(props);
    this.state = {
      sellerInfo:{
        picture: undefined,
        contactPhone: undefined,
      },
      report: {
        orderPayMoneyToday: undefined,
        salesAmountMonth: undefined,
        balance: undefined
      },
      todayRevenue:{
        orderAmount: undefined,
        orderCount: undefined, //笔数
        couponAmount: undefined,
        couponCount: undefined, //笔数
        otherAmount: undefined,
        otherCount: undefined //笔数
      },
      todayPay:{
          userPayMoney: undefined,
          payFee: undefined,
          closerAmount: undefined,
          getFee: undefined,
          feeAmount: undefined,
          recommedAmount: undefined,
          couponRecommedAmount: undefined,
          couponFeeAmount: undefined
      },
      memberdData: {
          allOtherAmount: undefined,
          todayMemberCount: undefined,
          allMemberCount: undefined
      },
      option: {}
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
      this.setState({
        report : res.data
      })
    })
    // 今日收入
    const todayRevenueApi = new Promise((reso, reje) => {
      getTodayRevenue().then( res => {
        reso(res)
      }).catch( err => {
        reje(err)
      })
    })
    // 今日支付
    const todayPayApi = new Promise((reso, reje) =>{
      getTodayPay().then( res => {
        reso(res)
      }).catch( err => {
        reje(err)
      })
    })
    // 会员人数
    const memberDataApi = new Promise((reso, reje) => {
      getMemberData(getSellerId()).then( res =>{
        reso(res)
      }).catch( err =>{
        reje(err)
      })
    })

    Promise.allSettled([todayRevenueApi, todayPayApi, memberDataApi]).then( res => {
      this.setState({
        todayRevenue: res[0].value.data,
        todayPay: res[1].value.data,
        memberdData: res[2].value.data
      })
    }).catch( err => {
      console.log(err)
    })

    // 数据统计
    dashBoard(getSellerId()).then( res => {
      let report = res.data;
      let getFeeStatistics = report.getFeeStatistics;
      let memberStatistics = report.memberStatistics;
      let orderNumStatistics = report.orderNumStatistics;
      let date = [];
      let memberData = [], feeData = [], orderData = [];
      getFeeStatistics.forEach((value)=>{
          date.push(DateFilter.parseTime(value.date, '{y}-{m}-{d}'));
          feeData.push(value.amount);
      });

      memberStatistics.forEach((value)=>{
          memberData.push(value.amount);
      });

      orderNumStatistics.forEach((value)=>{
          orderData.push(value.amount);
      });
      const option =  {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['会员', '交易', '佣金']
          },
          grid: {
              left: '2%',
              right: '4%',
              bottom: '2%',
              containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '会员',
              type: 'line',
              data:  memberData
            },
            {
              name: '交易',
              type: 'line',
              data:  orderData
            },
            {
              name: '佣金',
              type: 'line',
              data:  feeData
            }
          ]
      }
      this.setState({
        option: option
      })
    }).catch(() => {})
  }
  render(){
    return(
      <div>
        <div className="content-head mb20">
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

        <div className="mb20">
          <Row gutter={20}>
            <Col span={8} className="homeCard">
              <Card hoverable={true}>
                <div className="title">
                    今日订单收入(元)：<font color="#FF0000">¥ {this.state.todayRevenue.orderAmount} / {this.state.todayRevenue.orderCount} 笔</font>
                </div>
                <div className="text">
                    <p>用户支付金额：¥ {this.state.todayPay.userPayMoney} </p>
                    <p>手续费：¥ {this.state.todayPay.payFee}</p>
                </div>
              </Card>
            </Col>
            <Col span={8} className="homeCard">
              <Card hoverable={true}>
                <div className="title">
                    今日优惠券收入(元)：<font color="#FF0000">¥ {this.state.todayRevenue.couponAmount} / {this.state.todayRevenue.couponCount} 笔</font>
                </div>
                <div className="text">
                    <p>核销收入：¥ {this.state.todayPay.closerAmount} </p>
                    <p>补贴收入：¥ {this.state.todayPay.getFee} </p>
                </div>
              </Card>
            </Col>
            <Col span={8} className="homeCard">
              <Card hoverable={true}>
                <div className="title">
                    今日联盟收入(元)：<font color="#FF0000">¥ {this.state.todayRevenue.otherAmount} / {this.state.todayRevenue.otherCount} 笔</font>
                </div>
                <div className="text other">
                    <p>佣金收入：¥ {this.state.todayPay.feeAmount} </p>
                    <p>券分享收入：¥ {this.state.todayPay.couponRecommedAmount} </p>
                </div>
                <div className="text">
                    <p>推广收入：¥ {this.state.todayPay.recommedAmount} </p>
                    <p>关联订单收入：¥ {this.state.todayPay.couponFeeAmount} </p>
                </div>
              </Card>
            </Col>            
          </Row>
        </div>

        <div className="member mb20">
          <Row gutter={20}>
            <Col span={8} className="homeCard">
              <Card hoverable={true} style={{borderTop: '2px solid #F45D3C'}}>
                <div className="title tc">
                    今日新增会员数（人）
                </div>
                <div className="text tc">
                    <IconFont className="fontStyle" type="icon-wo" style={{color: '#F45D3C'}} />
                    <p className="fontStyle ml15" style={{color: '#F45D3C'}}>{this.state.memberdData.todayMemberCount}</p>
                </div>
              </Card>
            </Col>
            <Col span={8} className="homeCard">
              <Card hoverable={true} style={{borderTop: '2px solid #2489F3'}}>
                <div className="title tc">
                    累计会员数（人）
                </div>
                <div className="text tc">
                    <IconFont className="fontStyle" type="icon-zengjiarenyuan" style={{color: '#2489F3'}} />
                    <p className="fontStyle ml15" style={{color: '#2489F3'}}>{this.state.memberdData.todayMemberCount}</p>
                </div>
              </Card>
            </Col>
            <Col span={8} className="homeCard">
              <Card hoverable={true} style={{borderTop: '2px solid #5FD76D'}}>
                <div className="title tc">
                    累计联盟收入（元）
                </div>
                <div className="text tc">
                    <IconFont className="fontStyle" type="icon-qian" style={{color: '#5FD76D'}} />
                    <p className="fontStyle ml15" style={{color: '#5FD76D'}}>{this.state.memberdData.allOtherAmount}</p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      
        {/* 数据统计 */}
        <Card title="数据统计">
          <ReactEcharts option={this.state.option}/>
        </Card>
      </div>
    )
  }
}

export default Home