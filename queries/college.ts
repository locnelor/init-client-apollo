import { gql } from "@apollo/client";
import { DepartmentEntity } from "./department";
import { ClassesFields, CollegeFields, DepartmentFields, ScienceFields } from "./fields";
import { BaseEntity } from "./baseEntity";

export interface CollegeEntity extends BaseEntity {
    name: string
    Department: DepartmentEntity[]
}

export const GetAllCollegeQuery = gql`
    query GetAllCollege{
        getAllCollege{
            ${CollegeFields}
            Department{
                ${DepartmentFields}
                Science{
                    ${ScienceFields}
                    Classes{
                        ${ClassesFields}
                    }
                }
            }
        }
    }   
`
export const UpdCollegeMutation = gql`
    mutation UpdCollege(
        $name:String!,
        $id:Int!
    ){
        updCollege(
            name:$name,
            id:$id
        ){
            id
        }
    }
`
export const DelCollegeMutation = gql`
    mutation DelCollege(
        $id:Int!
    ){
        delCollege(
            id:$id
        ){
            id
        }
    }
`

export const AddCollegeMutation = gql`
    mutation AddCollege(
        $name:String!
    ){
        addCollege(
            name:$name
        ){
            id
        }
    }
`