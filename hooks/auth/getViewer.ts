import { getQuery } from "@/libs/apollo/ApolloClient"
import { redirect } from "next/navigation"
import { ViewerQuery } from "./viewer"

const getViewer = async () => {
  const [res, error] = await getQuery({
    query: ViewerQuery
  })
  if (!!error) {
    redirect("/auth")
  }
  return res?.data?.currentUser
}
export default getViewer