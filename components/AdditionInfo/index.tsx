import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Flex, Form, Input, InputNumber, List, Modal, Select, Space, Switch, Tabs } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import { BasicOption, InfoOption, TypeOption } from "./data"
import useVisible from "@/hooks/useVisible"
import AdditionQuestion from "../AdditionQuestion"


const AdditionItem = ({
    value,
    onChange,
    onRemove
}: any) => {
    const [visible, open, cancel] = useVisible();
    const rules = useMemo(() => (TypeOption as any)[value.type], [value]);
    const [form] = Form.useForm();
    const onFinish = useCallback((v: any) => {
        onChange({ ...value, ...v });
        cancel()
    }, [rules, value])
    useEffect(() => {
        form.setFieldsValue(value);
    }, [value, rules]);
    const onChangeChecked = useCallback((required: boolean) => {
        onChange({ ...value, required });
    }, [value]);
    return (
        <div>
            <Space direction="vertical">
                <div className="text-xl font-bold">{value.label}:</div>
                <div>{value.comment}</div>
                <div>规则</div>
                {!!rules}
                {rules?.filter((item: any) => !!value[item.name]).map(({ name, label }: any, index: number) => (
                    <Space key={index}>
                        <div>{label}</div>
                        <div>:</div>
                        <div>{value[name].toString()}</div>
                    </Space>
                )) ?? "无"}
            </Space>
            <Modal
                open={visible}
                title="修改规则"
                onCancel={cancel}
                onOk={form.submit}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item label="标题" name="label">
                        <Input />
                    </Form.Item>
                    {rules?.map(({ name, type, label, options }: any, index: number) => {
                        if (type === "number") {
                            return (
                                <Form.Item label={label} name={name} key={index}>
                                    <InputNumber />
                                </Form.Item>
                            )
                        }
                        if (type === "input") {
                            return (
                                <Form.Item label={label} name={name} key={index}>
                                    <Input />
                                </Form.Item>
                            )
                        }
                        if (type === "options") {
                            return (
                                <Form.Item label={label} name={name} key={index}>
                                    <AdditionQuestion name={name} />
                                </Form.Item>
                            )
                        }
                        if (type === "switch") {
                            return (
                                <Form.Item label={label} name={name} key={index}>
                                    <Switch />
                                </Form.Item>
                            )
                        }
                        if (type === "select") {
                            return (
                                <Form.Item label={label} name={name} key={index}>
                                    <Select options={options} />
                                </Form.Item>
                            )
                        }
                    })}
                    <Form.Item label="说明" name="comment">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
            <Divider></Divider>
            <Space align="center">
                <Button onClick={open} type="text">修改</Button>
                <Form.Item
                    label="是否必选"
                    style={{ margin: 0 }}
                >
                    <Switch onChange={onChangeChecked} checked={value.required} />
                </Form.Item>
                <Button onClick={onRemove} type="text">删除</Button>
            </Space>
        </div>
    )
}
type AdditionInfoProps = {
    value?: any[],
    onChange?: (value: any[]) => void
}
const AdditionInfo = ({ value, onChange }: AdditionInfoProps) => {
    const [visible, open, close] = useVisible()
    const [order, setOrder] = useState(0);
    const items = useMemo(() => [
        {
            label: "基础格式",
            children: BasicOption
        }, {
            label: "所有格式",
            children: InfoOption
        }, {
            label: "历史格式",
            children: []
        }
    ], [])
    const onAdd = useCallback((item: any, order: number) => {
        if (!value) value = [];
        const newItem = { ...item, order }
        onChange?.([...value, newItem])
    }, [value, onChange])
    return (
        <List
            dataSource={value?.sort((a, b) => a.order - b.order)}
            renderItem={(item, index) => (
                <List.Item key={index} className="justify-between">
                    <AdditionItem
                        value={item}
                        onChange={(v: any) => {
                            if (!value) return;
                            value[index] = v;
                            onChange?.([...value]);
                        }}
                        onRemove={() => {
                            if (!value) return;
                            onChange?.([...value.filter((v: any, i: number) => index !== i)])
                        }}
                    />
                    <div>
                        调整
                    </div>
                </List.Item>
            )}
            header={
                <Modal onCancel={close} title="添加格式" open={visible} footer={null}>
                    <Tabs items={items.map(({ label, children }, key) => ({
                        key: key + "",
                        label,
                        children: (
                            <Card>
                                <Flex wrap gap={2}>
                                    {children.map((item, key) => (
                                        <Card
                                            className="text-center w-13 h-13 cursor-pointer"
                                            onClick={() => {
                                                onAdd({ ...item, order: order }, value?.length ?? 0)
                                                close()
                                            }}
                                            key={key}
                                        >
                                            {item.label}
                                        </Card>
                                    ))}
                                </Flex>
                            </Card>
                        )
                    }))}></Tabs>
                </Modal>
            }
            footer={
                <Button onClick={open} icon={<PlusOutlined />}>
                    添加格式
                </Button>
            }
        />
    )
}
export default AdditionInfo