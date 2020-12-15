import React from 'react'
import { Form, Input, Button, DatePicker, Table } from 'antd'
import { getSellerId } from '../../utils/storage'
import { getList } from '../../api/order'

const { RangePicker } = DatePicker;

export interface State{
    listQuery: {
      targetId: string,
      targetType: number,
      page: number,
      num: number,
      activityName?: string,
      memberName?: string,
      mobile?: number|string,
      order_time?: string[],
      start?: number,
      end?: number
    },
    list: object[],
    loading: boolean,
}
type PropsType = {}
class Promotion extends React.Component<PropsType, State>{
  constructor(props: PropsType) {
    super(props);
    this.state = {
      listQuery: {
        targetId: getSellerId(),
        targetType: 1,
        page: 1,
        num: 20,
      },
      list: [],
      loading: false,
    }
  }
  componentDidMount(){
    this.getList()
  }
  // 列表接口
  getList = () => {
    this.setState({loading: true});
    getList(this.state.listQuery).then( res =>{
      this.setState({
        loading: false,
        list: res.data.list
      })
    }).catch(()=>{})
  }
  render(){
    const onFinish = (values: object) => {
        console.log('success', values)
    }
    const onFinishFailed = (errorInfo: object) => {
        console.log('failes', errorInfo)
    }
    const onChange = (date:any, dateString:any) => {
      console.log(dateString)
    }
    const columns:any = [
      { title: '订单编号', dataIndex: 'orderId', key: 'orderId' },
      { title: '活动名称', dataIndex: 'activityName',key: 'activityName' },
      { title: '购买用户昵称', dataIndex: 'memberName', key: 'memberName' },
      { title: '绑定手机号', dataIndex: 'mobile',key: 'mobile' },
      { title: '分享人', dataIndex: 'sharer', key: 'sharer' },
      { title: '下单时间', dataIndex: 'timeAt', key: 'timeAt' },
      { title: '订单金额', dataIndex: 'payMoney', key: 'payMoney' },
      { title: '手续费', dataIndex: 'payOther', key: 'payOther' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>查看</a>,
      }
    ];
    const { list, loading } = this.state;
    return(
      <div className="container">
          <div className="ikd-page-header"><div className="title">推广活动管理</div></div>
          <div className="list-filter">
            <Form
                className="filter"
                layout="inline"
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="活动名称："
                    name="listQuery.activityName">
                    <Input className="w200" placeholder="请输入活动名称" />
                </Form.Item>
                <Form.Item
                    label="购买用户昵称："
                    name="listQuery.memberName">
                    <Input className="w200" placeholder="请输入购买用户昵称" />
                </Form.Item>
                <Form.Item
                    label="绑定手机号："
                    name="listQuery.mobile">
                    <Input className="w200" placeholder="请输入手机号码" />
                </Form.Item>
                <Form.Item
                    label="下单时间："
                    name="listQuery.order_time">
                    <RangePicker onChange={onChange}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
          </div>

          <Table dataSource={list} columns={columns} rowKey="orderId" loading={loading} scroll={{y: 500}} />
      </div>
    )
  }
}

export default Promotion