import withPage from "@/hooks/withPage";
import { getQuery } from "@/lib/client";
import { gql } from "@apollo/client";
import { Button } from "@radix-ui/themes";


export default withPage(({ t }) => {
    
    return (
        <div>
            {t("test")}
            <Button>
                button
            </Button>
        </div>
    )
}, "homePage")