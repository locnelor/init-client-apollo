import { GetTaskClassesFinishedQuery } from "@/queries/task";
import { useQuery } from "@apollo/client";
import { memo } from "react";

const TaskClassesFinished = memo(
  ({ taskId, classesId }: { taskId: number; classesId: number }) => {
    const { data } = useQuery(GetTaskClassesFinishedQuery, {
      variables: {
        taskId,
        classesId,
      },
    });
    return <div>{data?.getTaskClassesFinished || 0}</div>;
  }
);
export default TaskClassesFinished;
