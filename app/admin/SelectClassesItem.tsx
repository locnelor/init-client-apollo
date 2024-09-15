
import { GetAllCollegeQuery, CollegeEntity } from "@/queries/college";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Tree } from "antd"
import type { TreeProps } from 'antd/es/tree';

type SelectClassesItemProps = {
    onChange?: (value: string) => void,
    value?: string
}
const SelectClassesItem = ({
    onChange,
    value
}: SelectClassesItemProps) => {
    const { data, refetch } = useQuery(GetAllCollegeQuery);
    useEffect(() => {
        if (!!data) refetch()
    }, [])
    const colleges: CollegeEntity[] = useMemo(() => data?.getAllCollege || [], [data]);
    const treeData = useMemo(() =>
        colleges.map((college) => {
            return {
                key: `${college.id}`,
                title: college.name,
                children: college.Department.map((dept) => ({
                    key: `${college.id}_${dept.id}`,
                    title: dept.name,
                    children: dept.Science.map((science) => ({
                        key: `${college.id}_${dept.id}_${science.id}`,
                        title: science.name,
                        children: science.Classes.map((classes) => ({
                            key: `${college.id}_${dept.id}_${science.id}_${classes.id}`,
                            title: classes.name,
                        }))
                    }))
                }))
            }
        }), [colleges])
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    useEffect(() => {
        if (!value) return;
        setSelectedKeys(JSON.parse(value));
    }, [value])
    const onSelectionChange: TreeProps['onCheck'] = useCallback((value: any, info: any) => {
        setSelectedKeys(value)
        if (!!onChange) {
            if (!!value) {
                onChange(JSON.stringify(value))
            } else {
                onChange("[]")
            }
        }
    }, [])
    return (
        <div>
            <Tree
                treeData={treeData}
                checkable
                checkedKeys={selectedKeys}
                onCheck={onSelectionChange}
                className="w-full m-0 p-0"
            />
        </div>
    )
}
export default SelectClassesItem


// import { GetAllCollegeQuery, CollegeEntity } from "@/queries/college";
// import { useQuery } from "@apollo/client";
// import { forwardRef, InputHTMLAttributes, useCallback, useEffect, useMemo, useState } from "react";


// type NodeData = {
//     name: string
//     id: any
//     children?: NodeData[]
//     key: string
//     inputName?: string
//     onChange?: (selectedKeys: string[]) => void
//     value?: string[]
// }
// type TreeData = NodeData[]
// type TreeProps = {
//     treeData: TreeData
//     name: string
//     value?: string[]
//     onChange?: (selectedKeys: string[]) => void
// }
// const Node = ({
//     name,
//     children,
//     inputName,
//     id,
//     onChange,
//     value = []
// }: NodeData) => {
//     const getChildKeys = useCallback((children?: NodeData[]) => {
//         if (!children) return [];
//         const res: string[] = [];
//         for (const child of children) {
//             res.push(child.key);
//             if (child.children) {
//                 res.push(...getChildKeys(child.children));
//             }
//         }
//         return res;
//     }, [])
//     const childKeys = useMemo(() => getChildKeys(children), [value, children]);
//     const isAllCheck = useMemo(() => {
//         if (!children || !children.length) return false;
//         const set = new Set(value);
//         return childKeys.every(e => set.has(e));
//     }, [childKeys, value]);
//     useEffect(() => {
//         if (!onChange) return;
//         if (!children || !children.length) return;
//         if (isAllCheck) {
//             if (!value.some(e => e === id)) {
//                 onChange([...value, id]);
//             }
//         } else {
//             onChange(value.filter(e => e !== id))
//         }
//     }, [isAllCheck]);
//     const onInputChange = useCallback(({ target: { checked } }: any) => {
//         if (!!onChange) {
//             if (checked) {
//                 onChange([...value, id])
//             } else {
//                 onChange(value.filter(e => e !== id))
//             }
//         }
//     }, [value, id])
//     const checked = useMemo(() => value.some(e => e === id), [value, id]);
//     const onAllChange = useCallback(({ target: { checked } }: any) => {
//         if (!onChange) return;
//         if (checked) {
//             onChange([...new Set([...value, ...childKeys, id])])
//         } else {
//             const set = new Set(value);
//             set.delete(id);
//             for (const key of childKeys) {
//                 set.delete(key)
//             }
//             onChange([...set])
//         }
//     }, [value])
//     if (!children || !children.length) return (
//         <div className="relative">
//             <div
//                 className="h-full bg-base-100 absolute"
//                 style={{
//                     top: 5,
//                     left: -25,
//                 }}
//             >
//                 <input
//                     type="checkbox"
//                     className="checkbox"
//                     name={inputName}
//                     checked={checked}
//                     onChange={onInputChange}
//                 />
//             </div>
//             <li>
//                 <div>
//                     {name}
//                 </div>
//             </li>
//         </div>
//     )
//     return (
//         <div className="relative">
//             <div
//                 className="h-full bg-base-100 absolute"
//                 style={{
//                     top: 5,
//                     left: -25,
//                 }}
//             >
//                 <input
//                     type="checkbox"
//                     className="checkbox"
//                     name={inputName}
//                     checked={checked}
//                     onChange={onAllChange}
//                 />
//             </div>
//             <li className="flex">
//                 <details open>
//                     <summary>
//                         {name}
//                     </summary>
//                     {!!children && (
//                         <Tree
//                             name={inputName || ""}
//                             treeData={children}
//                             onChange={onChange}
//                             value={value}
//                         />
//                     )}
//                 </details>
//             </li >
//         </div>
//     )
// }
// const Tree = ({
//     treeData,
//     name,
//     value = [],
//     onChange
// }: TreeProps) => {
//     return (
//         <ul className="menu">
//             {treeData.map((props) => (
//                 <Node
//                     {...props}
//                     key={props.key}
//                     id={props.key}
//                     inputName={name}
//                     onChange={onChange}
//                     value={value}
//                 />
//             ))}
//         </ul>
//     )
// }
// const SelectClassesItem = forwardRef<
//     HTMLInputElement,
//     InputHTMLAttributes<HTMLInputElement>
// >((props, ref) => {
//     const { data, refetch } = useQuery(GetAllCollegeQuery);
//     const colleges: CollegeEntity[] = useMemo(() => data?.getAllCollege || [], [data]);
//     const treeData = useMemo(() =>
//         colleges.map((college) => {
//             return {
//                 ...college,
//                 key: college.id + "",
//                 children: college.Department.map((dept) => {
//                     return {
//                         ...dept,
//                         key: `${college.id}_${dept.id}`,
//                         children: dept.Science.map((science) => {
//                             return {
//                                 ...science,
//                                 key: `${college.id}_${dept.id}_${science.id}`,
//                                 children: science.Classes.map((classes) => ({
//                                     ...classes,
//                                     key: `${college.id}_${dept.id}_${science.id}_${classes.id}`
//                                 }))
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//         , [colleges])
//     const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
//     console.log(selectedKeys)
//     return (
//         <div>
//             <Tree
//                 treeData={treeData}
//                 name="TREEROOT"
//                 onChange={setSelectedKeys}
//                 value={selectedKeys}
//             />
//         </div>
//     )
// })
// SelectClassesItem.displayName = "SelectClassesItem"
// export default SelectClassesItem

