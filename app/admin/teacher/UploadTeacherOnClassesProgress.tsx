import { gqlError } from "@/libs/apollo-errors";
import { sleep } from "@/libs/utils";
import { Modal, Progress } from "antd";
import { useEffect, useState } from "react";

const UploadTeacherOnClassesProgress = ({
  data,
  onFinish,
  onSubmit,
}: {
  data: string[];
  onFinish: (bool: boolean) => void;
  onSubmit: any;
}) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    (async () => {
      for (let i = 1; i < data.length; i++) {
        const [teacher, classes] = data[i] as any;
        const res = await onSubmit({
          variables: {
            teacher,
            classes,
          },
        });
        if (!!res.errors) {
          gqlError(res.errors);
          onFinish(false);
          break;
        }
        await sleep(50);
        setPercent(Number(((i / data.length) * 100).toFixed(2)));
      }
      setPercent(100);
      onFinish(true);
    })();
  }, []);
  return <Progress percent={percent} />;
};
export const openUploadTeacherOnClassesModal = (
  data: string[],
  onSubmit: any
) => {
  return new Promise<boolean>((resolve) => {
    Modal.info({
      content: (
        <UploadTeacherOnClassesProgress
          data={data}
          onSubmit={onSubmit}
          onFinish={(bool: boolean) => {
            resolve(bool);
          }}
        />
      ),
      title: "上传进度",
      okText: "确定",
    });
  });
};
export default UploadTeacherOnClassesProgress;
