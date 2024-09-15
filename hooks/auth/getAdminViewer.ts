import { redirect } from "next/navigation"
import getViewer from "./getViewer"


const getAdminViewer = async () => {
  const viewer = await getViewer()
  if (!viewer || viewer.role < 100) {
    console.log(viewer, "getAdminViewer")
    redirect("/auth")
  }
  return viewer
}
export default getAdminViewer