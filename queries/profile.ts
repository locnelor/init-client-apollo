import { BaseEntity } from "./baseEntity";


export interface ProfileEntity extends BaseEntity {
    weUnionid: string;
    name: string
    password: string;
}