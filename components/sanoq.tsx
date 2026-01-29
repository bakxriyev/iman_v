import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  size?: 'small' | 'medium' | 'large';
  fixed?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialHours = 24,
  initialMinutes = 0,
  initialSeconds = 0,
  size = 'medium',
  fixed = false
}) => {
  const [countdown, setCountdown] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStyles = {
    small: 'text-lg',
    medium: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl'
  };

  const containerStyles = fixed
    ? 'fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#0a0a1f] via-[#14142e] to-[#0a0a1f] border-t-2 border-purple-500/30 py-3 px-4 z-50 shadow-[0_-5px_20px_rgba(139,92,246,0.3)]'
    : '';

  return (
    <div className={containerStyles}>
      <div className="max-w-4xl mx-auto text-center">
        <p className={`${size === 'small' ? 'text-xs' : 'text-sm md:text-base'} mb-1`}>
          24 soatdan so'ng qabul yopiladi:
        </p>
        <div className={`${timeStyles[size]} font-bold text-white`}>
          {String(countdown.hours).padStart(2, '0')}:
          {String(countdown.minutes).padStart(2, '0')}:
          {String(countdown.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;