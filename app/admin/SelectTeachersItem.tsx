import { GetTeacherByClassesIdsMutation, TeacherEntity } from "@/queries/teacher"
import { useMutation } from "@apollo/client"
import { Tag } from "antd"
import classNames from "classnames"
import { memo, useCallback, useEffect, useMemo } from "react"


type SelectTeachersItem = {
    classes: string
    value?: number[],
    onChange?: (data: any) => void
}
const SelectTeachersItem = memo(({
    classes,
    onChange,
    value
}: SelectTeachersItem) => {
    const ids = useMemo(() => (JSON.parse(classes) as string[]).filter(e => {
        const s = e.split("_");
        if (s.length !== 4) return false;
        return true;
    }).map((e) => {
        const s = e.split("_");
        const classesId = parseInt(s.pop() as string)
        return classesId
    }), [classes])
    const [get, { data }] = useMutation(GetTeacherByClassesIdsMutation)
    useMemo(() => get({ variables: { ids } }), [ids]);
    const teachers = useMemo(() => {
        return (data?.getTeacherByClassesIds || []) as TeacherEntity[]
    }, [data]);
    useEffect(() => {
        if (!!onChange) onChange(teachers.map(e => e.id))
    }, [teachers])
    const set = useMemo(() => {
        if (!value) return new Set;
        return new Set(value);
    }, [value])
    const onClick = useCallback((id: number) => {
        if (set.has(id)) set.delete(id);
        else set.add(id);
        if (!!onChange) onChange([...set]);
    }, [set])
    return (
        <div>
            <div className="leading-6 m-2">相关教师:</div>
            <div className="flex flex-wrap gap-2">
                {teachers.length === 0 && (
                    <div>
                        暂无教师
                    </div>
                )}
                {teachers.map(({ id, name }) => {
                    return (
                        <Tag
                            key={id}
                            className={classNames(
                                "cursor-pointer select-none",
                                set.has(id) ? "bg-blue-400 text-white" : ""
                            )}
                            onClick={onClick.bind(null, id)}
                        >
                            {name}
                        </Tag>
                    )
                })}
            </div>
        </div>
    )
})
SelectTeachersItem.displayName = "SelectTeachersItem"

export default SelectTeachersItem