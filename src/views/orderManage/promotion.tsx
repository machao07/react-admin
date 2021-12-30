import React from 'react'
import { Form, Input, Button, DatePicker, Table, Modal } from 'antd'
import { getSellerId } from 'utils/storage'
import { getList } from 'api/order'
import Detail from 'components/order_manage/promotion_detail'

const { RangePicker } = DatePicker;

interface Props {
    currentId: number
}

interface State {
    listQuery: {
        targetId: string,
        targetType: number,
        page: number,
        num: number,
        activityName?: string,
        memberName?: string,
        mobile?: number | string,
        start?: number,
        end?: number
    },
    order_time?: string[],
    list: object[],
    total: any,
    loading: boolean,
    detailVisible: boolean,
    currentId: number
}
class Promotion extends React.Component<Props, State>{
    constructor(props: Props) {
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
            detailVisible: false,
            currentId: 0
        }
        // this.getListApi = this.getListApi.bind(this)
    }
    componentDidMount() {
        this.getListApi(this.state.listQuery)
    }
    // 列表接口
    getListApi(listQuery: object) {
        this.setState({ loading: true });
        getList(listQuery).then(res => {
            this.setState({
                loading: false,
                list: res.data.list,
                total: res.data.total
            })
        }).catch(() => { })
    }
    handleDetail(text: any, record: any) {
        // console.log(text)
        // console.log(record)
        this.setState({
            detailVisible: true,
            currentId: text.orderId
        })
    }
    render() {
        const onFinish = (values: object) => {
            const { activityName, memberName, mobile } = JSON.parse(JSON.stringify(values))
            const _listQuery = { ...this.state.listQuery, activityName, memberName, mobile }
            this.setState({ listQuery: _listQuery })
            this.getListApi(this.state.listQuery)
            // console.log(this.state.listQuery)
        }
        const onFinishFailed = (errorInfo: object) => {
            console.log('failes', errorInfo)
        }
        const onChange = (date: any, dateString: any) => {
            const newListQuery = { ...this.state.listQuery, start: dateString[0], end: dateString[1] }
            this.setState({ listQuery: newListQuery })
        }
        const columns: any = [
            { title: '订单编号', dataIndex: 'orderId', key: 'orderId', align: 'center', width: 180 },
            { title: '活动名称', dataIndex: 'activityName', key: 'activityName', align: 'center', width: 150 },
            { title: '购买用户昵称', dataIndex: 'memberName', key: 'memberName', align: 'center', width: 120 },
            {
                title: '绑定手机号', dataIndex: 'mobile', key: 'mobile', align: 'center', width: 150,
                render: (text: any, record: any) => { return record.mobile ? record.mobile : '-----' }
            },
            {
                title: '分享人', dataIndex: 'sharer', key: 'sharer', align: 'center', width: 180,
                render: (text: any, record: any) => { return record.sharer ? record.sharer : '-----' }
            },
            {
                title: '下单时间', dataIndex: 'timeAt', key: 'timeAt', align: 'center', width: 200,
                render: (text: any, record: any) => { return record.timeAt ? new Date(record.timeAt * 1000).toLocaleString() : '-----' },
                sorter: (a: any, b: any) => a.timeAt - b.timeAt
            },
            { title: '订单金额', dataIndex: 'payMoney', key: 'payMoney', align: 'center', width: 100 },
            { title: '手续费', dataIndex: 'payOther', key: 'payOther', align: 'center', width: 100 },
            {
                title: '操作',
                key: 'operation',
                align: 'center',
                fixed: 'right',
                width: 100,
                render: (text: any, record: any) => <p className='link' onClick={() => { this.handleDetail(text, record) }}>查看</p>,
            }
        ];
        // 分页切换
        const changePage = (current: number, pageSize?: number) => {
            const query = { ...this.state.listQuery, page: current, num: pageSize || 20 }
            console.log('query', query)
            setTimeout(() => {
                this.setState({ listQuery: query })
                this.getListApi(this.state.listQuery)
            }, 0)
        }

        // 多少每页
        const selectchange = (page: number, num: number) => {
            const query = { ...this.state.listQuery, page, num }
            this.setState({ listQuery: query })
            this.getListApi(query);
        }

        // 详情model
        const handleCancel = () => {
            this.setState({ detailVisible: false })
        };

        const { list, loading } = this.state;
        return (
            <div className="container">
                {/* {JSON.stringify(this.state.listQuery)} */}
                <div className="ikd-page-header"><div className="title">股东活动订单</div></div>
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
                            <RangePicker onChange={onChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table dataSource={list} columns={columns} rowKey="orderId"
                    loading={loading} scroll={{ y: '400px' }}
                    pagination={{
                        total: this.state.total,
                        current: this.state.listQuery.page,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: total => `共 ${total} 条`,
                        onShowSizeChange: selectchange,
                        onChange: changePage
                    }} />
                {/* 查看详情 */}
                <Modal title="查看详情"
                    width={'80%'}
                    bodyStyle={{ lineHeight: '2.8' }}
                    visible={this.state.detailVisible}
                    maskClosable={false}
                    onCancel={handleCancel}
                    footer={[
                        <Button type="primary" key="back" onClick={handleCancel}>
                            关闭
                        </Button>
                    ]}>
                    <Detail currentId={this.state.currentId}></Detail>
                </Modal>
            </div>
        )
    }
}

export default Promotion;