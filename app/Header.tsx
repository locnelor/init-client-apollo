"use client"
import { Avatar, Flex, Layout, Menu, Space } from "antd";
import UserButton from "./UserButton";
import { useMemo } from "react";
import { ProgressBarLink } from "./progress-bar";


const Header = () => {
    const items = useMemo(() => [{
        href: "/",
        label: (<Avatar shape="square">Bug</Avatar>)
    }, {
        href: "/group",
        label: "小组",
    }, {
        href: "/about",
        label: "关于"
    }].map(({ href, label }) => ({
        key: href,
        label: (
            <ProgressBarLink key={href} href={href}>
                {label}
            </ProgressBarLink>
        )
    })), [])
    return (
        <Layout.Header className="shadow">
            <Flex justify="space-between">
                <Space>
                    <Menu items={items} mode="horizontal" />
                </Space>
                <Flex>
                    <UserButton />
                </Flex>
            </Flex>
        </Layout.Header>
    )
}
export default Header