import useOpen from "@/hooks/useOpen";
import { useDataSource, useColumns } from "@/hooks/useTable";
import { GetAllTaskQuery, TaskEntity, TaskItemEntity } from "@/queries/task";
import { useQuery } from "@apollo/client";
import { Button, Modal, Table } from "antd"
import moment from "moment";
import { useCallback, useEffect } from "react";


const HistoryButtonModal = ({
    onChange
}: { onChange: (items: TaskItemEntity[]) => void }) => {
    const [open, onOpen, onCancel] = useOpen();
    const { data, refetch } = useQuery(GetAllTaskQuery)
    useEffect(() => {
        if (open) refetch()
    }, [open])
    const onBind = useCallback((item: TaskEntity) => {
        onChange(item.TaskItem)
        onCancel()
    }, [onChange])
    const dataSource = useDataSource(data?.getAllTask);
    const columns = useColumns([{
        title: "标题",
        dataIndex: "title"
    }, {
        dataIndex: "startTime",
        key: "startTime",
        title: "开始时间",
        render: (e: string) => moment(e).format("YYYY-MM-DD")
    }, {
        dataIndex: "deadline",
        key: "deadline",
        title: "结束时间",
        render: (e: string) => moment(e).format("YYYY-MM-DD")
    }, {
        dataIndex: "comment",
        key: "comment",
        title: "备注"
    }, {
        render: (e: TaskEntity) => {
            return (
                <Button
                    onClick={onBind.bind(null, e)}
                >
                    使用
                </Button>
            )
        }
    }]);

    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                title={"任务列表"}
                width={800}
            >
                <Table
                    dataSource={dataSource}
                    columns={columns}
                />
            </Modal>
            <Button
                type="text"
                onClick={onOpen}
            >
                导入历史数据
            </Button>
        </>
    )
}
export default HistoryButtonModal