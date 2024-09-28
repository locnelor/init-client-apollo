"use client";
import { Theme } from "@radix-ui/themes";
import Link from "next/link";
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const HeaderItem = ({ children }: PropsWithChildren) => {
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(50);

  const handleMouseEnter = useCallback(() => {
    setWidth(100);
    setLeft(0);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setWidth(0);
    setLeft(50);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-current">{children}</div>
      <div
        className="bg-current duration-300 absolute top-full"
        style={{
          width: `${width}%`,
          left: `${left}%`,
          height: 1,
        }}
      ></div>
    </div>
  );
};
const AppHeader = () => {
  const menus = useMemo(() => {
    return [
      {
        title: "Logo",
        href: "/",
      },
      {
        title: "BUG",
        href: "/bug", //这里是一堆bug
      },
      {
        title: "窝子", //这里是窝子们
        href: "/den",
      },
      {
        title: "友链", //阔哥牛逼友情链接
        href: "/link",
      },
    ];
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 bg-base left-0 w-full z-20 transition-colors duration-300 ${
        isScrolled ? "shadow" : "shadow-none"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <ul className="flex space-x-6">
            {menus.map(({ title, href }) => (
              <li key={href}>
                <Link href={href}>
                  <HeaderItem>{title}</HeaderItem>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

const AppFooter = () => {
  return <div className="mt-10 container mx-auto">footer</div>;
};
const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Theme appearance="inherit">
      <div>
        <AppHeader />
        <div className="container mx-auto">{children}</div>
        <AppFooter />
      </div>
    </Theme>
  );
};
export default AppLayout;
