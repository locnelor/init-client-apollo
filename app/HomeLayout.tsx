"use client"

import { Layout } from "antd"
import { PropsWithChildren } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { ProgressBar } from "./progress-bar"



const HomeLayout = ({ children }: PropsWithChildren) => {
    return (
        <Layout>
            <ProgressBar className="fixed top-0 h-1 bg-sky-500">
                <Header />
                <Layout.Content className="pb-5 pt-3">
                    {children}
                </Layout.Content>
                <Footer />
            </ProgressBar>
        </Layout>
    )
}
export default HomeLayout