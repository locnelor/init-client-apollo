"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

type DynamicCardsProps = {};
const DynamicCards = () => {
  const refs = useRef<HTMLDivElement[]>([]);
  const id = useId();
  const [queue, setQueue] = useState<HTMLDivElement[]>([]);
  const hash = useRef<{ [key in string]: boolean }>({});
  const arr = useMemo(() => {
    return new Array(100).fill(0).map((e) => e);
  }, []);
  const [delay, setDelay] = useState<NodeJS.Timeout>();
  useEffect(() => {
    return () => clearTimeout(delay);
  }, [delay]);
  useEffect(() => {
    if (!queue.length) return;
    const t = setTimeout(() => {
      const top = queue.shift();
      if (!!top) {
        top.style.opacity = "1";
      }
      setQueue([...queue]);
    }, 100);
    setDelay(t);
  }, [queue]);
  const [time, setTime] = useState<NodeJS.Timeout>();
  useEffect(() => {
    return () => clearTimeout(time);
  }, [time]);
  const handleScroll = useCallback(() => {
    const t = setTimeout(() => {
      const arr: string[] = [];
      for (const card of refs.current) {
        if (hash.current[card.id]) continue;
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          hash.current[card.id] = true;
          arr.push(card.id);
          setQueue((prev) => {
            return [...prev, card];
          });
        }
      }
    }, 300);
    setTime(t);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始检查可见卡片

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {arr.map((_, index) => {
        return (
          <div
            id={`${id}_${index}`}
            ref={(el) => {
              if (!refs.current) return;
              if (!el) return;
              refs.current[index] = el;
            }}
            key={index}
            className="opacity-0 duration-300 rounded-lg shadow-md p-6"
          >
            <h3 className="text-xl font-semibold mb-2 ">
              如何优雅地处理JavaScript中的异步操作
            </h3>
            <p className="mb-4">
              探讨Promise、async/await等现代异步编程技巧，让你的代码更加清晰易读。
            </p>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              阅读更多
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default DynamicCards;
