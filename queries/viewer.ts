import { gql } from "@apollo/client";


export const viewer = gql`
    query Viewer{
        viewer{
            id
        }
    }
`