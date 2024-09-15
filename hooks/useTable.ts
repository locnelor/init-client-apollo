import { useMemo } from "react"

export const useColumns = (columns: any[]) => {
  const res = useMemo(() => columns.map((e, key) => ({ ...e, key })), [columns])
  return res
}

export const useDataSource = (dataSource: any[]) => {
  return useMemo(() => dataSource?.map((e, key) => ({ ...e, key })) || [], [dataSource])
}