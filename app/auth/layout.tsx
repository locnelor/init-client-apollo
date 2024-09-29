import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "登录Bug窝子",
};

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="mb-32 pl-5 pr-5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
    </div>
  );
};
export default AuthLayout;
