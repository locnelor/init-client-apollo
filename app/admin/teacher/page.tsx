"use client";
import { useCallback, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Table, message, Typography, Space } from "antd";
import {
  AddTeacherMutation,
  DelTeacherMutation,
  SaveClassesTeacherByNameMutation,
  SearchTeacherQuery,
  TeacherEntity,
} from "@/queries/teacher";
import { AddTeacherForm } from "./AddTeacherForm";
import { ImportTeacherForm } from "./teacherForm";
import { openUploadTeacherOnClassesModal } from "./UploadTeacherOnClassesProgress";
import ClassesList from "./ClassesList";
import UiFormButton from "@/components/UiFormButton";
import { useColumns, useDataSource } from "@/hooks/useTable";
import { gqlError } from "@/libs/apollo-errors";
import { gqlMutationRes } from "@/libs/apollo/apollo-error";
import DelPopover from "@/components/DelPopover";
import { xlsx2data } from "@/libs/query";

const { Title } = Typography;

const CommonTeacherPage = () => {
  const { data, loading, refetch } = useQuery(SearchTeacherQuery);
  const [saveClassesTeacher] = useMutation(SaveClassesTeacherByNameMutation);
  const teachers = useMemo(
    () => (data?.searchTeacher || []) as TeacherEntity[],
    [data]
  );
  const [addTeacher] = useMutation(AddTeacherMutation, {
    onCompleted() {
      refetch();
      message.success("教师添加成功");
    },
    onError(error) {
      gqlError(error);
    },
  });
  const [delTeacher] = useMutation(DelTeacherMutation, {
    onCompleted() {
      refetch();
      message.success("教师删除成功");
    },
    onError(error) {
      gqlError(error);
    },
  });
  const onAddTeacher = useCallback(({ name }: any) => {
    return gqlMutationRes(addTeacher({ variables: { name } }));
  }, []);
  const onImportData = useCallback(async ({ file: { file } }: any) => {
    const res = await xlsx2data(file)
      .then(({ data }) => data)
      .catch((err) => {
        message.error(err.message);
        return false;
      });
    if (!res) return false;
    const data = res
      .map((e: { data: any[] }) => e.data)
      .flat()
      .map((e: any[]) => e.map((e) => e.toString()));
    return await openUploadTeacherOnClassesModal(
      data,
      saveClassesTeacher
    ).finally(() => refetch());
  }, []);
  const columns = useColumns([
    {
      title: "序号",
      width: "80px",
      dataIndex: "key",
      render: (key: number) => key + 1,
    },
    {
      dataIndex: "name",
      title: "姓名",
    },
    {
      title: "管理班级",
      render: (line: TeacherEntity) => {
        return line._count?.TeacherOnClasses || 0;
      },
    },
    {
      title: "操作",
      render: (line: TeacherEntity) => {
        return (
          <Space>
            <DelPopover
              onConfirm={() => {
                gqlMutationRes(delTeacher({ variables: { id: line.id } }));
              }}
            />
            <ClassesList teacher={line} />
          </Space>
        );
      },
    },
  ]);
  const dataSource = useDataSource(teachers);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Title level={2}>教师管理</Title>
      <Space>
        <UiFormButton
          title="导入数据"
          form={ImportTeacherForm("/添加教师模板.xlsx")}
          onFinish={onImportData}
        >
          导入数据
        </UiFormButton>
        <UiFormButton
          form={AddTeacherForm()}
          title="添加教师"
          onFinish={onAddTeacher}
        >
          添加教师
        </UiFormButton>
      </Space>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 10 }}
        loading={loading}
        bordered
      />
    </Space>
  );
};

export default CommonTeacherPage;
