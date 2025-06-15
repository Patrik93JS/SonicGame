import { useState, useEffect, useRef, type FC } from 'react';
import ratImg from './../assets/ratImg.png';

export const Rat: FC = () => {
  const [ratPosition, setRatPosition] = useState(10);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMoving = (direction: 'left' | 'right') => {
    stopMoving();
    intervalRef.current = setInterval(() => {
      setRatPosition((prev) => {
        const step = 1;
        if (direction === 'left') return Math.max(prev - step, 4);
        if (direction === 'right') return Math.min(prev + step, 96);
        return prev;
      });
    }, 10);
  };

  const stopMoving = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === 'ArrowLeft') startMoving('left');
      if (e.key === 'ArrowRight') startMoving('right');
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        stopMoving();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      stopMoving();
    };
  }, []);

  return (
    <img
      src={ratImg}
      alt="Rat"
      style={{ left: `${ratPosition}%` }}
      className="absolute bottom-[10%] transform -translate-x-1/2 w-22 h-22"
    />
  );
};
