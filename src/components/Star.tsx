import { useEffect, useRef, useState, type FC } from 'react';
import starImg from './../assets/starImg.png';

type Props = {
  colided: boolean;
};

export const Star: FC<Props> = ({ colided }) => {
  const x = Math.random() * (95 - 4) + 4;
  const y = Math.random() * (80 - 40) + 4;
  const [starPosition, setStarPosition] = useState({ x: x, y: y });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomPosition = () => {
    const x = Math.random() * (95 - 4) + 4;
    setStarPosition({ x, y: 20 });
  };

  const startMoving = () => {
    if (colided) stopMoving();
    if (starPosition.y === 80) reset();
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setStarPosition((prev) => {
          const step = 1;
          return { x: prev.x, y: Math.max(prev.y + step, 4) };
        });
      }, 30);
    }
  };

  const reset = () => {
    generateRandomPosition();
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const stopMoving = () => {
    if (intervalRef.current) {
      setStarPosition((prev) => {
        return { x: prev.x, y: prev.y };
      });
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (colided) {
      stopMoving();
    } else if (starPosition.y >= 80) {
      reset();
    } else {
      startMoving();
    }

    return () => stopMoving();
  }, [colided, starPosition.y]);

  return (
    <>
      <img
        src={starImg}
        alt="Bomb"
        style={{ left: `${starPosition.x}%`, top: `${starPosition.y}%` }}
        className="absolute transform -translate-x-1/2 w-16 h-16"
      />
    </>
  );
};
