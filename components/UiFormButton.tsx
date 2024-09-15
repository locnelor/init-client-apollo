import React, {
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";
// import UiImage from "./UiImage"
import {
  Button,
  ButtonProps,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import useOpen from "@/hooks/useOpen";

export const RenderFormItem = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ type, ...rest }: any, ref) => {
  switch (type) {
    case "input":
      return <Input {...rest} ref={ref} />;
    case "number":
      return <InputNumber {...rest} type="number" ref={ref} />;
    case "select":
      return <Select {...rest} ref={ref} />;
    // case "avatar":
    //     return (
    //         <UiImage
    //             width={100}
    //             ref={ref as any}
    //             {...rest}
    //         />
    //     )
    case "file":
      return (
        <Upload
          {...rest}
          beforeUpload={() => {
            console.log("beforeUpload");
            return false;
          }}
        >
          <Button>点击上传文件</Button>
        </Upload>
      );
    case "download":
      return (
        <Button
          type="link"
          onClick={() => {
            window.open(rest.url);
          }}
        >
          下载模板
        </Button>
      );
    default:
      return <div>null</div>;
  }
});
RenderFormItem.displayName = "RenderFormItem";
export type UiFormButtonProps = React.PropsWithChildren<{
  form: any[];
  onFinish: (data: any) => string | Promise<boolean> | void;
  btnProps?: ButtonProps;
  title: React.ReactNode;
}>;
const UiFormButton = ({
  form,
  onFinish,
  btnProps = {},
  title,
  children,
}: UiFormButtonProps) => {
  const [open, onOpen, onCancel] = useOpen();
  const [formRef] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onOk = useCallback(() => {
    formRef.submit();
  }, []);
  const onSubmit = useCallback(
    async (data: any) => {
      setLoading(true);
      const content = await onFinish(data);
      if (typeof content === "string") {
        message.info({ content });
      } else if (!!content) onCancel();
      setLoading(false);
    },
    [onFinish]
  );
  return (
    <>
      <Modal
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        title={title}
        confirmLoading={loading}
      >
        <Form onFinish={onSubmit} form={formRef}>
          {form.map(({ label, name, required, ...rest }, key) => (
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
      </Modal>
      <Button {...btnProps} onClick={onOpen}>
        {children}
      </Button>
    </>
  );
};
export default UiFormButton;
