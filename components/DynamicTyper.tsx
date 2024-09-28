"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type TextItem = {
  author: string;
  text: string;
};
export const useTyper = (texts: string[]) => {
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState<NodeJS.Timeout>();
  const [typingText, setText] = useState("");
  const [status, setStatus] = useState("typing");

  useEffect(() => {
    return () => clearTimeout(time);
  }, [time]);
  useEffect(() => {
    if (status !== "typing") return;
    const target = texts[index];
    if (typingText.length === target.length) {
      setStatus("done");
      return;
    }
    setTime(
      setTimeout(() => {
        setText((prev) => prev + target[typingText.length]);
      }, 100)
    );
  }, [status, typingText, index, texts]);
  useEffect(() => {
    if (status !== "done") return;
    setTime(
      setTimeout(() => {
        setStatus("deleting");
      }, 2000)
    );
  }, [status]);
  useEffect(() => {
    if (status !== "deleting") return;
    setTime(
      setTimeout(() => {
        if (typingText.length === 0) {
          setIndex((prev) => (prev + 1) % texts.length);
          setText("");
          setStatus("typing");
          return;
        }
        setText((prev) => prev.slice(0, -1));
      }, 50)
    );
  }, [status, typingText, texts.length]);
  return [index, typingText] as const;
};
const DynamicTyper = () => {
  const items: TextItem[] = useMemo(() => {
    return new Array(10).fill(0).map(() => {
      return {
        author: "asd",
        text: new Array(Math.floor(Math.random() * 100) + 1)
          .fill("")
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(""),
      };
    });
  }, []);
  const texts = useMemo(
    () => items.map((e) => `来自:${e.author}\n${e.text}`),
    []
  );
  const [_, typingText] = useTyper(texts);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blinkCursor = () => {
      if (!cursorRef.current) return;
      cursorRef.current.style.opacity =
        cursorRef.current.style.opacity === "0" ? "1" : "0";
    };

    const intervalId = setInterval(blinkCursor, 500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center min-h-20">
      <div>
        <div className="flex gap-2">
          <span>
            {typingText.split("\n").map((text, index) => (
              <div key={index}>{text}</div>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};
export default DynamicTyper;
