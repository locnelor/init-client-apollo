import { getQuery } from "@/libs/apollo/ApolloClient"
import { ViewerQuery, ViewerQueryType } from "@/queries/user"


const getViewer = async () => {
  return await getQuery<ViewerQueryType>({ query: ViewerQuery })
}

export default getViewer