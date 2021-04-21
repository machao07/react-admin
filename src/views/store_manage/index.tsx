import React, { Component } from 'react';
import { Form, Input, Button, Table, Modal, Select, Tag} from 'antd';
import { getList } from 'api/store';
const { Option } = Select

interface States{
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
    }
    componentDidMount(){
        const {num, page, listQuery} = this.state
        this.getListApi(num, page, listQuery)
    }
    // 列表接口
    getListApi(num:number, page: number, listQuery:object) {
        this.setState({loading: true});
        getList(num, page, listQuery).then( res =>{
            this.setState({
                loading: false,
                list: res.data.list,
                total: res.data.total
            })
        }).catch(()=>{})
    }
    render(){
        const onFinish = (values: object) => {
            console.log('value=======', values)
            // const { name, nickName, status } = JSON.parse(JSON.stringify(values))
            const _listQuery = Object.assign({}, this.state.listQuery, {...values})
            this.setState({
              listQuery: _listQuery
            })
            
            // console.log(this.state.listQuery)
        }
        const columns:any = [
            { title: '小店编号', dataIndex: 'id', key: 'id', align: 'center', width: 180 },
            { title: '店铺名称', dataIndex: 'name',key: 'name', align: 'center', width: 150 },
            { title: '店铺头像', dataIndex: 'logo', key: 'logo', align: 'center', width: 120,
                render: (text: any, record: any) => {
                    return (
                        <img className="avatar" src={record.logo} ></img>
                    )
                }
            },
            { title: '店主', dataIndex: 'nickName',key: 'nickName', align: 'center', width: 150,  
                render: (text: any, record: any) => {return record.nickName?record.nickName:'-----'}
            },
            { title: '店铺简介', dataIndex: 'intro', key: 'intro', align: 'center', width: 180, 
                render: (text: any, record: any) => {return record.intro?record.intro:'-----'}
            },
            { title: '入住时间', dataIndex: 'createdAt', key: 'createdAt', align: 'center', width: 200,
                render: (text: any, record: any) => { return record.createdAt?new Date(record.createdAt*1000).toLocaleString():'-----'},
                sorter: (a: any, b: any) => a.createdAt - b.createdAt
            },
            { title: '状态', dataIndex: 'status', key: 'status', align: 'center', width: 100,
                render: (text: any, record: any) => {
                    return (
                        <Tag color={record.status===1? 'success': 'error'}>{record.status === 1 ? '启用': '禁用'}</Tag>
                    )
                }
            },
            { title: '联系人', dataIndex: 'contactPerson', key: 'contactPerson', align: 'center', width: 100 },
            { title: '联系电话', dataIndex: 'contactPhone', key: 'contactPhone', align: 'center', width: 140 },
            {
                title: '操作',
                key: 'operation',
                align: 'center',
                fixed: 'right',
                width: 140,
                render: (text: any, record: any) => <a onClick={() => {}}>查看</a>,
            }
        ];
        // 分页切换
        const changePage = (current:number)=>{
            setTimeout(() => {
                this.setState({
                    page: current
                })
                const { num, page, listQuery } = this.state;
                this.getListApi(num, page, listQuery)
            },0)
        }
        const { list, loading } = this.state;
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
                                <Option value="0">禁用</Option>
                                <Option value="1">启用</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Table dataSource={list} columns={columns} rowKey="id"
                    loading={loading} scroll={{y: '400px'}} 
                    pagination={{
                        total: this.state.total,
                        current: this.state.page,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        showTotal: total => `共 ${total} 条`,
                        onChange: changePage
                    }}/>
            </div>
        )
    }
}

export default Store;
