import useOpen from "@/hooks/useOpen";
import { useColumns, useDataSource } from "@/hooks/useTable";
import { gqlError } from "@/libs/apollo-errors";
import {
  ClassesEntity,
  DelClassessTeacherMutation,
  GetClassesByTeacherMutation,
} from "@/queries/classes";
import { TeacherEntity } from "@/queries/teacher";
import { useMutation } from "@apollo/client";
import { Button, Modal, Table, message } from "antd";
import Link from "next/link";
import { useCallback } from "react";

const ClassesList = ({ teacher }: { teacher: TeacherEntity }) => {
  const [open, onOpen, onCancel] = useOpen();
  const [getData, { data, loading }] = useMutation(GetClassesByTeacherMutation);
  const [del] = useMutation(DelClassessTeacherMutation, {
    onCompleted() {
      message.success("删除成功");
      getData({
        variables: {
          id: teacher.id,
        },
      });
    },
    onError(error) {
      gqlError(error);
    },
  });
  const onClick = useCallback(() => {
    if (!data)
      getData({
        variables: {
          id: teacher.id,
        },
      });
    onOpen();
  }, [data]);
  const onDel = useCallback(
    (classesId: number) => {
      Modal.confirm({
        title: "删除后，相关数据均会删除且不可恢复，确认要删除吗？",
        okText: "确认",
        onOk: () => {
          del({
            variables: {
              teacherId: teacher.id,
              classesId,
            },
          });
        },
      });
    },
    [teacher]
  );
  const columns = useColumns([
    {
      title: "班级",
      render: (classes: ClassesEntity) => {
        return <Link href={`/`}>{classes.name}</Link>;
      },
    },
    {
      title: "操作",
      render: (classes: ClassesEntity) => {
        return (
          <Button danger onClick={onDel.bind(null, classes.id)}>
            删除
          </Button>
        );
      },
    },
  ]);
  const dataSource = useDataSource(data?.getClassesByTeacher || []);
  return (
    <>
      <Modal open={open} onCancel={onCancel} title={`${teacher.name} 班级列表`}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          loading={loading}
        />
      </Modal>
      <Button onClick={onClick}>班级列表</Button>
    </>
  );
};
export default ClassesList;
