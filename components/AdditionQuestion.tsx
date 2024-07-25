"use client"

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Space } from "antd"

export type AdditionQuestionProps = {
    name: string
}
const AdditionQuestion = ({
    name
}: AdditionQuestionProps) => {

    return (
        <div className="w-52">
            <Form.List name={name}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, ...field }) => (
                            <Space key={key} className="mb-3">
                                <Form.Item {...field} noStyle>
                                    <Input />
                                </Form.Item>
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                block
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                            >
                                添加
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

        </div>
    )
}
export default AdditionQuestion