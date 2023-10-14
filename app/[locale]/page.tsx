import withPage from "@/hooks/withPage";
import { getQuery } from "@/lib/client";
import { gql } from "@apollo/client";
import { Button } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import Link from "next/link";

const RootPage = () => {
    const t = useTranslations("homePage")
    return (
        <div>
            context
        </div>
    )
}
export default RootPage