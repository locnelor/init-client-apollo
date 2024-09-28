"use client";

import useViewer from "@/hooks/useViewer";
import { Avatar } from "antd";
import Link from "next/link";

const UserButton = () => {
  const { user } = useViewer();
  console.log(user)
  return (
    <div>
      {user ? (
        <>
          <Avatar src="/path/to/avatar.png" alt="avatar" />
          <span>{user.name}</span>
        </>
      ) : (
        <Link href="/auth">
          <button>登录</button>
        </Link>
      )}
    </div>
  );
};
export default UserButton;
