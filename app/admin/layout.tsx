import { PropsWithChildren } from "react";
import getAdminViewer from "@/hooks/auth/getAdminViewer";
import ClientLayout from "./ClientLayout";

const AdminLayout = async ({ children }: PropsWithChildren) => {
  await getAdminViewer();
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
};
export default AdminLayout;
