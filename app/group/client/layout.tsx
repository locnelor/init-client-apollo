import Container from "@/components/Container"
import { Avatar, Card, Flex, Form, Input, Space } from "antd"


const GroupClientLayout = ({ children }: { children: any }) => {
    //创建一个群组
    return (
        <Container>
            {children}
        </Container>
    )
}
export default GroupClientLayout