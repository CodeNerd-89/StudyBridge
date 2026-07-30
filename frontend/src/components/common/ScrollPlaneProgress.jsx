import { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

const ScrollPlaneProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = documentHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100)) : 0;

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50">
      {/* Base bar line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-outline/50" />
      {/* Tail trail — fills from left edge up to plane position */}
      <div
        className="absolute bottom-0 h-px bg-accent/60 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute bottom-0 translate-y-1/2 transition-[left] duration-150 ease-out"
        style={{ left: `calc(12px + (${progress} * (100% - 24px) / 100))` }}
      >
        <Plane className="h-4 w-4 -translate-x-1/2 rotate-45 text-accent" />
      </div>
    </div>
  );
};

export default ScrollPlaneProgress;