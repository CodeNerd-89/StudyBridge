import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const formatTime = (totalSeconds) => {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const Timer = ({ initialSeconds = 90 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setSeconds((current) => current - 1), 1000);
    return () => window.clearTimeout(timeout);
  }, [seconds]);

  return (
    <Card className="flex items-center justify-between gap-4 p-5">
      <div>
        <Badge variant="brand">Live timer</Badge>
        <p className="mt-2 text-sm text-slate-500">Time left for the mock test</p>
      </div>
      <p className="text-3xl font-extrabold text-primary">{formatTime(seconds)}</p>
    </Card>
  );
};

export default Timer;