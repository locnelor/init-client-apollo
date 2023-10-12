import { UserEntity } from "@/types/entitys/user.entity";
import { gql } from "@apollo/client";

export const HomePageQuery = gql`
    query HomePageQuery{
        test{
            now
            msg
        }
        userList{
            id
            account
        }
    }
`
export type HomePageQueryType = {
    test:{
        now:number,
        msg:string
    }
    userList:UserEntity[]
}