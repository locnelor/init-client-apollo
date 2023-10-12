import { ProfileEntity } from "./profile.entity"

export type UserEntity = {
    id: number
    createAt: Date
    updateAt: Date
    account: string
    password: string
    token?: string
    profile: ProfileEntity
}