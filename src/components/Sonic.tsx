import { useEffect, useRef, type FC, type SetStateAction } from 'react';
import sonic from './../assets/sonic.png';

type Props = {
  sonicPosition: {
    x: number;
    y: number;
  };
  handleSonicPosition: (
    value: SetStateAction<{
      x: number;
      y: number;
    }>
  ) => void;
};

export const Sonic: FC<Props> = ({ sonicPosition, handleSonicPosition }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMoving = (direction: 'left' | 'right') => {
    stopMoving();
    intervalRef.current = setInterval(() => {
      handleSonicPosition((prev) => {
        const step = 1;
        if (direction === 'left')
          return { x: Math.max(prev.x - step, 4), y: prev.y };
        if (direction === 'right')
          return { x: Math.min(prev.x + step, 96), y: prev.y };
        return { x: prev.x, y: prev.y };
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
      src={sonic}
      alt="Sonic"
      style={{ left: `${sonicPosition.x}%`, top: `${sonicPosition.y}%` }}
      className="absolute bottom-[10%] transform -translate-x-1/2 w-22 h-22"
    />
  );
};
