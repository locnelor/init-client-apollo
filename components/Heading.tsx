import classNames from "classnames";
import React from "react";
import { PropsWithChildren } from "react";

const Heading = ({
  children,
  className = "",
  ...rest
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) => {
  return (
    <div
      className={classNames("text-2xl flex gap-2 items-center pt-4", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
export default Heading;
