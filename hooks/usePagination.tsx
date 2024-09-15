import { PaginationEntity } from "@/queries/pagination";
import { Pagination } from "antd";
import { useMemo } from "react";

const usePagination = (
  { skip = 0, take = 0, total = 0 }: PaginationEntity,
  onChange: (data: { skip: number; take: number }) => void
) => {
  const page = useMemo(() => (!!take ? skip / take : 0) + 1, [skip, total]);
  return (
    <Pagination
      current={page}
      total={total}
      pageSize={take}
      onChange={(page, pageSize) => {
        onChange({
          skip: (page - 1) * pageSize,
          take: pageSize,
        });
      }}
    />
  );
};
export default usePagination;
