"use client";

import { PreloadQuery } from "@/libs/apollo/ApolloClient";
import { gql, useQuery } from "@apollo/client";
import { Tag } from "antd";
import moment from "moment";
import { Suspense, useCallback } from "react";

const QUERY = gql`
  query Tasks {
    getSelfTeacherCount
    getSelfTask {
      id
      title
      status
      comment
      startTime
      deadline
      _count {
        UserOnTask
      }
    }
  }
`;
const PageRender = ({ user }: any) => {
  const { data, loading } = useQuery(QUERY);

  const onClick = useCallback((id: number) => {}, []);
  return (
    <div>
      {data?.getSelfTask?.map(
        ({ id, title, _count: { UserOnTask }, startTime, deadline }: any) => {
          const currentDate = moment();
          const start = moment(startTime);
          const end = moment(deadline);
          const isBefore = currentDate.isBefore(start);
          const isAfter = currentDate.isAfter(end);
          const status =
            data.teacherCount === UserOnTask
              ? "已完成"
              : isBefore
              ? "未开始"
              : isAfter
              ? "已结束"
              : "进行中";
          return (
            <div
              key={id}
              className="mt-2 mb-1 border-b-8 border-gray-200 p-2"
              onClick={() =>
                status === "进行中" ? onClick.bind(null, id) : null
              }
            >
              <div className="flex gap-2">
                <Tag>{status}</Tag>
                <div>{title}</div>
              </div>
              <div className="mt-2">
                {moment(startTime).format("YYYY-MM-DD")} -{" "}
                {moment(deadline).format("YYYY-MM-DD")}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default PageRender;
