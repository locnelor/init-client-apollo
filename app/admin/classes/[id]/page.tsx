"use client";
import BackHeading from "@/components/BackHeading";
import ClassesTeacherCartButton from "@/components/ClassesTeacherCartButton";
import StudentListRender from "@/components/StudentListRender";
import { gqlError } from "@/libs/apollo-errors";

import {
  ClassesEntity,
  DelClassessTeacherMutation,
  GetClassesByIdQuery,
} from "@/queries/classes";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Divider } from "antd";
import { useCallback, useMemo } from "react";

const CommonClassesIdPage = ({ params: { id } }: any) => {
  const { data, refetch, loading } = useQuery(GetClassesByIdQuery, {
    variables: {
      id: Number(id),
    },
  });

  const classes = useMemo(() => data?.getClassesById as ClassesEntity, [data]);
  const [delTeacher] = useMutation(DelClassessTeacherMutation, {
    onCompleted() {
      refetch({
        id: Number(id),
      });
    },
    onError(error) {
      gqlError(error);
    },
  });
  const users = useMemo(() => {
    const users = classes?.User || [];
    if (!classes) return users;
    return users.map((e) => {
      return {
        ...e,
        classes,
      };
    });
  }, [classes]);
  const onDelClassesOnTeacher = useCallback(
    (teacherId: number) => {
      delTeacher({
        variables: {
          teacherId,
          classesId: classes?.id,
        },
      });
    },
    [classes]
  );
  return (
    <div>
      <BackHeading title={classes?.name} />
      <div>
        <h1 className="text-xl">班级教师</h1>
        <table className="table max-w-96">
          <thead>
            <tr>
              <th>
                <ClassesTeacherCartButton
                  classesId={classes?.id}
                  onFinish={refetch}
                />
              </th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {classes?.TeacherOnClasses?.map(
              ({ teacherId, teacher: { name } }) => (
                <tr key={teacherId}>
                  <td>{name}</td>
                  <td>
                    <Button
                      danger
                      onClick={onDelClassesOnTeacher.bind(null, teacherId)}
                    >
                      删除
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <Divider />
        <h1 className="text-xl">学生列表-{users.length}人</h1>
        <StudentListRender
          students={users}
          refetch={() => {
            refetch({
              id: Number(id),
            });
          }}
          loading={loading}
        />
      </div>
    </div>
  );
};
export default CommonClassesIdPage;
