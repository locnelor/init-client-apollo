import { ClassesEntity } from "@/queries/classes";
import { BaseEntity } from "./baseEntity";
import { ProfileEntity } from "./profile";
import { UserOnTaskEntity } from "./task";
import { gql } from "@apollo/client";



export interface UserEntity extends BaseEntity {
    account: string;

    name: string;

    role: number;

    hash_key: string

    profile: ProfileEntity

    profileId: number;

    token?: string

    classes?: ClassesEntity

    UserOnTask?: UserOnTaskEntity[]
}

export const UserDeleteManyByIdsMutation = gql`
    mutation UserDeleteManyByids(
        $ids:[Int!]!
    ){
        userDeleteManyByids(ids:$ids){
            count
        }
    }
`
export const UserResetManyByIdsMutation = gql`
    mutation UserResetManyByids(
        $ids:[Int!]!
    ){
        userResetManyByids(ids:$ids){
            count
        }
    }
`