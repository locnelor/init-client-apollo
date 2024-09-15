import { gql } from "@apollo/client";
import { TeacherOnClassesEntity } from "./teacher";
import { ClassesFields, ProfileFields, TeacherFields, TeacherOnClassesFields, UserFields } from "./fields";
import { BaseEntity } from "./baseEntity";
import { UserEntity } from "./UserEntity";


export interface ClassesEntity extends BaseEntity {
    name: string
    User?: UserEntity[]
    TeacherOnClasses?: TeacherOnClassesEntity[]
    scienceId: number
    _count?: {
        User: number
        TeacherOnClasses: number
    }
    finished?: number
}
export const AddClassesMutation = gql`
    mutation AddClasses(
        $name:String!,
        $scienceId:Int!
    ){
        addClasses(
            name:$name,
            scienceId:$scienceId
        ){
            id
        }
    }
`
export const GetClassesByIdQuery = gql`
    query GetClassesById(
        $id:Int!
    ){
        getClassesById(
            id:$id
        ){
            ${ClassesFields}
            User{
                ${UserFields}
                profile{
                    ${ProfileFields}
                }
            }
            TeacherOnClasses{
                ${TeacherOnClassesFields}
                teacher{
                    ${TeacherFields}
                }
            }
        }
    }
`
export const DelClassesMutation = gql`
    mutation DelClasses(
        $id:Int!
    ){
        delClasses(id:$id){
            id
        }
    }
`
export const UpdClassesMutation = gql`
    mutation UpdClasses(
        $id:Int!,
        $name:String!,
        $scienceId:Int!
    ){
        updClasses(
            id:$id,
            name:$name,
            scienceId:$scienceId
        ){
            id
        }
    }
`
export const DelClassessTeacherMutation = gql`
    mutation DelClassesTeacher(
        $teacherId:Int!,
        $classesId:Int!
    ){
        delClassesTeacher(
            teacherId:$teacherId,
            classesId:$classesId,
        ){
            teacherId
        }
    }
`
export const GetClassesByTeacherMutation = gql`
    mutation GetClassesByTeacher(
        $id:Int!
    ){
        getClassesByTeacher(id:$id){
            ${ClassesFields}
        }
    }
`