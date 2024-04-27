import { useQuery } from "@apollo/client";
import viewer from "@/queries/viewer.gql"
import { user } from "@prisma/client";

const useUser = () => {
    const res = useQuery<{ viewer: user }>(viewer);
    return res
}

export default useUser