import { ClassesEntity } from "@/queries/classes"
import { CollegeEntity } from "@/queries/college"
import { DepartmentEntity } from "@/queries/department"
import { ScienceEntity } from "@/queries/science"


export const getScienceForm = (colleges: CollegeEntity[], science?: ScienceEntity) => {
    const options = colleges.map(({ name, Department }) => {
        return {
            label: name,
            options: Department.map(({ name, id }) => {
                return {
                    label: name,
                    value: id
                }
            })
        }
    })
    return [{
        type: "input",
        name: "name",
        label: "名称",
        required: true,
        defaultValue: science?.name
    }, {
        type: "select",
        name: "departmentId",
        label: "系",
        options,
        defaultValue: science?.departmentId
    }]
}

export const getClassesForm = (colleges: CollegeEntity[], item?: ClassesEntity) => {
    const depts = colleges.map(({ name, Department }) => {
        return Department.map(e => ({ ...e, name: `${name}_${e.name}` }))
    }).flat();
    const options = depts.map(({ name, Science }) => {
        return {
            label: name,
            options: Science.map(({ name, id }) => {
                return {
                    label: name,
                    value: id
                }
            })
        }
    })
    return [{
        type: "input",
        name: "name",
        label: "名称",
        required: true,
        defaultValue: item?.name
    }, {
        type: "select",
        name: "scienceId",
        label: "专业",
        options,
        defaultValue: item?.scienceId
    }]
}
export const getDeptForm = (colleges: CollegeEntity[], dept?: DepartmentEntity) => {
    const options = colleges.map(({ id, name }) => ({ label: name, value: id }))
    return [{
        type: "input",
        name: "name",
        label: "名称",
        required: true,
        defaultValue: dept?.name
    }, {
        type: "select",
        name: "collegeId",
        label: "院系",
        options,
        defaultValue: dept?.collegeId
    }]
}
export const getCollegeForm = (college?: CollegeEntity) => {
    return [{
        type: "input",
        name: "name",
        label: "名称",
        required: true,
        defaultValue: college?.name
    }]
}