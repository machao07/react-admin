import React, { Component } from "react";
import { Button, Form, Input, notification } from "antd";
import { getSellerId } from 'utils/storage';
import { addNotice } from "api/configuration/announcement";
import { FormInstance } from "antd/lib/form";
import ReactQillWrap from 'components/reactQuill';

interface Props {
    current?: any
    onCancel: () => void
    onData: () => void
}
interface States {
    content: string
}

class AnnounceCreate extends Component<Props, States>{
    type = 1;
    reactQuillRef: any = null;
    form = React.createRef<FormInstance>()
    constructor(props: Props) {
        super(props);
        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        const currentItem = this.props.current;
        if (currentItem) {
            this.form.current?.setFieldsValue({
                name: currentItem.name,
                content: currentItem.content
            })
        }
    }

    handleChange(value: string) {
        this.setState({ content: value })
    }

    render() {
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        };
        const tailLayout = {
            wrapperCol: { offset: 20, span: 4 },
        };

        const onFinish = (values: any) => {
            let msg: string;
            const obj = { targetId: getSellerId(), type: this.type, ...values }
            if (this.props.current) {
                msg = '更新公告成功'
            } else {
                msg = '添加公告成功'
            }
            addNotice(getSellerId(), this.type, obj).then(res => {
                notification.success({
                    message:'成功',
                    description: msg
                })
                this.props.onCancel();
                this.props.onData();
            }).catch(() => { })
        }

        return (
            <Form
                {...layout}
                ref={this.form}
                onFinish={onFinish}>
                <Form.Item
                    label="公司标题名称"
                    name="name"
                    rules={[{ required: true }]}>
                    <Input className="w300" placeholder="15个字以内" />
                </Form.Item>
                <Form.Item
                    label="公司内容"
                    name="content"
                    initialValue=""
                    rules={[{ required: true }]}
                >
                    <ReactQillWrap value={this.state.content} onChange={this.handleChange.bind(this)} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button onClick={() => this.props.onCancel()}>取消</Button>
                    {
                        this.props.current ?
                            <Button className="ml20" type="primary" htmlType="submit">保存</Button> :
                            <Button className="ml20" type="primary" htmlType="submit">确定</Button>
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default AnnounceCreate;