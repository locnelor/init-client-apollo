"use client";
import { Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useCallback, useMemo } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = useMemo(() => {
    return [
      {
        label: "任务列表",
        href: "/",
      },
      {
        label: "班级管理",
        href: "/classes",
      },
      {
        label: "教师列表",
        href: "/teacher",
      },
      {
        label: "学生列表",
        href: "/student",
      },
    ].map((item) => ({ ...item, key: item.href }));
  }, []);
  const onClick = useCallback(({ key }: any) => {
    router.push(`/admin${key}`);
  }, []);
  const selectedKeys = useMemo(() => {
    const trimmedPath = pathname.replace(/^\/admin/, '') || '/';
    return [trimmedPath];
  }, [pathname])
  return (
    <Layout className="h-full">
      <Layout.Header>
        <div className="text-white">header</div>
      </Layout.Header>
      <Layout className="h-full">
        <Layout.Sider width={200} className="h-full">
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            items={menuItems}
            onClick={onClick}
            theme="dark"
          />
        </Layout.Sider>
        <Layout>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default ClientLayout;
