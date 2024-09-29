"use client";

import useViewer from "@/hooks/useViewer";
import { Avatar } from "@radix-ui/themes";
import Link from "next/link";

const UserButton = () => {
  const { user } = useViewer();
  return (
    <div>
      {user ? (
        <>
          <Avatar src="/path/to/avatar.png" fallback={"icon"} />
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
