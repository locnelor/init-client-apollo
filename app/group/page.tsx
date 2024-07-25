import Container from "@/components/Container"
import useViewer from "@/hooks/useViewer"
import GroupClientPage from "./ClientPage";


const GroupPage = async () => {
    const viewer = await useViewer()
    return (
        <Container>
            <GroupClientPage />
        </Container>
    )
}
export default GroupPage