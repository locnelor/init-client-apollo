import withPage from "@/hooks/withPage";
import { getQuery } from "@/lib/client";
import { gql } from "@apollo/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";


export default withPage(({ t, params: { locale } }) => {

    return (
        <div>
            {t("test")}
            <Button>
                button
            </Button>
            <div>a</div>
            <Link href="/zh">
                zh
            </Link>
            <div>a</div>
            <Link href="/en">
                en
            </Link>
            <div>a</div>
            <Link href={`/home`}>
                to home
            </Link>
        </div>
    )
}, "homePage")