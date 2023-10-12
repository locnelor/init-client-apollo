import UserList from "@/components/UserList";
import { Button } from "@/components/ui/button";
import withPage from "@/hooks/withPage";
import { getQuery } from "@/lib/client";
import { HomePageQuery } from "@/queries/HomePageQuery";
import { gql } from "@apollo/client";



export default withPage(async ({ t }) => {
    const { data, error } = await getQuery(HomePageQuery);
    if (error) {
        console.log("query error")
    }
    console.log(data,"server query data")
    return (
        <div className="container">
            <div className="header">
                header
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <UserList/>
                </div>
                <div className="w-3/4">
                    content
                </div>
            </div>
        </div>
    )
}, "homePage")