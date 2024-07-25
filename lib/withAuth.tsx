import useViewer from "@/hooks/useViewer"
import { sys_user } from "@prisma/client"
type PageProps = {
    params: { [key in string]: string },
    searchParams: { [key in string]: string }
}
type WithAuthComponent = (props: {
    viewer: sys_user
} & PageProps) => any
const withAuth = (Component: WithAuthComponent) => {
    const result = async (props: PageProps) => {
        const viewer = await useViewer()
        return <Component
            viewer={viewer}
            {...props}
        />
    }
    return result;
}
export default withAuth