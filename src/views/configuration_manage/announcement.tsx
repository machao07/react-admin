import React, { Component } from "react";
import { Button, Empty, Modal } from "antd";
import { getSellerId } from 'utils/storage';
import { getNoticeList } from "api/configuration/announcement";
import AnnounceCreate from "./compoents/announceCreate";

interface States {
    noticeData: any
    visible: boolean
    title: string
}

class Announcement extends Component<any, States> {
    type = 1; // 单店
    constructor(props: any) {
        super(props);
        this.state = {
            noticeData: undefined,
            visible: false,
            title: '新增公告'
        }
    }

    componentDidMount() {
        this.getList()
    }

    getList() {
        getNoticeList(getSellerId(), this.type).then((res) => {
            this.setState({ noticeData: res.data[0] })
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
        this.setState({
            visible: true
        })
    }

    render() {
        const { noticeData, visible, title } = this.state;
        const handleCancel = () => {
            this.setState({ visible: false })
        };

        return (
            <div className="container">
                <div className="ikd-page-header"><div className="title">公告管理</div></div>
                <Button type="primary" style={{ marginBottom: 15 }} onClick={this.handelCreate.bind(this)}>添加公告</Button>
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
                                        <Button type="link">启用</Button>
                                        <Button type="link">禁用</Button>
                                        <Button type="link">编辑</Button>
                                        <Button type="link">删除</Button>
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
                    <AnnounceCreate onCancel={() => handleCancel()} />
                </Modal>
            </div>
        )
    }
}

export default Announcement;