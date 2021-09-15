import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import { getSellerId } from 'utils/storage';
import { getNoticeList } from "api/configuration/announcement";
import { FormInstance } from "antd/lib/form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactQillWrap from 'components/reactQuill'

interface Props {
    currentId?: string | number
    onCancel: () => void
}

class AnnounceCreate extends Component<Props, any>{
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
        this.getData()
    }

    getData() {
        getNoticeList(getSellerId(), this.type).then((res) => {
            const data = res.data[0];
            this.form.current?.setFieldsValue({
                name: data.name,
                content: data.content
            })
        }).catch(() => { })
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
            console.log(values)
        }

        return (
            <Form
                {...layout}
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
                    <ReactQillWrap onChange={this.handleChange.bind(this)} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button onClick={() => this.props.onCancel()}>取消</Button>
                    <Button className="ml20" type="primary" htmlType="submit">确定</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default AnnounceCreate;