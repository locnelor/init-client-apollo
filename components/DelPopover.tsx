import { Button, Popconfirm } from "antd";

const DelPopover = ({ onConfirm, onCancel }: any) => {
  return (
    <Popconfirm
      title="删除后不可恢复，确认要删除吗？"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  );
};
export default DelPopover;
