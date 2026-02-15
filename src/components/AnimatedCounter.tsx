import { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ end, label, suffix = "", duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-heading font-extrabold gradient-text">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
};

export default AnimatedCounter;
