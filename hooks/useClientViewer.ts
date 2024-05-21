"use client"

import { useQuery } from "@apollo/client";
import viewer from "@/queries/viewer.gql"
import { user } from "@prisma/client"
const useClientViewer = () => {
    const { data, loading, error } = useQuery<{ viewer: user }>(viewer)
    return { user: data?.viewer, loading, error }
}
export default useClientViewer