"use client"

import { ViewerQuery, ViewerQueryType } from "@/queries/user"
import { ApolloError, useQuery } from "@apollo/client"
import { useMemo } from "react"

const useViewer = (onError?: (error?: ApolloError) => any) => {
  const { data, loading, error } = useQuery<ViewerQueryType>(ViewerQuery, {
    onError
  })
  const user = useMemo(() => data?.viewer, [data]);
  return { user, error, loading }
}
export default useViewer