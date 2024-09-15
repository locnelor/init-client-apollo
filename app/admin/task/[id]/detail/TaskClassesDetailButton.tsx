import useOpen from "@/hooks/useOpen";
import { useColumns, useDataSource } from "@/hooks/useTable";
import { UserEntity } from "@/queries/UserEntity";
import { ClassesEntity } from "@/queries/classes";
import { ProfileEntity } from "@/queries/profile";
import { GetTaskItemDetailByClassesMutation } from "@/queries/task";
import { useMutation } from "@apollo/client";
import { Button, Modal, Table } from "antd";
import { useEffect, useMemo } from "react";

const TaskClassesDetailButton = ({
  taskId,
  classes,
}: {
  taskId: number;
  classes: ClassesEntity;
}) => {
  const [open, onOpen, onCancel] = useOpen();
  const [get, { data, loading }] = useMutation(
    GetTaskItemDetailByClassesMutation
  );
  useEffect(() => {
    if (!open) return;
    get({
      variables: {
        id: taskId,
        classesId: classes.id,
      },
    });
  }, [open, taskId, classes.id]);
  const detail: ClassesEntity = useMemo(
    () => data?.getTaskItemDetailByClasses,
    [data]
  );
  const columns = useColumns([
    {
      title: "姓名",
      dataIndex: "profile",
      render: (e: ProfileEntity) => {
        return e.name;
      },
    },
    {
      title: "学号",
      dataIndex: "account",
    },
    {
      title: "已完成",
      render: (user: UserEntity) => {
        return user.UserOnTask?.length || 0;
      },
      sorter: {
        compare: (a: any, b: any) => {
          return a.UserOnTask?.length - b.UserOnTask?.length;
        },
        multiple: 3,
      },
    },
  ]);
  const dataSource = useDataSource(detail?.User || []);
  return (
    <>
      <Button size="small" onClick={onOpen}>
        更多
      </Button>
      <Modal
        open={open}
        onCancel={onCancel}
        onOk={onCancel}
        title={`${classes.name} 未完成名单`}
      >
        <Table columns={columns} dataSource={dataSource} loading={loading} />
      </Modal>
    </>
  );
};
export default TaskClassesDetailButton;
