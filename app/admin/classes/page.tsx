"use client";
import {
  AddCollegeMutation,
  CollegeEntity,
  DelCollegeMutation,
  GetAllCollegeQuery,
} from "@/queries/college";
import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { Button, Modal, Table, Typography, Space, Card } from "antd";
import useUpdate from "./useUpdate";
import {
  AddDepartmentMutation,
  DelDepartmentMutation,
} from "@/queries/department";
import { AddScienceMutation, DelScienceMutation } from "@/queries/science";
import { AddClassesMutation, DelClassesMutation } from "@/queries/classes";
import {
  getClassesForm,
  getCollegeForm,
  getDeptForm,
  getScienceForm,
} from "./form";
import { gqlError } from "@/libs/apollo-errors";
import { gqlMutationRes } from "@/libs/apollo/apollo-error";
import Link from "next/link";
import UiFormButton from "@/components/UiFormButton";
import LoadingPage from "@/components/LoadingPage";

const { Title } = Typography;

const CommonClassesPage = () => {
  const { data, refetch, loading } = useQuery(GetAllCollegeQuery);
  const colleges: CollegeEntity[] = useMemo(
    () => data?.getAllCollege || [],
    [data]
  );
  const [modal, onUpdate] = useUpdate(colleges, refetch);
  const [delCollege] = useMutation(DelCollegeMutation);
  const [delDept] = useMutation(DelDepartmentMutation);
  const [delScience] = useMutation(DelScienceMutation);
  const [delClasses] = useMutation(DelClassesMutation);
  const [addCollege] = useMutation(AddCollegeMutation, {
    onCompleted: () => {
      refetch();
    },
  });
  const [addScience] = useMutation(AddScienceMutation, {
    onCompleted: () => {
      refetch();
    },
  });
  const [addDept] = useMutation(AddDepartmentMutation, {
    onCompleted: () => {
      refetch();
    },
  });
  const [addClasses] = useMutation(AddClassesMutation, {
    onCompleted: () => {
      refetch();
    },
  });
  const onDelete = useCallback((type: string, id: number) => {
    Modal.confirm({
      title: "删除后无法恢复，确认要删除吗？",
      onOk() {
        let mutation;
        switch (type) {
          case "college":
            mutation = delCollege;
            break;
          case "dept":
            mutation = delDept;
            break;
          case "science":
            mutation = delScience;
            break;
          case "classes":
            mutation = delClasses;
            break;
          default:
            return;
        }
        mutation({
          variables: {
            id,
          },
        }).then(({ errors }) => {
          if (!!errors) {
            gqlError(errors);
            return;
          }
          refetch();
        });
      },
    });
  }, []);
  const columns = useMemo(() => {
    return [
      {
        key: "name",
        title: "名称",
        render: (line: any) => {
          if (!!line.children) {
            return <strong>{line.name}</strong>;
          }
          return <Link href={`/admin/classes/${line.id}`}>{line.name}</Link>;
        },
      },
      {
        key: "actions",
        title: "操作",
        render: (line: any) => {
          return (
            <Space>
              <Button
                type="link"
                onClick={onUpdate.bind(null, line.type, line)}
              >
                修改
              </Button>
              <Button
                type="link"
                danger
                onClick={onDelete.bind(null, line.type, line.id)}
              >
                删除
              </Button>
            </Space>
          );
        },
      },
    ];
  }, [onUpdate]);
  const dataSource = useMemo(() => {
    return colleges.map(({ Department, ...college }) => {
      return {
        ...college,
        key: college.id,
        type: "college",
        children: Department.map(({ Science, ...dept }) => {
          return {
            ...dept,
            type: "dept",
            key: `${college.id}_${dept.id}`,
            children: Science.map(({ Classes, ...science }) => {
              return {
                ...science,
                type: "science",
                key: `${college.id}_${dept.id}_${science.id}`,
                children: Classes.map((item) => {
                  return {
                    ...item,
                    type: "classes",
                    key: `${college.id}_${dept.id}_${science.id}_${item.id}`,
                  };
                }),
              };
            }),
          };
        }),
      };
    });
  }, [colleges]);
  if (loading) return <LoadingPage />;
  return (
    <Card>
      {modal}
      <Title level={2}>院系管理</Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space wrap>
          <UiFormButton
            onFinish={(variables) => {
              return gqlMutationRes(addCollege({ variables }));
            }}
            form={getCollegeForm()}
            title="新增院系"
          >
            新增院系
          </UiFormButton>
          <UiFormButton
            onFinish={(variables) => {
              return gqlMutationRes(addDept({ variables }));
            }}
            form={getDeptForm(colleges)}
            title="新增系"
          >
            新增系
          </UiFormButton>
          <UiFormButton
            onFinish={(variables) => {
              return gqlMutationRes(addScience({ variables }));
            }}
            form={getScienceForm(colleges)}
            title="新增专业"
          >
            新增专业
          </UiFormButton>
          <UiFormButton
            onFinish={(variables) => {
              return gqlMutationRes(addClasses({ variables }));
            }}
            form={getClassesForm(colleges)}
            title="新增班级"
          >
            新增班级
          </UiFormButton>
        </Space>
        <Table
          expandable={{
            defaultExpandAllRows: true,
          }}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={loading}
        />
      </Space>
    </Card>
  );
};
export default CommonClassesPage;
