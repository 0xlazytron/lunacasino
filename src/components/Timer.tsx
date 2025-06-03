import React, { useState, useEffect, useCallback } from 'react';
import { useTickSound } from '../hooks/useTickSound';

interface TimerProps {
  targetDate: string; // YYYY-MM-DDTHH:MM:SS format
}

const Timer: React.FC<TimerProps> = ({ targetDate }) => {
  const { playTick } = useTickSound();
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const savedEndTime = localStorage.getItem('countdownEndTime');
    const endTime = savedEndTime ? new Date(parseInt(savedEndTime, 10)) : new Date(targetDate);
    const difference = +endTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!localStorage.getItem('countdownEndTime')) {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      localStorage.setItem('countdownEndTime', thirtyDaysFromNow.getTime().toString());
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      if (isAudioEnabled) {
        playTick();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, playTick, isAudioEnabled]);

  useEffect(() => {
    const enableAudio = () => {
      setIsAudioEnabled(true);
      document.removeEventListener('click', enableAudio);
    };
    document.addEventListener('click', enableAudio);
    return () => document.removeEventListener('click', enableAudio);
  }, []);

  const intervals = ['days', 'hours', 'minutes', 'seconds'];
  const labels = { days: 'DAYS', hours: 'HOURS', minutes: 'MINUTES', seconds: 'SECONDS' };

  return (
    <div className="flex flex-col items-center">
      <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
        <div className="flex items-center gap-3">
          {intervals.map((interval) => (
            <div key={interval} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-r from-[#FFD36E] to-[#A58141] flex items-center justify-center shadow-lg relative overflow-hidden ring-1 ring-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent"></div>
                <div className="absolute -inset-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <span className="text-4xl font-bold text-white relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                  {String(timeLeft[interval as keyof typeof timeLeft] || 0).padStart(2, '0')}
                </span>
              </div>
              <span className="text-white text-xs mt-3 tracking-wider">{labels[interval as keyof typeof labels]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timer;