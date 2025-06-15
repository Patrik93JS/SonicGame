import { useEffect, useRef, type FC, type SetStateAction } from 'react';
import ratImg from './../assets/ratImg.png';

type Props = {
  ratPosition: {
    x: number;
    y: number;
  };
  handleRatPosition: (
    value: SetStateAction<{
      x: number;
      y: number;
    }>
  ) => void;
};

export const Rat: FC<Props> = ({ ratPosition, handleRatPosition }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMoving = (direction: 'left' | 'right') => {
    stopMoving();
    intervalRef.current = setInterval(() => {
      handleRatPosition((prev) => {
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
      src={ratImg}
      alt="Rat"
      style={{ left: `${ratPosition.x}%`, top: `${ratPosition.y}%` }}
      className="absolute bottom-[10%] transform -translate-x-1/2 w-22 h-22"
    />
  );
};
