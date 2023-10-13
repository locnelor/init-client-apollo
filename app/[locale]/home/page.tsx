import withPage from "@/hooks/withPage";
import { Container } from "@radix-ui/themes";
import Link from "next/link";




export default withPage(({ t }) => {

    return (
        <Container>
            {t("test")}1
            <Link href="/">
                to index
            </Link>
        </Container>
    )
}, "home")