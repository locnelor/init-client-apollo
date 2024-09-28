

import { gql } from "@apollo/client";


export interface ViewerQueryType {
  viewer: {
    id: number
    name: string
  }
}
export const ViewerQuery = gql`
  query Viewer{
    viewer{
      id
      name
    }
  }
`