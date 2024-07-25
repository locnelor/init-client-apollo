
import withAuth from "@/lib/withAuth"
import GroupClientCreateClientPage from "./ClientPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "创建群组"
}
const GroupClientCreatePage = withAuth(({ viewer }) => {

    return (
        <div>
            <GroupClientCreateClientPage />
        </div>
    )
})
export default GroupClientCreatePage