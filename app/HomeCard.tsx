"use client";

import useHomeCanvas from "@/hooks/useHomeCanvas";
import { useEffect, useRef } from "react";

const HomeCard = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const start = useHomeCanvas();
  useEffect(() => {
    if (!ref.current) return;
    start(ref.current);
  }, []);
  return <canvas className="fixed z-0 top-0 left-0" ref={ref} />;
};
export default HomeCard;
