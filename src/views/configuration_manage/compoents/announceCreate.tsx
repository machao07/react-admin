import React, { Component } from "react";
import { Form, Input } from "antd";
import { getSellerId } from 'utils/storage';
import { getNoticeList } from "api/configuration/announcement";
import { FormInstance } from "antd/lib/form";

interface Props {
    currentId?: string | number
}

interface States {

}

class AnnounceCreate extends Component<Props, States>{
    type = 1;
    form = React.createRef<FormInstance>()
    constructor(props: Props) {
        super(props);
        this.state = {}
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

    render() {
        const onFinish = (values: any) => {
            console.log(values)
        }

        return (
            <Form
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
                    rules={[{ required: true }]}>
                    <Input className="w300" />
                </Form.Item>
            </Form>
        )
    }
}

export default AnnounceCreate;