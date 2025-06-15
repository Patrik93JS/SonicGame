import { useRef, useState, type FC } from 'react';
import bombImg from './../assets/bombImg.png';

type Props = {};

export const Bomb: FC<Props> = () => {
  const [bombPosition, setBombPosition] = useState({ x: 50, y: 20 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  console.log(bombPosition);

  const startMoving = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setBombPosition((prev) => {
          const step = 1;
          return { x: prev.x, y: Math.max(prev.y + step, 4) };
        });
      }, 100);
    }
    if (bombPosition.y === 80) reset();
  };

  const reset = () => {
    setBombPosition({ x: 50, y: 20 });
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  startMoving();

  return (
    <img
      src={bombImg}
      alt="Bomb"
      style={{ left: `${bombPosition.x}%`, top: `${bombPosition.y}%` }}
      className="absolute bottom-[10%] transform -translate-x-1/2 w-16 h-16"
    />
  );
};
