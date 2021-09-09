import React, { Component } from "react";
import { Button, Empty } from "antd";
import { getSellerId } from 'utils/storage';
import { getNoticeList } from "api/configuration/announcement";

interface States {
    noticeData: any
}

class Announcement extends Component<any, States> {
    type = 1; // 单店
    constructor(props: any) {
        super(props);
        this.state = {
            noticeData: undefined
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

    render() {
        const { noticeData } = this.state
        return (
            <div className="container">
                <div className="ikd-page-header"><div className="title">公告管理</div></div>
                <Button type="primary" style={{ marginBottom: 15 }}>添加公告</Button>
                <table className="ikd-input-table no-first">
                    <thead>
                        <th className="tc">公司标题名称</th>
                        <th className="tc">内容</th>
                        <th className="tc">发布时间</th>
                        <th className="tc">状态</th>
                        <th className="tc">操作</th>
                    </thead>
                    <tbody>
                        {
                            noticeData ?
                                <tr>
                                    <td className="tc">{noticeData.name}</td>
                                    <td className="tc" dangerouslySetInnerHTML={{ __html: noticeData.content }}></td>
                                    <td className="tc">{noticeData.statusAt}</td>
                                    <td className="tc">{this.getStatusText(noticeData.status)}</td>
                                    <td className="tc">
                                        <Button type="text">启用</Button>
                                        <Button type="text">禁用</Button>
                                        <Button type="text">编辑</Button>
                                        <Button type="text">删除</Button>
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
            </div>
        )
    }
}

export default Announcement;