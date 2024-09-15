import { useDataSource, useColumns } from "@/hooks/useTable";
import { gqlError } from "@/libs/apollo-errors";
import { UserDeleteManyByIdsMutation, UserEntity, UserResetManyByIdsMutation } from "@/queries/UserEntity";
import { useMutation } from "@apollo/client";
import { Button, Modal, Table, message } from "antd";
import Link from "next/link";
import React, { useCallback, useState } from "react";


const StudentListRender = ({
    students,
    refetch,
    loading
}: {
    students: UserEntity[],
    refetch: () => void,
    loading?: boolean
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [onDel] = useMutation(UserDeleteManyByIdsMutation, {
        onError(error) {
            gqlError(error)
        },
        onCompleted() {
            refetch()
            message.success("删除成功")
            setSelectedRowKeys([])
        }
    })
    const [onUpd] = useMutation(UserResetManyByIdsMutation, {
        onError(error) {
            gqlError(error)
        },
        onCompleted() {
            refetch()
            message.success("修改成功")
        }
    })

    const onDelete = useCallback(() => {
        Modal.confirm({
            title: "删除后，相关数据同步删除且不可逆，确认要删除吗？",
            onOk: () => {
                onDel({
                    variables: { ids: selectedRowKeys.map(key => students[Number(key)].id) }
                })
            }
        })
    }, [selectedRowKeys])
    const onReset = useCallback(() => {
        Modal.confirm({
            title: "将所选用户的密码重置为学号，改操作不可逆，确认要重制吗？",
            onOk: () => {
                onUpd({
                    variables: { ids: selectedRowKeys.map(key => students[Number(key)].id) }
                })
            }
        })
    }, [selectedRowKeys])
    const dataSource = useDataSource(students);
    const columns = useColumns([{
        render: (line: UserEntity) => {
            return (
                <div>
                    <Link href={`/admin/classes/${line.classes?.id}`}>
                        {line.classes?.name}
                    </Link>
                </div>
            )
        },
        title: () => {
            return (
                <div className="flex gap-2">
                    <div>班级</div>
                    <div>
                        {!!selectedRowKeys.length && (
                            <Button.Group size="small">
                                <Button onClick={onDelete} danger>删除</Button>
                                <Button onClick={onReset}>初始密码</Button>
                            </Button.Group>
                        )}
                    </div>
                </div>
            )
        }
    }, {
        title: "学号",
        dataIndex: "account"
    }, {
        title: "姓名",
        render: (line: UserEntity) => {
            return line.profile.name
        }
    }])
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowSelection={{
                selectedRowKeys, onChange(selectedRowKeys) {
                    setSelectedRowKeys(selectedRowKeys);
                },
            }}
            loading={loading}
        />
    )
}
export default StudentListRender