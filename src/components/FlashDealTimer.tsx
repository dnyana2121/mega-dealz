import React, { useState, useEffect } from 'react';
import { Timer, Zap } from 'lucide-react';

interface FlashDealTimerProps {
  label?: string;
  variant?: 'compact' | 'badge' | 'bar';
}

export const FlashDealTimer: React.FC<FlashDealTimerProps> = ({
  label = 'Mega Deal Ends In',
  variant = 'compact'
}) => {
  // Deal timer expiring today at midnight or in a few hours
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 11, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  if (variant === 'bar') {
    return (
      <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg border border-rose-200/80 text-xs font-semibold">
        <Zap className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
        <span>{label}:</span>
        <div className="flex items-center gap-1 font-mono text-sm font-bold tracking-wider">
          <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded">{formatNum(timeLeft.hours)}h</span>
          <span>:</span>
          <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded">{formatNum(timeLeft.minutes)}m</span>
          <span>:</span>
          <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded">{formatNum(timeLeft.seconds)}s</span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-rose-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xs">
      <Timer className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
      <span>{label}</span>
      <span className="font-mono bg-black/30 px-2 py-0.5 rounded-full text-amber-200">
        {formatNum(timeLeft.hours)}:{formatNum(timeLeft.minutes)}:{formatNum(timeLeft.seconds)}
      </span>
    </div>
  );
};
