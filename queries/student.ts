import { gql } from "@apollo/client"
import { ClassesFields, ProfileFields, UserFields } from "./fields"


export const UploadStudentsMutation = gql`
    mutation UploadStudents(
        $name:String!,
        $college:String!,
        $department:String!,
        $data:[[String!]!]!
    ){
        uploadStudents(
            name:$name,
            college:$college,
            department:$department,
            data:$data
        )
    }
`
export const SearchStudentQuery = gql`
    query SearchStudent(
        $skip:Int,
        $take:Int,
        $contains:String,
        $classesId:Int,
        $scienceId:Int,
        $departmentId:Int,
        $collegeId:Int
    ){
        searchStudent(
            skip:$skip,
            take:$take,
            contains:$contains,
            classesId:$classesId,
            scienceId:$scienceId,
            departmentId:$departmentId,
            collegeId:$collegeId
        ){
            skip
            take
            total
            count
            data{
                ${UserFields}
                profile{
                    ${ProfileFields}
                }
                classes{
                    ${ClassesFields}
                }
            }
        }
    }
`