"use client";

import BackHeading from "@/components/BackHeading";
import { GetTaskDetailQuery } from "@/queries/task";
import { TeacherEntity } from "@/queries/teacher";
import { useQuery } from "@apollo/client";
import { Table, Tabs } from "antd";
import TaskTeacherDetailButton from "./TaskTeacherDetailButton";
import { ClassesEntity } from "@/queries/classes";
import TaskClassesDetailButton from "./TaskClassesDetailButton";
import { useEffect } from "react";
import TaskClassesFinished from "./TaskClassesFinished";
import { useColumns, useDataSource } from "@/hooks/useTable";

const TaskDetailPage = ({ params: { id } }: any) => {
  const { data, loading, refetch } = useQuery(GetTaskDetailQuery, {
    variables: {
      id: Number(id),
    },
  });
  useEffect(() => {
    if (!!data) refetch({ id: Number(id) });
  }, []);
  const columns = useColumns([
    {
      title: "序号",
      dataIndex: "key",
      render: (key: number) => key + 1,
    },
    {
      title: "姓名",
      dataIndex: "teacher",
      render: (teacher: TeacherEntity) => teacher.name,
    },
    {
      title: "样本数",
      dataIndex: "finished",
    },
    {
      title: "未完成",
      render: ({ total, finished }: any) => total - finished,
    },
    {
      title: "总数",
      dataIndex: "total",
    },
    {
      dataIndex: "teacher",
      render: (teacher: TeacherEntity) => {
        return (
          <TaskTeacherDetailButton taskId={Number(id)} teacher={teacher} />
        );
      },
    },
  ]);
  const classesColumns = useColumns([
    {
      title: "序号",
      dataIndex: "key",
      render: (key: number) => key + 1,
    },
    {
      title: "班级名称",
      dataIndex: "classes",
      render: (classes: ClassesEntity) => {
        return classes?.name;
      },
    },
    {
      title: "样本数",
      dataIndex: "classes",
      render: (classes: ClassesEntity) => {
        // return classes.finished || 0
        return (
          <TaskClassesFinished classesId={classes.id} taskId={Number(id)} />
        );
      },
    },
    {
      title: "班级人数",
      dataIndex: "classes",
      render: (classes: ClassesEntity) => {
        return classes?._count?.User || 0;
      },
    },
    {
      dataIndex: "classes",
      render: (classes: ClassesEntity) => {
        return (
          <TaskClassesDetailButton taskId={Number(id)} classes={classes} />
        );
      },
    },
  ]);
  const dataSource = useDataSource(data?.getTaskTeachersDetail || []);
  const classesDataSource = useDataSource(
    data?.getTaskClassesDetail.TaskOnClasses || []
  );
  return (
    <div>
      <BackHeading />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="相关教师" key="1">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            loading={loading}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="相关班级" key="2">
          <Table
            columns={classesColumns}
            dataSource={classesDataSource}
            pagination={false}
            loading={loading}
            scroll={{ x: 1300 }}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
export default TaskDetailPage;
