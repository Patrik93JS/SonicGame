import {
  useEffect,
  useRef,
  type Dispatch,
  type FC,
  type SetStateAction,
} from 'react';
import bombImg from './../assets/bombImg.png';

type Props = {
  colided: boolean;
  bombPosition: { x: number; y: number };
  handleBombPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
};

export const Bomb: FC<Props> = ({
  colided,
  bombPosition,
  handleBombPosition,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomPosition = () => {
    const x = Math.random() * (95 - 4) + 4;
    handleBombPosition({ x, y: 20 });
  };

  const startMoving = () => {
    if (colided) stopMoving();
    if (bombPosition.y === 80) reset();

    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        handleBombPosition((prev) => {
          const step = 1;
          return { x: prev.x, y: Math.max(prev.y + step, 4) };
        });
      }, 30);
    }
  };

  const stopMoving = () => {
    if (intervalRef.current) {
      handleBombPosition((prev) => {
        return { x: prev.x, y: prev.y };
      });
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stopMoving();
    generateRandomPosition();
  };

  useEffect(() => {
    if (colided) {
      stopMoving();
    } else if (bombPosition.y >= 80) {
      reset();
    } else {
      startMoving();
    }

    return () => stopMoving();
  }, [colided, bombPosition.y]);

  return (
    <img
      src={bombImg}
      alt="Bomb"
      style={{ left: `${bombPosition.x}%`, top: `${bombPosition.y}%` }}
      className="absolute transform -translate-x-1/2 w-16 h-16"
    />
  );
};
