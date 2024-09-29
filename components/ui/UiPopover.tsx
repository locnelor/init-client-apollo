import { forwardRef, PropsWithChildren, ReactNode, useMemo } from "react";
import {
  Popover,
  PopoverProps,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
} from "@radix-ui/react-popover";
import classNames from "classnames";

interface UiPopoverProps extends PopoverProps {
  title?: ReactNode;
}
const UiPopover = ({ children, title, ...rest }: UiPopoverProps) => {
  const titleRender = useMemo(
    () => title && <PopoverTrigger asChild>{title}</PopoverTrigger>,
    [title]
  );
  return (
    <Popover {...rest}>
      {titleRender}
      <PopoverPortal>
        <PopoverContent
          className={classNames(
            "rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          )}
          sideOffset={5}
        >
          {children}
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};
UiPopover.typename = "";
