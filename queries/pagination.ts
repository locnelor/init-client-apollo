import { UserEntity } from "./UserEntity"



export interface PaginationEntity {
    skip: number
    take: number
    total: number
    count: number
}

export interface StudentPaginationEntity extends PaginationEntity {
    data: UserEntity[]
}