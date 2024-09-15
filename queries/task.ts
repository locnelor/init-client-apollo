import { gql } from "@apollo/client"
import { BaseEntity } from "./baseEntity"
import { ClassesEntity } from "./classes"
import { TeacherEntity } from "./teacher"
import { UserEntity } from "./UserEntity"
import {
    ClassesFields,
    ProfileFields,
    TaskFields,
    TaskItemFields,
    TaskOnClassesFields,
    TaskOnTeacherItemFields,
    TeacherFields,
    UserFields,
    UserOnTaskFields,
    UserTaskItemFields
} from "./fields"

export interface TaskItemEntity extends BaseEntity {
    task: TaskEntity

    taskId: number

    name: string

    comment: string

    UserTaskItem: UserTaskItemEntity[]
}
export interface TaskOnTeacherEntity {
    task: TaskEntity

    teacher: TeacherEntity

    taskId: number

    teacherId: number
}
export interface TaskOnClassesEntity {
    task: TaskEntity

    taskId: number

    classes: ClassesEntity

    classesId: number
}
export interface UserTaskItemEntity extends BaseEntity {
    UserOnTask: UserOnTaskEntity

    userOnTaskUserId: number;

    userOnTaskTaskId: number;

    score: number
}
export interface UserOnTaskEntity {
    user: UserEntity

    userId: number

    task: TaskEntity

    taskId: number;

    items: UserTaskItemEntity[]

    common: string
}
export interface TaskEntity extends BaseEntity {
    title: string;

    select: string;

    comment: string;

    startTime: Date;

    deadline: Date;

    TaskOnTeacher: TaskOnTeacherEntity[]

    TaskItem: TaskItemEntity[]

    UserOnTask: UserOnTaskEntity[]

    TaskOnClasses: TaskOnClassesEntity[]

    finishedCount?: number

    userCount?: number

    total?: number
    
    teacherCount?: number
}

export const GetAllTaskQuery = gql`
    query GetAllTask{
        getAllTask{
            TaskItem{
                ${TaskItemFields}
            }
            ${TaskFields}
        }
    }
`
export const getAllTaskAndFinishedQuery = gql`
    query GetAllTaskAndFinished{
        getAllTaskAndFinished{
            ${TaskFields}
            userCount
            finishedCount
            total
            teacherCount
        }
    }
`
export const DelTaskMutation = gql`
    mutation DelTask(
        $id:Int!
    ){
        delTask(id:$id){
            id
        }
    }
`
export const GetTaskByIdMutation = gql`
    mutation GetTaskById(
        $id:Int!
    ){
        getTaskById(
            id:$id
        ){
            ${TaskFields}
            TaskItem{
                ${TaskItemFields}
            }
        }
    }
`
export const AddTaskMutation = gql`
    mutation AddTask(
        $title:String!,
        $select:String!,
        $items:[AddTaskItemDto!]!,
        $startTime:String!,
        $deadline:String!,
        $comment:String,
        $status:Boolean!,
        $id:Int
    ){
        addTask(
            title:$title,
            status:$status,
            select:$select,
            id:$id,
            items:$items,
            startTime:$startTime,
            deadline:$deadline,
            comment:$comment
        ){
            id
        }
    }
`
export const GetTaskClassesFinishedQuery = gql`
    query GetTaskClassesFinished(
        $taskId:Int!,
        $classesId:Int!
    ){
        getTaskClassesFinished(
            taskId:$taskId,
            classesId:$classesId
        )
    }
`
export const GetTaskDetailQuery = gql`
    query GetTaskDetail(
        $id:Int!
    ){
        getTaskTeachersDetail(id:$id){
            teacher{
                ${TeacherFields}
            }
            total
            finished
        }
        getTaskClassesDetail(id:$id){
            ${TaskFields}
            TaskItem{
                ${TaskItemFields}
            }
            TaskOnClasses{
                ${TaskOnClassesFields}
                classes{
                    ${ClassesFields}
                    _count{
                        TeacherOnClasses
                        User
                    }
                }
            }
        }
    }
`
// export const GetTaskItembyTeacherIdQuery = gql`
//     query GetTaskItemByTeacherId(
//         $id:Int!,
//         $userOnTaskTeacherId:Int!
//     ){
//         getTaskItemByTeacherId(
//             id:$id,
//             userOnTaskTeacherId:$userOnTaskTeacherId
//         ){
//             ${TaskItemFields}
//             UserTaskItem{
//                 ${UserTaskItemFields}
//             }
//         }
//     }
// `
export const GetTaskItemDetailByTeacherMutatio = gql`
    mutation GetTaskItemDetailByTeacher(
        $id:Int!,
        $teacherId:Int!
    ){
        getTaskItemDetailByTeacher(
            id:$id,
            teacherId:$teacherId
        ){
            ${TaskFields}
            TaskItem{
                ${TaskItemFields}
                UserTaskItem{
                    ${UserTaskItemFields}
                }
            }
        }
    }
`
export const GetTaskCommentQuery = gql`
    query GetTaskComment(
        $id:Int!,
        $teacherId:Int,
        $classesId:Int,
        $skip:Int,
        $take:Int
    ){
        getTaskComment(
            id:$id,
            teacherId:$teacherId,
            classesId:$classesId,
            skip:$skip,
            take:$take
        ){
            skip
            take
            total
            count
            data{
                ${UserOnTaskFields}
            }
        }
    }
`
export const GetTaskItemDetailByClassesMutation = gql`
    mutation GetTaskItemDetailByClasses(
        $id:Int!,
        $classesId:Int!
    ){
        getTaskItemDetailByClasses(
            id:$id,
            classesId:$classesId
        ){
            ${ClassesFields}
            User{
                profile{
                    name
                }
                account
                UserOnTask{
                    ${UserOnTaskFields}
                }
            }
        }
    }
`
export const GetTeacherOnTaskItemsQuery = gql`
    query GetTeacherOnTaskItems(
        $taskId:Int!,
        $teacherId:Int!
    ){
        getTeacherOnTaskItems(
            taskId:$taskId,
            teacherId:$teacherId
        ){
            ${TaskOnTeacherItemFields}
            taskItem{
                name
            }
        }
    }
`
// export const getTeacherAnalysisQuery = gql`
//     query GetTeacherAnalysis{
//         getTeacherAnalysis{
            
//         }
//     }
// `