import useOpen from "@/hooks/useOpen";
import {
  Button,
  ButtonProps,
  DatePicker,
  Form,
  Input,
  InputProps,
  InputRef,
  Modal,
  Switch,
} from "antd";
import {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import SelectClassesItem from "./SelectClassesItem";
import { useMutation } from "@apollo/client";
import { GetTaskByIdMutation, TaskItemEntity } from "@/queries/task";
import moment from "moment";
import HistoryButtonModal from "./HistoryButtonModal";

const TaskItemRender = forwardRef<
  InputRef,
  InputProps & {
    onDelete: () => void;
  }
>(({ onDelete, ...props }, ref) => {
  return (
    <div className="flex items-center gap-2">
      <Input
        {...props}
        ref={ref}
        placeholder="(可选)在这里输入更为细节的描述"
      />
      <Button onClick={onDelete}>删除</Button>
    </div>
  );
});
TaskItemRender.displayName = "TaskItemRender";
type TaskButtonProps = PropsWithChildren<{
  btnProps?: ButtonProps;
  onSubmit: (data: any) => boolean | Promise<boolean>;
  id?: number;
}>;
const TaskButton = ({
  btnProps = {},
  children,
  id,
  onSubmit,
}: TaskButtonProps) => {
  const [open, onOpen, onCancel] = useOpen();
  const [taskList, setTaskList] = useState<string[]>([]);
  const [status, setStatus] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [classes, setClasses] = useState("[]");
  const [get] = useMutation(GetTaskByIdMutation);
  const onClickBtn = useCallback(() => setStatus(true), []);
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    if (status && !!inputRef.current) {
      inputRef.current.focus();
    }
  }, [status]);
  const onBlur = useCallback(() => {
    if (!taskList.some((e) => e === value) && !!value) {
      setTaskList([...taskList, value]);
    }
    setStatus(false);
    setValue("");
  }, [value, taskList]);
  const onRemoveItem = useCallback(
    (name: string) => {
      setTaskList(taskList.filter((e) => e !== name));
    },
    [taskList]
  );
  const onFinish = useCallback(
    async (data: any) => {
      setLoading(true);
      const content = await onSubmit({ ...data, id, status: checked });
      if (!!content) {
        onCancel();
      }
      setLoading(false);
    },
    [id, checked]
  );
  const onOk = useCallback(() => {
    form.submit();
  }, []);
  useEffect(() => {
    if (!id) return;
    if (!open) return;
    get({ variables: { id } }).then(({ data: { getTaskById } }: any) => {
      const { select, TaskItem, title, startTime, deadline, status, comment } =
        getTaskById;
      setTaskList(
        TaskItem.map(({ name }: any) => {
          return name;
        })
      );
      setClasses(select);
      setChecked(status);
      form.setFieldsValue({
        ...TaskItem.reduce((acc: any, { name, comment }: any) => {
          acc[name] = comment;
          return acc;
        }, {} as any),
        title,
        classes: select,
        comment,
        range: [
          moment(startTime, "YYYY-MM-DD"),
          moment(deadline, "YYYY-MM-DD"),
        ],
      });
    });
  }, [id, open]);
  const onChangeItems = useCallback((items: TaskItemEntity[]) => {
    setTaskList(items.map((e) => e.name));
    for (const item of items) {
      form.setFieldValue(item.name, item.comment);
    }
  }, []);
  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        title="新建任务"
        onOk={onOk}
        confirmLoading={loading}
        width={900}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="标题" name="title">
            <Input />
          </Form.Item>
          <Form.Item name="classes">
            <SelectClassesItem value={classes} onChange={setClasses} />
          </Form.Item>
          <div className="mt-4 mb-4">
            <HistoryButtonModal onChange={onChangeItems} />
          </div>
          {taskList.map((label, key) => (
            <Form.Item label={label} name={label} key={key}>
              <TaskItemRender onDelete={onRemoveItem.bind(null, label)} />
            </Form.Item>
          ))}
          <div className="mt-4 mb-4">
            {status ? (
              <Input
                ref={inputRef}
                onBlur={onBlur}
                onKeyDown={({ key }) => key === "Enter" && onBlur()}
                value={value}
                onChange={({ target: { value } }) => setValue(value)}
                placeholder="添加评价项，回车确认"
              />
            ) : (
              <Button onClick={onClickBtn}>添加评价项</Button>
            )}
          </div>
          <Form.Item label="有效日期范围" name="range">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item label="是否可用">
            <Switch checked={checked} onChange={(e) => setChecked(e)} />
          </Form.Item>
          <Form.Item label="介绍" name="comment">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Button {...btnProps} onClick={onOpen}>
        {children}
      </Button>
    </>
  );
};
export default TaskButton;
