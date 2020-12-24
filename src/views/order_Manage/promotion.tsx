import React from 'react'
import { Form, Input, Button, DatePicker, Table } from 'antd'
import { getSellerId } from '../../utils/storage'
import { getList } from '../../api/order'
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

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
      start?: number,
      end?: number
    },
    order_time?: string[],
    list: object[],
    total: any,
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
        num: 20
      },
      list: [],
      total: 0,
      loading: false,
    }
    // this.getListApi = this.getListApi.bind(this)
  }
  componentDidMount(){
    this.getListApi()
  }
  // 列表接口
  getListApi() {
    this.setState({loading: true});
    getList(this.state.listQuery).then( res =>{
      this.setState({
        loading: false,
        list: res.data.list,
        total: res.data.total
      })
    }).catch(()=>{})
  }
  render(){
    const onFinish = (values: object) => {
        const { activityName, memberName, mobile } = JSON.parse(JSON.stringify(values))
        const _listQuery = Object.assign({}, this.state.listQuery, {activityName, memberName, mobile})
        this.setState({
          listQuery: _listQuery
        })
        this.getListApi()
        // console.log(this.state.listQuery)
    }
    const onFinishFailed = (errorInfo: object) => {
        console.log('failes', errorInfo)
    }
    const onChange = (date:any, dateString:any) => {
      const newListQuery = Object.assign({},this.state.listQuery,{start: dateString[0],end: dateString[1]})
      this.setState({
        listQuery: newListQuery
      })
    }
    const columns:any = [
      { title: '订单编号', dataIndex: 'orderId', key: 'orderId', width: 180 },
      { title: '活动名称', dataIndex: 'activityName',key: 'activityName', width: 150 },
      { title: '购买用户昵称', dataIndex: 'memberName', key: 'memberName', width: 120 },
      { title: '绑定手机号', dataIndex: 'mobile',key: 'mobile', width: 150 },
      { title: '分享人', dataIndex: 'sharer', key: 'sharer', width: 180 },
      { title: '下单时间', dataIndex: 'timeAt', key: 'timeAt', width: 150 },
      { title: '订单金额', dataIndex: 'payMoney', key: 'payMoney', width: 100 },
      { title: '手续费', dataIndex: 'payOther', key: 'payOther', width: 100 },
      {
        title: '操作',
        key: 'operation',
        align: 'center',
        fixed: 'right',
        width: 100,
        render: () => <a>查看</a>,
      }
    ];
    const changePage = (page:number)=>{
      const query = Object.assign({},this.state.listQuery,{page: page})
      this.setState({
        listQuery: query
      })
      this.getListApi()
    }
    const { list, loading } = this.state;
    return(
      <div className="container">
          {/* {JSON.stringify(this.state.listQuery)} */}
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
                    name="activityName">
                    <Input className="w200" placeholder="请输入活动名称" />
                </Form.Item>
                <Form.Item
                    label="购买用户昵称："
                    name="memberName">
                    <Input className="w200" placeholder="请输入购买用户昵称" />
                </Form.Item>
                <Form.Item
                    label="绑定手机号："
                    name="mobile">
                    <Input className="w200" placeholder="请输入手机号码" />
                </Form.Item>
                <Form.Item
                    label="下单时间："
                    name="order_time">
                    <RangePicker onChange={onChange} locale={locale}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">搜索</Button>
                </Form.Item>
            </Form>
          </div>
          <Table dataSource={list} columns={columns} rowKey="orderId"
              loading={loading} scroll={{y: 500}} 
              pagination={{
                total: this.state.total,
                current: this.state.listQuery.page,
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal: total => `共 ${total} 条`,
              }}/>
      </div>
    )
  }
}

export default Promotion