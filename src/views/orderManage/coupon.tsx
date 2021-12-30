import React, { Component } from 'react'
import { Form, Input, Button, DatePicker, Table, Modal } from 'antd'
import { getSellerId } from 'utils/storage'
import { getCouponList } from 'api/order'
import Detail from 'components/order_manage/promotion_detail'

const { RangePicker } = DatePicker;

interface Props {
    currentId: number
}
interface State {
    listQuery: {
        page: number,
        num: number,
        type?: number | string,
        couponId?: number,
        couponName?: string,
        sharerName?: string,
        memberName?: string,
        closer?: string,
        status?: number | string,
        payStart?: number,
        payEnd?: number,
        closeStart?: number,
        closeEnd?: number
    },
    pay_at?: string[],
    close_at?: string[],
    list: object[],
    total: any,
    loading: boolean,
    detailVisible: boolean,
    currentId: number
}
class Coupon extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            listQuery: {
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
        getCouponList(getSellerId(), listQuery).then(res => {
            this.setState({
                loading: false,
                list: res.data.list,
                total: res.data.total
            })
        }).catch(() => { })
    }
    handleDetail(text: any) {
        this.setState({
            detailVisible: true,
            currentId: text.orderId
        })
    }
    render() {
        const onFinish = (values: object) => {
            const { activityName, memberName, mobile } = JSON.parse(JSON.stringify(values))
            const _listQuery = {...this.state.listQuery, activityName, memberName, mobile}
            this.setState({ listQuery: _listQuery })
            this.getListApi(this.state.listQuery)
            // console.log(this.state.listQuery)
        }
        const onFinishFailed = (errorInfo: object) => {
            console.log('failes', errorInfo)
        }
        const onChange = (date: any, dateString: any) => {
            const newListQuery = { ...this.state.listQuery, payStart: dateString[0], payEnd: dateString[1] }
            this.setState({ listQuery: newListQuery })
        }
        const onChangeClose = (date: any, dateString: any) => {
            const newListQuery = { ...this.state.listQuery, closeStart: dateString[0], closeEnd: dateString[1] }
            this.setState({ listQuery: newListQuery })
        }
        const columns: any = [
            { title: '券ID', dataIndex: 'couponId', key: 'orderId', align: 'center', width: 180 },
            { title: '券类型', dataIndex: 'couponName', key: 'activityName', align: 'center', width: 150 },
            { title: '券名称', dataIndex: 'couponName', key: 'couponName', align: 'center', width: 150 },
            { title: '购买金额', dataIndex: 'payMoney', key: 'payMoney', align: 'center', width: 120 },
            { title: '结算金额', dataIndex: 'settlePrice', key: 'settlePrice', align: 'center', width: 120 },
            { title: '总数量', dataIndex: 'mutiCount', key: 'mutiCount', align: 'center', width: 120 },
            { title: '已核销数量', dataIndex: 'mutiUsedCount', key: 'mutiUsedCount', align: 'center', width: 120 },
            { title: '已结算金额', dataIndex: 'closerAmount', key: 'closerAmount', align: 'center', width: 120 },
            { title: '补贴', dataIndex: 'firstPay', key: 'firstPay', align: 'center', width: 100 },
            { title: '购买人/使用人', dataIndex: 'memberName', key: 'payOther', align: 'center', width: 100 },
            {
                title: '购买时间', dataIndex: 'payTime', key: 'payTime', align: 'center', width: 200,
                render: (text: any, record: any) => { return record.payTime ? new Date(record.payTime * 1000).toLocaleString() : '-----' },
                sorter: (a: any, b: any) => a.payTime - b.payTime
            },
            { title: '核销门店', dataIndex: 'closeStoreName', key: 'closeStoreName', align: 'center', width: 100 },
            {
                title: '核销时间', dataIndex: 'closeTime', key: 'closeTime', align: 'center', width: 200,
                render: (text: any, record: any) => { return record.closeTime ? new Date(record.closeTime * 1000).toLocaleString() : '-----' },
                sorter: (a: any, b: any) => a.closeTime - b.closeTime
            },
            { title: '分享者', dataIndex: 'sharerName', key: 'sharerName', align: 'center', width: 100 },
            { title: '核销状态', dataIndex: 'payOther', key: 'payOther', align: 'center', width: 100 },
            {
                title: '操作',
                key: 'operation',
                align: 'center',
                fixed: 'right',
                width: 100,
                render: (text: any,) => <p className='link'  onClick={() => { this.handleDetail(text) }}>查看</p>,
            }
        ];
        // 分页切换
        const changePage = (current: number, pageSize?: number) => {
            const query = { ...this.state.listQuery, page: current, num: pageSize || 20}
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

        const { list, loading } = this.state;
        // 详情model
        const handleCancel = () => {
            this.setState({
                detailVisible: false
            })
        };
        return (
            <div className="container">
                {/* {JSON.stringify(this.state.listQuery)} */}
                <div className="ikd-page-header"><div className="title">优惠券订单</div></div>
                <div className="list-filter">
                    <Form
                        className="filter"
                        layout="inline"
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}>
                        <Form.Item
                            label="券ID："
                            name="couponId">
                            <Input className="w200" placeholder="请输入券ID" />
                        </Form.Item>
                        <Form.Item
                            label="券名称："
                            name="couponName">
                            <Input className="w200" placeholder="请输入券名称" />
                        </Form.Item>
                        <Form.Item
                            label="购买人："
                            name="memberName">
                            <Input className="w200" placeholder="请输入购买人" />
                        </Form.Item>
                        <Form.Item
                            label="购买时间："
                            name="pay_at">
                            <RangePicker onChange={onChange} />
                        </Form.Item>
                        <Form.Item
                            label="核销时间："
                            name="close_at">
                            <RangePicker onChange={onChangeClose} />
                        </Form.Item>
                        <Form.Item
                            label="分享人："
                            name="sharerName">
                            <Input className="w200" placeholder="请输入分享人" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table dataSource={list} columns={columns} rowKey="id"
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

export default Coupon;