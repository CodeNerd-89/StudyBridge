import { useCallback, useEffect, useRef, useState } from 'react';

const normalizeSeconds = (value) => Math.max(0, Math.floor(Number(value) || 0));

export function formatDuration(totalSeconds = 0) {
  const safe = normalizeSeconds(totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useTimer(initialSeconds, { autoStart = false } = {}) {
  const initial = normalizeSeconds(initialSeconds);
  const durationRef = useRef(initial);
  const [remaining, setRemaining] = useState(initial);
  const [running, setRunning] = useState(Boolean(autoStart && initial > 0));

  useEffect(() => {
    const next = normalizeSeconds(initialSeconds);
    durationRef.current = next;
    setRemaining(next);
    setRunning(Boolean(autoStart && next > 0));
  }, [initialSeconds, autoStart]);

  useEffect(() => {
    if (!running) return undefined;

    const timerId = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timerId);
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [running]);

  const start = useCallback(() => {
    setRunning((current) => current || remaining > 0);
  }, [remaining]);

  const pause = useCallback(() => setRunning(false), []);

  const reset = useCallback((seconds = durationRef.current) => {
    const next = normalizeSeconds(seconds);
    durationRef.current = next;
    setRemaining(next);
    setRunning(false);
  }, []);

  return {
    remaining,
    elapsed: Math.max(0, durationRef.current - remaining),
    running,
    start,
    pause,
    reset,
  };
}
