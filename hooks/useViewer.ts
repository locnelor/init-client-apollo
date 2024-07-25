import { getQuery } from "@/lib/client"
import viewer from "@/queries/viewer.gql"
import { sys_user } from "@prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { useMemo } from "react";

export const getViewer = async () => {
    const { data, error } = await getQuery<{ viewer: sys_user }>(viewer);
    return { data, error }
}

export const useViewer = async () => {
    const { data, error } = await useMemo(() => getViewer(), [])
    const header = headers()
    if (!!error) console.log("useViewer error", error)
    if (!data) redirect(`/auth?back=${encodeURIComponent(header.get("x-pathname") || '/')}`)
    return data.viewer
}

export default useViewer