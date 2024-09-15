"use client";
import { CollegeEntity, GetAllCollegeQuery } from "@/queries/college";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";
import { ImportUserForm } from "./userForm";
import { xlsx2data } from "@/libs/query";
import { SearchStudentQuery, UploadStudentsMutation } from "@/queries/student";
import StudentSelectForm from "./StudentSelectForm";
import { StudentPaginationEntity } from "@/queries/pagination";
import usePagination from "@/hooks/usePagination";
import { Divider, message } from "antd";
import StudentListRender from "@/components/StudentListRender";
import { openUploadStudentModal } from "./UploadStudentProgress";
import UiFormButton from "@/components/UiFormButton";

const CommonStudentsPage = () => {
  const { data, loading } = useQuery(GetAllCollegeQuery);
  const client = useApolloClient();
  const [upload] = useMutation(UploadStudentsMutation, {
    onCompleted() {
      client.resetStore();
    },
  });
  const colleges = useMemo(
    () => (data?.getAllCollege || []) as CollegeEntity[],
    [data]
  );
  const { data: SearchRes, refetch: research } = useQuery(SearchStudentQuery);

  const students = useMemo(
    () => (SearchRes?.searchStudent || {}) as StudentPaginationEntity,
    [SearchRes]
  );
  const [form, setForm] = useState({
    contains: "",
    classesId: 0,
    scienceId: 0,
    departmentId: 0,
    collegeId: 0,
  });
  const pagination = usePagination(students, ({ skip, take }) => {
    research({
      ...form,
      skip,
      take,
    });
  });
  const onImportData = useCallback(
    async ({ file: { file }, college }: any) => {
      const table = await xlsx2data(file)
        .then(({ data }) => {
          return data;
        })
        .catch((e) => {
          message.error(e.message);
          return false;
        });
      if (!table) {
        return false;
      }
      const fileName = file.name;
      const department = fileName.slice(0, fileName.lastIndexOf("."));
      const data = {
        table,
        department,
        college,
      };
      return await openUploadStudentModal(data, upload).finally(() => {
        research(form);
      });
    },
    [form]
  );

  const onChangeSearch = useCallback((form: any) => {
    research({
      ...form,
      skip: 0,
      take: 20,
    });
    setForm(form);
  }, []);

  return (
    <div>
      <div className="flex gap-2 items-center">
        <UiFormButton
          title="导入数据"
          form={ImportUserForm("/添加学生模板.xlsx")}
          onFinish={onImportData}
        >
          导入数据
        </UiFormButton>
        {/* <UiButton>
                    导出当前数据
                </UiButton> */}
        <StudentSelectForm colleges={colleges} onChange={onChangeSearch} />
      </div>
      <StudentListRender
        students={students.data}
        refetch={() => {
          research(form);
        }}
        loading={loading}
      />
      <Divider />
      {pagination}
    </div>
  );
};
export default CommonStudentsPage;
