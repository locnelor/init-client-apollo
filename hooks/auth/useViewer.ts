"use client"
import { useQuery } from "@apollo/client"
import { ViewerQuery } from "./viewer"


const useViewer = () => {
  const { data } = useQuery(ViewerQuery, {
    onError(error) {
      console.log(error)
    },
  })
  return data?.viewer
}
export default useViewer