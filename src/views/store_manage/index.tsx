import React, { Component } from 'react';
import { Form, Input, Button, Table, Modal, Select, Tag, message } from 'antd';
import { getList, enable } from 'api/store';
import Tip from './component/tip';
import Rules from './component/rule';

const { Option } = Select

interface States {
    num: number,
    page: number,
    listQuery: {
        name: string | undefined,
        nickName: string | undefined,
        status: string | undefined
    },
    list: any[]
    total: number
    loading: boolean
    currentRow: object
    title: string
    visible: boolean
    modalText: string
    modalWidth: number | string
}

class Store extends Component<any, States> {
    state = {
        num: 20,
        page: 1,
        listQuery: {
            name: undefined,
            nickName: undefined,
            status: undefined
        },
        list: [],
        total: 0,
        loading: false,
        currentRow: {
            id: 0,
            status: 0
        },
        title: '',
        visible: false,
        modalText: '',
        modalWidth: 0
    }
    componentDidMount() {
        this.getListApi()
    }
    // 列表接口
    getListApi() {
        this.setState({ loading: true });
        const { num, page, listQuery } = this.state
        getList(num, page, listQuery).then(res => {
            this.setState({
                loading: false,
                list: res.data.list,
                total: res.data.total
            })
        }).catch(() => { })
    }
    render() {
        const onFinish = (values: object) => {
            const _listQuery = { ...this.state.listQuery, ...values }
            this.setState({ listQuery: _listQuery })
            this.getListApi()
        }

        const confirm = () => {
            const { title, currentRow } = this.state;
            let status = 1, txt = '启用成功';
            if (currentRow?.status === 1) {
                status = 3
                txt = '禁用成功'
            }
            if (title === '提示') {
                enable(status, currentRow?.id).then(res => {
                    message.success(txt);
                    this.getListApi()
                    this.setState({ visible: false })
                })
            }
        }
        const cancel = () => {
            this.setState({ visible: false })
        }
        const columns: any = [
            { title: '小店编号', dataIndex: 'id', key: 'id', align: 'center', width: 180 },
            { title: '店铺名称', dataIndex: 'name', key: 'name', align: 'center', width: 150 },
            {
                title: '店铺头像', dataIndex: 'logo', key: 'logo', align: 'center', width: 120,
                render: (text: any, record: any) => {
                    return <img alt={record.name} className="avatar" src={record.logo} ></img>
                }
            },
            {
                title: '店主', dataIndex: 'nickName', key: 'nickName', align: 'center', width: 150,
                render: (text: any, record: any) => { return record.nickName ? record.nickName : '-----' }
            },
            {
                title: '店铺简介', dataIndex: 'intro', key: 'intro', align: 'center', width: 180,
                render: (text: any, record: any) => { return record.intro ? record.intro : '-----' }
            },
            {
                title: '入住时间', dataIndex: 'createdAt', key: 'createdAt', align: 'center', width: 200,
                render: (text: any, record: any) => { return record.createdAt ? new Date(record.createdAt * 1000).toLocaleString() : '-----' },
                sorter: (a: any, b: any) => a.createdAt - b.createdAt
            },
            {
                title: '状态', dataIndex: 'status', key: 'status', align: 'center', width: 100,
                render: (text: any, record: any) => {
                    return <Tag color={record.status === 1 ? 'success' : 'error'}>{record.status === 1 ? '启用' : '禁用'}</Tag>
                }
            },
            { title: '联系人', dataIndex: 'contactPerson', key: 'contactPerson', align: 'center', width: 100 },
            { title: '联系电话', dataIndex: 'contactPhone', key: 'contactPhone', align: 'center', width: 140 },
            {
                title: '操作',
                key: 'operation',
                align: 'center',
                fixed: 'right',
                width: 200,
                render: (text: any, record: any) => [
                    <span className="mr10 link" onClick={() => {
                        let _modalText = '确定禁用?'
                        if (record.status === 3) _modalText = '确定启用?'
                        this.setState({ title: '提示', modalText: _modalText, modalWidth: 400, visible: true, currentRow: record })
                    }}>{record.status === 1 ? '禁用' : '启用'}</span>,
                    <span className="mr10 link" onClick={() => {
                        this.setState({ title: '结算规则', visible: true, modalWidth: 800 })
                    }}>结算规则</span>,
                    <span className='link' onClick={() => {
                        this.setState({ title: '店铺商品', visible: true, modalWidth: '85%' })
                    }}>店铺商品</span>
                ]
            }
        ];

        const switchModal = () => {
            const { title } = this.state;
            switch (title) {
                case '结算规则':
                    return <Rules />
                case '店铺商品':
                    return ''
                default:
                    return <Tip text={this.state.modalText}></Tip>
            }
        }
        // 分页切换
        const changePage = (current: number, pageSize?: number) => {
            setTimeout(() => {
                this.setState({ page: current, num: pageSize || 20 })
                this.getListApi()
            }, 0)
        }

        // 多少每页
        const selectchange = (page: number, num: number) => {
            this.setState({ page, num})
            this.getListApi();
        }

        const { list, loading, title, visible, modalWidth } = this.state;
        return (
            <div className="container">
                <div className="ikd-page-header"><div className="title">店铺管理</div></div>
                <div className="list-filter">
                    <Form
                        className="filter"
                        layout="inline"
                        name="basic"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="店铺名称："
                            name="name">
                            <Input className="w200" placeholder="请输入店铺名称" />
                        </Form.Item>
                        <Form.Item
                            label="店主昵称："
                            name="nickName">
                            <Input className="w200" placeholder="请输入店主昵称" />
                        </Form.Item>
                        <Form.Item
                            label="店铺状态："
                            name="status">
                            <Select placeholder="全部状态" style={{ width: 120 }} allowClear>
                                <Option value="3">禁用</Option>
                                <Option value="1">启用</Option>
                            </Select>
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
                        current: this.state.page,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: total => `共 ${total} 条`,
                        onShowSizeChange: selectchange,
                        onChange: changePage
                    }} />
                <Modal width={modalWidth} title={title} visible={visible} onOk={confirm} onCancel={cancel}>
                    {switchModal()}
                </Modal>
            </div>
        )
    }
}

export default Store;
