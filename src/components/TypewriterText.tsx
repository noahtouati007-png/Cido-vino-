import { useEffect, useState } from "react";

interface Props {
  text: string;
  speedMs?: number;
  className?: string;
}

export default function TypewriterText({ text, speedMs = 25, className = "" }: Props) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speedMs);
    return () => clearInterval(interval);
  }, [text, speedMs]);

  return <span className={className}>{shown}</span>;
}
