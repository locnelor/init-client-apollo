import { gql } from "@apollo/client";
import { ClassesEntity } from "./classes";
import { BaseEntity } from "./baseEntity";



export interface ScienceEntity extends BaseEntity {
    name: string
    departmentId: number
    Classes: ClassesEntity[]
}
export const AddScienceMutation = gql`
    mutation AddScience(
        $departmentId:Int!,
        $name:String!
    ){
        addScience(
            departmentId:$departmentId,
            name:$name
        ){
            id
        }
    }
`
export const UpdScienceMutation = gql`
    mutation UpdScience(
        $id:Int!,
        $departmentId:Int!,
        $name:String!
    ){
        updScience(
            id:$id,
            departmentId:$departmentId,
            name:$name
        ){
            id
        }
    }
`
export const DelScienceMutation = gql`
    mutation DelScience(
        $id:Int!
    ){
        delScience(
            id:$id
        ){
            id
        }
    }
`