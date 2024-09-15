import { CollegeEntity, UpdCollegeMutation } from "@/queries/college";
import { useMutation } from "@apollo/client";
import { Form, Modal } from "antd";
import { useCallback, useState } from "react";
import { UpdDepartmentMutation } from "@/queries/department";
import { UpdScienceMutation } from "@/queries/science";
import { UpdClassesMutation } from "@/queries/classes";
import {
  getClassesForm,
  getCollegeForm,
  getDeptForm,
  getScienceForm,
} from "./form";
import { RenderFormItem } from "@/components/UiFormButton";
import { gqlError } from "@/libs/apollo-errors";
import useOpen from "@/hooks/useOpen";

const useUpdate = (colleges: CollegeEntity[], refetch: any) => {
  const [formData, setFormData] = useState<any[]>([]);
  const [open, onOpen, onCancel] = useOpen();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [id, setId] = useState<number>(0);
  const [updCollege] = useMutation(UpdCollegeMutation);
  const [updScience] = useMutation(UpdScienceMutation);
  const [updDept] = useMutation(UpdDepartmentMutation);
  const [updClasses] = useMutation(UpdClassesMutation);
  const [formRef] = Form.useForm();
  const onUpdate = useCallback(
    (type: string, data: any) => {
      switch (type) {
        case "college":
          setFormData(getCollegeForm(data));
          setTitle("修改院系");
          break;
        case "dept":
          setFormData(getDeptForm(colleges, data));
          setTitle("修改系");
          break;
        case "science":
          setTitle("修改专业");
          setFormData(getScienceForm(colleges, data));
          break;
        case "classes":
          setTitle("修改班级");
          setFormData(getClassesForm(colleges, data));
          break;
      }
      formRef.setFieldValue("name", data.name);
      setType(type);
      onOpen();
      setId(data.id);
    },
    [colleges]
  );

  const onOk = useCallback(() => {
    setLoading(loading);
    formRef.submit();
  }, []);
  const onSubmit = useCallback(
    (variables: any) => {
      let mutation;
      switch (type) {
        case "college":
          mutation = updCollege;
          break;
        case "dept":
          mutation = updDept;
          break;
        case "science":
          mutation = updScience;
          break;
        case "classes":
          mutation = updClasses;
          break;
      }
      if (!mutation) {
        setLoading(false);
        return;
      }
      mutation({
        variables: {
          id,
          ...variables,
        },
      })
        .then(({ errors }) => {
          if (!!errors) {
            gqlError(errors);
            return;
          }
          refetch();
          onCancel();
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [id, type]
  );

  return [
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      confirmLoading={loading}
    >
      {open && (
        <Form onFinish={onSubmit} form={formRef}>
          {formData.map(({ label, name, required, ...rest }, key) => (
            <Form.Item
              label={label}
              name={name}
              key={key}
              required={required}
              initialValue={rest.defaultValue}
            >
              <RenderFormItem {...rest} />
            </Form.Item>
          ))}
        </Form>
      )}
    </Modal>,
    onUpdate,
  ] as const;
};
export default useUpdate;
