import React, { Component } from "react";
import { Button, Empty, Modal, notification, Popconfirm } from "antd";
import { getSellerId } from 'utils/storage';
import { delNotice, disable, enable, getNoticeList } from "api/configuration/announcement";
import AnnounceCreate from "./compoents/announceCreate";

interface States {
    noticeData: any
    visible: boolean
    title: string
    current: any
}

class Announcement extends Component<any, States> {
    type = 1; // 单店
    constructor(props: any) {
        super(props);
        this.state = {
            noticeData: undefined,
            visible: false,
            title: '新增公告',
            current: {}
        }
    }

    componentDidMount() {
        this.getList()
    }

    getList() {
        getNoticeList(getSellerId(), this.type).then((res) => {
            if(res.data){
                this.setState({ noticeData: res.data[0] })
            }else{
                this.setState({ noticeData: undefined })
            }
        }).catch(() => { })
    }

    getStatusText(status: number): string {
        if (status === 1) {
            return "启用";
        } else if (status === 0) {
            return "禁用";
        } else {
            return '';
        }
    }

    handelCreate() {
        this.setState({ visible: true })
    }

    handelUpdate(item: any) {
        this.setState({
            visible: true,
            title: '编辑公告',
            current: item
        })
    }

    handleEnable(item: any) {
        enable(getSellerId(), this.type, item.id, 1).then((res) => {
            notification.success({
                message: '成功',
                description: '启用成功'
            })
            this.getList()
        }).catch(() => { })
    }

    handleDisable(item: any) {
        disable(getSellerId(), this.type, item.id, 0).then((res) => {
            notification.success({
                message: '成功',
                description: '禁用成功'
            });
            this.getList()
        }).catch(() => { })
    }

    handleDel(item: any) {
        delNotice(getSellerId(), this.type, item.id).then(res => {
            notification.success({
                message: '成功',
                description: '删除公告成功',
            });
            this.getList()
        }).catch(() => { })
    }

    render() {
        const { noticeData, visible, title, current } = this.state;
        const handleCancel = () => {
            this.setState({ visible: false })
        };

        return (
            <div className="container">
                <div className="ikd-page-header"><div className="title">公告管理</div></div>
                {
                    noticeData ? null :
                        <Button type="primary" style={{ marginBottom: 15 }} onClick={this.handelCreate.bind(this)}>添加公告</Button>
                }
                <table className="ikd-input-table no-first">
                    <thead>
                        <th className="tc" style={{ width: 200 }}>公司标题名称</th>
                        <th className="tc" style={{ width: 300 }}>内容</th>
                        <th className="tc" style={{ width: 140 }}>发布时间</th>
                        <th className="tc" style={{ width: 100 }}>状态</th>
                        <th className="tc" style={{ width: 240 }}>操作</th>
                    </thead>
                    <tbody>
                        {
                            noticeData ?
                                <tr>
                                    <td className="tc">{noticeData.name}</td>
                                    <td className="tc" dangerouslySetInnerHTML={{ __html: noticeData.content }}></td>
                                    <td className="tc">{noticeData.statusAt ? new Date(noticeData.statusAt * 1000).toLocaleString() : '-----'}</td>
                                    <td className="tc">{this.getStatusText(noticeData.status)}</td>
                                    <td className="tc">
                                        {
                                            noticeData.status === 0 ?
                                                <Popconfirm
                                                    title="您正在进行启用操作，是否继续进行？"
                                                    onConfirm={() => this.handleEnable(noticeData)}
                                                    okText="确定"
                                                    cancelText="取消">
                                                    <Button type="link">启用</Button>
                                                </Popconfirm> : null
                                        }
                                        {
                                            noticeData.status === 1 ?
                                                <Popconfirm
                                                    title="禁用后改公告将不再前台展示，是否继续进行？"
                                                    onConfirm={() => this.handleDisable(noticeData)}
                                                    okText="确定"
                                                    cancelText="取消">
                                                    <Button type="link">禁用</Button>
                                                </Popconfirm> : null
                                        }
                                        {
                                            noticeData.status === 0 ?
                                                <Button type="link" onClick={() => this.handelUpdate(noticeData)}>编辑</Button> : null
                                        }
                                        <Popconfirm
                                            title="此操作将永久删除, 是否继续?"
                                            onConfirm={() => this.handleDel(noticeData)}
                                            okText="确定"
                                            cancelText="取消">
                                            <Button type="link">删除</Button>
                                        </Popconfirm>
                                    </td>
                                </tr> :
                                <tr>
                                    <td colSpan={5}>
                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                    </td>
                                </tr>
                        }
                    </tbody>
                </table>

                <Modal title={title}
                    width={'70%'}
                    bodyStyle={{ lineHeight: '2.8' }}
                    visible={visible}
                    maskClosable={false}
                    onCancel={handleCancel}
                    footer={null}>
                    <AnnounceCreate
                        current={current}
                        onCancel={() => handleCancel()}
                        onData={() => this.getList()} />
                </Modal>
            </div>
        )
    }
}

export default Announcement;