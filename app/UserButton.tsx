"use client"

import useClientViewer from "@/hooks/useClientViewer"
import { Button } from "antd";
import Link from "next/link";

const UserButton = () => {
    const { user } = useClientViewer();
    if (!!user) {
        return (
            <div>
                {user.name}
            </div>
        )
    }
    return (
        <Link href="/auth">
            <Button type="dashed">
                注册 或 登录
            </Button>
        </Link>
    )
}
export default UserButton