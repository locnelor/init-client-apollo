import { useMutation } from "@apollo/client";
import {
  GetAllTeacherMutation,
  SaveClassesTeacherMutation,
  TeacherEntity,
} from "@/queries/teacher";
import { useCallback, useState } from "react";
import { gqlError } from "@/libs/apollo-errors";
import { gqlMutationRes } from "@/libs/apollo/apollo-error";
import useOpen from "@/hooks/useOpen";
import { Button, Divider, Modal } from "antd";

type ClassesTeacherCartButtonProps = {
  classesId: number;
  onFinish?: () => void;
};
const ClassesTeacherCartButton = ({
  classesId,
  onFinish,
}: ClassesTeacherCartButtonProps) => {
  const [classesTeacher, setClassesTeachers] = useState<TeacherEntity[]>([]);
  const [otherTeacher, setOtherTeachers] = useState<TeacherEntity[]>([]);
  const [get] = useMutation(GetAllTeacherMutation, {
    onCompleted({ getAllTeacher }) {
      const teachers = getAllTeacher as TeacherEntity[];
      setClassesTeachers(
        teachers.filter((e) =>
          e.TeacherOnClasses?.some((e) => e.classesId === classesId)
        )
      );
      setOtherTeachers(
        teachers.filter(
          (e) => !e.TeacherOnClasses?.some((e) => e.classesId === classesId)
        )
      );
    },
    onError(error) {
      gqlError(error);
    },
  });
  const [save] = useMutation(SaveClassesTeacherMutation, {
    onError(error) {
      gqlError(error);
    },
    onCompleted: () => {
      if (!!onFinish) onFinish();
    },
  });
  const [open, onOpen, cancel] = useOpen();
  const onClick = useCallback(() => {
    get();
    onOpen();
  }, []);
  const move = useCallback(
    (id: number) => {
      const teacher = otherTeacher.find((e) => e.id === id);
      if (!teacher) return;
      setOtherTeachers(otherTeacher.filter((e) => e.id !== id));
      setClassesTeachers([teacher, ...classesTeacher]);
    },
    [otherTeacher, classesTeacher]
  );
  const out = useCallback(
    (id: number) => {
      const teacher = classesTeacher.find((e) => e.id === id);
      if (!teacher) return;
      setClassesTeachers(classesTeacher.filter((e) => e.id !== id));
      setOtherTeachers([teacher, ...otherTeacher]);
    },
    [otherTeacher, classesTeacher]
  );
  const onOk = useCallback(() => {
    return gqlMutationRes(
      save({
        variables: {
          ids: classesTeacher.map((e) => e.id),
          classesId,
        },
      })
    );
  }, [classesTeacher]);
  return (
    <div>
      <Button onClick={onClick}>管理</Button>
      <Modal
        open={open}
        title="管理班级教师列表"
        onCancel={cancel}
        okText="保存"
      >
        <h1 className="text-xl">班级教师</h1>
        <div className="flex flex-wrap gap-2 m-2">
          {classesTeacher.map(({ id, name }) => (
            <Button onClick={out.bind(null, id)} key={id}>
              {name}
            </Button>
          ))}
        </div>
        <Divider></Divider>
        <h1 className="text-xl">其他教师</h1>
        <div className="flex flex-wrap gap-2 m-2">
          {otherTeacher.map(({ id, name }) => (
            <Button onClick={move.bind(null, id)} key={id}>
              {name}
            </Button>
          ))}
        </div>
      </Modal>
    </div>
  );
};
export default ClassesTeacherCartButton;
