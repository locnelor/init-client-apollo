"use client"
import { Card, Col, Flex, Row } from "antd"
import { useMemo } from "react"
import { PlusCircleOutlined } from "@ant-design/icons"
import { ProgressBarLink } from "../progress-bar"

const GroupClientPage = () => {

    const items = useMemo(() => [{
        title: "报名登记",
        content: "信息登记填报，支持导出表格，暂不支持数据统计",
        href: "/group/client/register"
    }, {
        title: "发布作业",
        content: "发布一项作业，支持一键整改格式",
        href: "/group/client/publish"
    }, {
        title: "创建群组",
        content: "创建一个群组，邀请其他成员加入我们吧！",
        href: "/group/client/create"
    }], [])
    return (
        <Row gutter={[20, 20]}>
            <Col span={8}>
                <Card>
                    广告位
                </Card>
            </Col>
            <Col span={8}>
                <Card>
                    {items.map((item, index) => {
                        return (
                            <Card.Grid style={{ width: "100%" }} key={index}>
                                <Flex justify="space-between">
                                    <div>
                                        <div className="text-xl">{item.title}</div>
                                        {item.content}
                                    </div>
                                    <Flex align="center">
                                        <ProgressBarLink href={item.href}>
                                            <PlusCircleOutlined className="cursor-pointer hover:text-blue-500" />
                                        </ProgressBarLink>
                                    </Flex>
                                </Flex>
                            </Card.Grid>
                        )
                    })}
                </Card>
            </Col>
        </Row>
    )
}
export default GroupClientPage