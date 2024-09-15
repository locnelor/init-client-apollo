import { CollegeEntity } from "@/queries/college"
import { Select } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"


type StudentSelectFormProps = {
    colleges: CollegeEntity[],
    onChange: (form: any) => void
}
const StudentSelectForm = ({
    colleges,
    onChange
}: StudentSelectFormProps) => {
    const [form, setForm] = useState({
        contains: "",
        classesId: 0,
        scienceId: 0,
        departmentId: 0,
        collegeId: 0
    })
    const departments = useMemo(() => {
        if (!!form.collegeId) return colleges.find(e => e.id === form.collegeId)?.Department || [];
        return colleges.map(e => e.Department).flat();
    }, [form.collegeId, colleges])
    const sciences = useMemo(() => {
        if (!!form.departmentId) return departments.find(e => e.id === form.departmentId)?.Science || [];
        return departments.map(e => e.Science).flat()
    }, [departments, form.departmentId])
    const classes = useMemo(() => {
        if (!!form.scienceId) return sciences.find(e => e.id === form.scienceId)?.Classes || [];
        return sciences.map(e => e.Classes).flat();
    }, [sciences, form.scienceId]);
    useEffect(() => {
        onChange(form);
    }, [form])
    const onChangeCollege = useCallback((value: number) => {
        value = Number(value)
        setForm({
            ...form,
            collegeId: value,
            scienceId: 0,
            departmentId: 0,
            classesId: 0
        })
    }, [form])
    const onChangeDepartment = useCallback((value: number) => {
        value = Number(value)
        setForm({
            ...form,
            scienceId: 0,
            departmentId: value,
            classesId: 0
        })
    }, [form])

    const onChangeScience = useCallback((value: number) => {
        value = Number(value)
        setForm({
            ...form,
            scienceId: value,
            classesId: 0
        })
    }, [form])

    const onChangeClasses = useCallback((value: any) => {
        value = Number(value)
        setForm({
            ...form,
            classesId: value
        })
    }, [form])

    return (
        <div className="flex gap-2">
            <div className="flex items-center gap-2">
                <div className="w-16 text-right">
                    学院
                </div>
                <Select
                    onChange={onChangeCollege}
                    value={form.collegeId}
                    options={[{ value: 0, label: "无" }, ...colleges.map(({ id, name }) => ({ value: id, label: name }))]}
                    className="min-w-32"
                />
            </div>

            <div className="flex items-center gap-2">
                <div className="w-16 text-right">
                    系
                </div>
                <Select
                    onChange={onChangeDepartment}
                    value={form.departmentId}
                    options={[{ value: 0, label: "无" }, ...departments.map(({ id, name }) => ({ value: id, label: name }))]}
                    className="min-w-32"
                />
            </div>

            <div className="flex items-center gap-2">
                <div className="w-16 text-right">
                    专业
                </div>
                <Select
                    onChange={onChangeScience}
                    value={form.scienceId}
                    options={[{ value: 0, label: "无" }, ...sciences.map(({ id, name }) => ({ value: id, label: name }))]}
                    className="min-w-32"
                />
            </div>

            <div className="flex items-center gap-2">
                <div className="w-16 text-right">
                    班级
                </div>
                <Select
                    onChange={onChangeClasses}
                    value={form.classesId}
                    options={[{ value: 0, label: "无" }, ...classes.map(({ id, name }) => ({ value: id, label: name }))]}
                    className="min-w-32"
                />
            </div>
        </div>
    )
}
export default StudentSelectForm