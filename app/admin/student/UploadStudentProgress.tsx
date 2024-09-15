import { gqlError } from "@/libs/apollo-errors";
import { sleep } from "@/libs/utils";
import { Modal, Progress } from "antd";
import { useEffect, useState } from "react"


const UploadStudentProgress = ({
    data: {
        table,
        college,
        department
    },
    onSubmit,
    onFinish
}: any) => {
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        (async () => {
            let i = 0;
            console.log(table, college, department)
            const total = table.reduce((acc: number, item: any) => acc + item.data.length, 0);
            for (const { name, data } of table) {
                i += data.length;
                const res = await onSubmit({
                    variables: {
                        data: (data as any[][]).map(e => e.map(e => "" + e)),
                        name: name,
                        college,
                        department
                    }
                })
                if (!!res.errors) {
                    gqlError(res.errors)
                    onFinish(false)
                    break;
                }
                await sleep(50)
                setPercent(Number((i / total * 100).toFixed(2)))
            }
            onFinish(true);
        })()
    }, [])
    return (
        <Progress
            percent={percent}
        />
    )
}
export default UploadStudentProgress
export const openUploadStudentModal = (data: any, onSubmit: any) => {
    return new Promise<boolean>(resolve => {
        Modal.info({
            content: <UploadStudentProgress
                onSubmit={onSubmit}
                onFinish={resolve}
                data={data}
            />,
            title: "上传进度",
            okText: "确定"
        })
    })
}