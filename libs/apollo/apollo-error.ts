import { message } from "antd";


export const gqlError = (error: any) => message.error(error.message)
export const gqlSuccess = (msg = "操作成功") => message.error(msg);

export const gqlMutationRes = (e: Promise<any>) => e.then(({ errors }) => {
    return !errors
}).catch(() => false)

