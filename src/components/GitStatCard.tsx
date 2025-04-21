import { useEffect, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

export default function GitStatCard({
  img: Icon,
  label,
  value
}: {
  img?: React.ElementType;
  label: string;
  value: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * value);
      setDisplayValue(currentValue);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [value]);

  return (
    <article className="flex gap-2 hover:opacity-70 flex-row items-center rounded-xl">
      {Icon && (
        <figure className="text-black text-xl">
          <Icon />
        </figure>
      )}
      <div className="flex flex-row gap-1 items-center">
        <span className="text-lg font-bold text-gray-900">{displayValue}</span>
        <p className="text-sm text-slate-700 font-semibold">{label}</p>
      </div>
    </article>
  );
}
