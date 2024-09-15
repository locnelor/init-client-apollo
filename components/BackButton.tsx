"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const BackButton = () => {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.back();
  }, []);
  return <Button onClick={onClick}>返回</Button>;
};
export default BackButton;
