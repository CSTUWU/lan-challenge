'use client';

import { useState, useEffect } from 'react';

export function useCountdown(initialDays = 4, initialHours = 18) {
  const [targetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + initialDays);
    d.setHours(d.getHours() + initialHours);
    return d;
  });

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00',
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          mins: '00',
          secs: '00',
        });
        if (interval) clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(minutes).padStart(2, '0'),
        secs: String(seconds).padStart(2, '0'),
      });
    };

    updateTimer();
    interval = setInterval(updateTimer, 1000);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [targetDate]);

  return timeLeft;
}
