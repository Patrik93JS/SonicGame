import {
  useEffect,
  useRef,
  type Dispatch,
  type FC,
  type SetStateAction,
} from 'react';
import starImg from './../assets/starImg.png';

type Props = {
  colided: boolean;
  starPosition: {
    x: number;
    y: number;
  };
  handleStarPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
};

export const Star: FC<Props> = ({
  colided,
  starPosition,
  handleStarPosition,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomPosition = () => {
    const x = Math.random() * (95 - 4) + 4;
    handleStarPosition({ x, y: 20 });
  };

  const startMoving = () => {
    if (colided) stopMoving();
    if (starPosition.y === 80) reset();
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        handleStarPosition((prev) => {
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
      handleStarPosition((prev) => {
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
