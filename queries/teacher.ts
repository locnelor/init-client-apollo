import { gql } from "@apollo/client";
import { ClassesEntity } from "./classes";
import { TeacherFields, TeacherOnClassesFields, ClassesFields, TaskOnTeacherItemFields } from "./fields";
import { BaseEntity } from "./baseEntity";



export interface TeacherEntity extends BaseEntity {
    name: string
    TeacherOnClasses?: TeacherOnClassesEntity[]
    _count?: {
        TeacherOnClasses: number
    }
}
export interface TeacherOnClassesEntity {
    teacherId: number
    classesId: number
    teacher: TeacherEntity
    classes: ClassesEntity
}

export const SearchTeacherQuery = gql`
    query SearchTeacher(
        $name:String
    ){
        searchTeacher(
            name:$name
        ){
            ${TeacherFields}
            _count{
                TeacherOnClasses
            }
        }
    }
`
export const GetTeacherByClassesIdsMutation = gql`
    mutation GetTeacherByClassesIds(
        $ids:[Int!]!
    ){
        getTeacherByClassesIds(
            ids:$ids
        ){
            ${TeacherFields}
            TeacherOnClasses{
                ${TeacherOnClassesFields}
                classes{
                    ${ClassesFields}
                }
            }
        }
    }
`
export const GetAllTeacherMutation = gql`
    mutation GetAllTeacher{
        getAllTeacher{
            ${TeacherFields}
            TeacherOnClasses{
                ${TeacherOnClassesFields}
            }
        }
    }
`
export const SaveClassesTeacherMutation = gql`
    mutation SaveClassesTeacher(
        $ids:[Int!]!,
        $classesId:Int!
    ){
        saveClassesTeacher(
            ids:$ids,
            classesId:$classesId
        ){
            id
        }
    }
`
export const AddTeacherMutation = gql`
    mutation AddTeacher(
        $name:String!
    ){
        addTeacher(
            name:$name
        ){
            id
        }
    }
`
export const SaveClassesTeacherByNameMutation = gql`
    mutation SaveClassesTeacherByName(
        $teacher:String!,
        $classes:String!
    ){
        saveClassesTeacherByName(
            teacher:$teacher,
            classes:$classes
        ){
            teacherId
            classesId
        }
    }
`
export const DelTeacherMutation = gql`
    mutation DelTeacher(
        $id:Int!
    ){
        delTeacher(
            id:$id
        ){
            id
        }
    }
`
export const TeacherAnalysisQuery = gql`
    query TeacherAnalysis{
        teacherAnalysis{
            ${TeacherFields}
            TaskOnTeacherItem{
                ${TaskOnTeacherItemFields}
            }
        }
    }
`