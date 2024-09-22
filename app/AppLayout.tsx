"use client";
import Link from "next/link";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import HomeCard from "./HomeCard";

type HeaderMenuItem = {
  title: string;
  href: string;
};
const HeaderItem = ({ title, href }: HeaderMenuItem) => {
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
      <Link href={href}>
        <div className="text-current">{title}</div>
      </Link>
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
  const menus: HeaderMenuItem[] = useMemo(() => {
    return [
      {
        title: "BUG",
        href: "/bug", //这里是一堆bug
      },
      {
        title: "窝子", //
        href: "/sub",
      },
      {
        title: "归档",
        href: "/archive",
      },
      {
        title: "友链",
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
      className={`fixed top-0 left-0 w-full shadow-md z-20 transition-colors duration-300`}
      style={{
        background: isScrolled ? "#040d19" : "",
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <HeaderItem title="Bug窝子" href="/" />
          <ul className="flex space-x-6">
            {menus.map(({ title, href }) => (
              <li key={href}>
                <HeaderItem title={title} href={href} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

const AppFooter = () => {
  return <div className="relative z-10"></div>;
};
const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AppHeader />
      <HomeCard />
      <div className="container mx-auto z-10 relative">{children}</div>
      <AppFooter />
    </div>
  );
};
export default AppLayout;
