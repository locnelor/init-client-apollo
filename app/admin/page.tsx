"use client";
import { useColumns, useDataSource } from "@/hooks/useTable";
import { gqlError } from "@/libs/apollo-errors";
import {
  AddTaskMutation,
  DelTaskMutation,
  getAllTaskAndFinishedQuery,
  TaskEntity,
} from "@/queries/task";
import { useMutation, useQuery } from "@apollo/client";
import {
  message,
  Modal,
  Typography,
  Popover,
  Progress,
  Tag,
  Space,
  Button,
  Table,
} from "antd";
import moment from "moment";
import Link from "next/link";
import { useMemo, useCallback } from "react";
import TaskButton from "./TaskButton";
import { gqlMutationRes } from "@/libs/apollo/apollo-error";

const AdminPage = () => {
  const { data, loading, refetch } = useQuery(getAllTaskAndFinishedQuery);
  const [del] = useMutation(DelTaskMutation, {
    onCompleted() {
      refetch();
      message.success("任务删除成功");
    },
    onError(error) {
      gqlError(error);
    },
  });
  const taskList: TaskEntity[] = useMemo(
    () => data?.getAllTaskAndFinished || [],
    [data]
  );

  const [add] = useMutation(AddTaskMutation, {
    onCompleted() {
      refetch();
      message.success("任务添加成功");
    },
    onError(error) {
      gqlError(error);
    },
  });
  const onAddTask = useCallback(
    ({
      range: [startTime, deadline],
      classes,
      title,
      comment,
      id,
      status,
      ...items
    }: any) => {
      if (!Object.keys(items).length) {
        message.error({ content: "至少添加一个评价项" });
        return false;
      }
      const variables = {
        startTime: startTime.format("YYYY-MM-DD"),
        deadline: deadline.format("YYYY-MM-DD"),
        title,
        id,
        comment,
        status,
        select: classes,
        items: Object.keys(items).map((name) => ({
          name,
          comment: items[name],
        })),
      };
      return gqlMutationRes(add({ variables }));
    },
    []
  );
  const onDelete = useCallback((id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "删除后不可恢复，确认要删除吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        del({ variables: { id } });
      },
    });
  }, []);
  const columns = useColumns([
    {
      dataIndex: "key",
      render: (key: number) => key + 1,
      title: <TaskButton onSubmit={onAddTask}>新建任务</TaskButton>,
    },
    {
      title: "任务标题",
      render: (line: TaskEntity) => {
        return (
          <Link href={`/admin/task/${line.id}/detail`}>
            <Typography.Text strong>{line.title}</Typography.Text>
          </Link>
        );
      },
    },
    {
      dataIndex: "total",
      title: "总数",
    },
    {
      dataIndex: "userCount",
      title: "用户数",
    },
    {
      dataIndex: "teacherCount",
      title: "教师数",
    },
    {
      title: "进度",
      render: ({ total, finishedCount }: TaskEntity) => {
        if (!finishedCount) finishedCount = 0;
        if (!total) total = 1;
        const percent = finishedCount / total;
        return (
          <Popover content={`已完成数: ${finishedCount}`}>
            <Progress
              percent={Number((percent * 100).toFixed(2))}
              status={percent === 1 ? "success" : "active"}
            />
          </Popover>
        );
      },
    },
    {
      dataIndex: "startTime",
      title: "开始时间",
      render: (e: string) => moment(e).format("YYYY-MM-DD"),
    },
    {
      dataIndex: "deadline",
      title: "结束时间",
      render: (e: string) => moment(e).format("YYYY-MM-DD"),
    },
    {
      dataIndex: "status",
      title: "状态",
      render: (bool: boolean) => (
        <Tag color={bool ? "green" : "red"}>{bool ? "正常" : "暂停"}</Tag>
      ),
    },
    {
      dataIndex: "comment",
      title: "备注",
      ellipsis: true,
    },
    {
      title: "操作",
      render: (line: any) => {
        return (
          <Space size="small">
            <TaskButton id={line.id} onSubmit={onAddTask}>
              修改
            </TaskButton>
            <Button onClick={() => onDelete(line.id)} danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ]);
  const dataSource = useDataSource(taskList);
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条数据`,
      }}
      loading={loading}
      rowKey="id"
    />
  );
};
export default AdminPage;
