export const TeacherFields = `
id
name

`
export const TeacherOnClassesFields = `
classesId
teacherId
`
export const CollegeFields = `
id
updateAt
createAt
name
`
export const DepartmentFields = `
id
createAt
updateAt
name
collegeId
`
export const ClassesFields = `
id
updateAt
createAt
name
scienceId
`
export const ProfileFields = `
name
`
export const ScienceFields = `
id
createAt
updateAt
name
departmentId
`
export const PaginationFields = `
skip
take
total
count
`
export const UserFields = `
id
updateAt
createAt
account
role
profileId
token
hash_key
`
export const TaskFields = `
id
createAt
updateAt
title
comment
startTime
deadline
status
select
`
export const TaskOnClassesFields = `
taskId
classesId
`
export const TaskItemFields = `
id
createAt
updateAt
taskId
name
comment
`
export const UserOnTaskFields = `
userId
taskId
common
`
export const UserTaskItemFields = `
id
updateAt
createAt
userOnTaskUserId
userOnTaskTaskId
score
`
export const TaskOnTeacherItemFields = `
taskItemId
teacherId
count
score
`