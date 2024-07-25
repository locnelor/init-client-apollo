"use client"

import AdditionInfo from "@/components/AdditionInfo"
import AdditionQuestion from "@/components/AdditionQuestion"
import { gql, useMutation } from "@apollo/client"
import { Form, Card, Flex, Avatar, Space, Input, Button, Row, Col, Switch } from "antd"
import { useCallback, useEffect } from "react"

export const CreateGroupMutation = gql`
    mutation CreateGroup(
        $data:CreateGroupInput!
    ){
        createGroup(data:$data)
    }
`
const GroupClientCreateClientPage = () => {
    const [form] = Form.useForm()
    const [insert, { loading }] = useMutation(CreateGroupMutation, {
        onCompleted(data, clientOptions) {

        },
        onError(error, variables) {
            console.log(error)
        },
    })
    const onFinish = useCallback((values: any) => {
        console.log(values)
        insert({
            variables: {
                data: values,
            },
        })
    }, [])
    return (
        <Form
            onFinish={onFinish}
            form={form}
        >
            <Card>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Flex justify="space-between" gap={16}>
                            <Space align="end">
                                <Avatar size={128}>
                                    Icon
                                </Avatar>
                                <Space align="end">
                                    <Form.Item rules={[{ required: true, message: "请填写群名称" }]} name="name">
                                        <Input></Input>
                                    </Form.Item>
                                </Space>
                            </Space>
                            <Button type="link">订制背景图</Button>
                        </Flex>
                    </Col>
                    <Col span={24}>
                        <div className="text-2xl">入群要求:</div>
                        <div>加入群组需要回答以下问题</div>
                        <div className="max-w-96">
                            <AdditionQuestion name="question" />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="text-2xl">群成员信息:</div>
                        <div>群成员需要填写以下信息</div>
                        <div>
                            <Form.Item name="info">
                                <AdditionInfo />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="text-2xl">群权限:</div>
                        <Form.Item label="允许加入" name="allow">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Button loading={loading} type="primary" htmlType="submit">提交</Button>
                    </Col>
                </Row>
            </Card>
        </Form>
    )
}
export default GroupClientCreateClientPage