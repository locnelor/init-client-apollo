import useOpen from "@/hooks/useOpen";
import usePagination from "@/hooks/usePagination";
import { useDataSource, useColumns } from "@/hooks/useTable";
import {
  GetTaskCommentQuery,
  GetTeacherOnTaskItemsQuery,
  TaskItemEntity,
} from "@/queries/task";
import { TeacherEntity } from "@/queries/teacher";
import { useQuery } from "@apollo/client";
import { Button, Divider, Modal, Table } from "antd";
import { useCallback, useMemo } from "react";

const Render = ({
  taskId,
  teacherId,
}: {
  taskId: number;
  teacherId: number;
}) => {
  const { data, loading } = useQuery(GetTeacherOnTaskItemsQuery, {
    variables: {
      taskId,
      teacherId,
    },
  });
  const dataSource = useDataSource(data?.getTeacherOnTaskItems || []);
  const columns = useColumns([
    {
      title: "评价项",
      dataIndex: "taskItem",
      render: (item: TaskItemEntity) => item?.name,
    },
    {
      title: "样本数",
      dataIndex: "count",
    },
    {
      title: "平均分",
      render: (item: any) => {
        if (item.count === 0) return 0;
        return ((item.score / item.count) * 20).toFixed(2);
      },
    },
  ]);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      pagination={false}
    />
  );
};
const CommentRender = ({
  id,
  teacherId,
}: {
  id: number;
  teacherId: number;
}) => {
  const { data, refetch } = useQuery(GetTaskCommentQuery, {
    variables: {
      id,
    },
  });
  const dataPagination: any = useMemo(() => data?.getTaskComment || {}, [data]);
  const onChange = useCallback(
    ({ skip = 0, take = 0 }) => {
      refetch({
        id,
        skip,
        take,
        teacherId,
      });
    },
    [id, refetch]
  );
  const pagination = usePagination(dataPagination, onChange);
  const dataSource = useDataSource(dataPagination.data || []);
  const columns = useColumns([
    {
      dataIndex: "common",
    },
  ]);
  return (
    <div>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
      <Divider />
      {pagination}
    </div>
  );
};
const TaskTeacherDetailButton = ({
  taskId,
  teacher,
}: {
  taskId: number;
  teacher: TeacherEntity;
}) => {
  const [open, onOpen, onCancel] = useOpen();
  const [openComment, onOpenComment, onCancelComment] = useOpen();

  return (
    <>
      <Button.Group size="small">
        <Button type="primary" onClick={onOpen}>
          更多
        </Button>
      </Button.Group>
      <Modal
        open={open}
        onCancel={onCancel}
        title={`${teacher.name} 相关数据`}
        width={900}
      >
        <Modal
          open={openComment}
          onCancel={onCancelComment}
          title={`${teacher.name} 相关评论`}
        >
          <CommentRender id={taskId} teacherId={teacher.id} />
        </Modal>
        <Button onClick={onOpenComment}>查看评论</Button>
        <Divider />
        {open && <Render taskId={taskId} teacherId={teacher.id} />}
      </Modal>
    </>
  );
};
export default TaskTeacherDetailButton;
