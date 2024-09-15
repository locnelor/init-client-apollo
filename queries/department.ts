import { gql } from "@apollo/client";
import { ScienceEntity } from "./science";
import { BaseEntity } from "./baseEntity";


export interface DepartmentEntity extends BaseEntity {
    name: string
    Science: ScienceEntity[]
    collegeId: number
}
export const AddDepartmentMutation = gql`
    mutation AddDepartment(
        $collegeId:Int!,
        $name:String!
    ){
        addDepartment(
            collegeId:$collegeId,
            name:$name
        ){
            id
        }
    }
`
export const UpdDepartmentMutation = gql`
    mutation UpdDepartment(
        $collegeId:Int!,
        $id:Int!,
        $name:String!
    ){
        updDepartment(
            collegeId:$collegeId,
            id:$id,
            name:$name
        ){
            id
        }
    }
`
export const DelDepartmentMutation = gql`
    mutation DelDepartment(
        $id:Int!
    ){
        delDepartment(
            id:$id
        ){
            id
        }
    }
`