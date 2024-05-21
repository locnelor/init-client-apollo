"use client"

import { StyleProvider } from "@ant-design/cssinjs"
import { ConfigProvider } from "antd"
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { PropsWithChildren } from "react";

const HomeProvider = ({ children }: PropsWithChildren) => {
    // return children
    return (
        <StyleProvider>
            <ConfigProvider
                locale={zhCN}
                theme={{
                    components: {
                        Layout: {
                            headerBg: "#fff",
                            bodyBg: "#fff"
                        },
                    }
                }}
            >
                {children}
            </ConfigProvider>
        </StyleProvider>
    )
}
export default HomeProvider