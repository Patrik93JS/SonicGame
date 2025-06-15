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

  const stopMoving = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stopMoving();
    generateRandomPosition();
  };

  useEffect(() => {
    if (colided || starPosition.y >= 80) {
      stopMoving();
    }

    if (!colided && starPosition.y < 80 && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        handleStarPosition((prev) => {
          return { x: prev.x, y: prev.y + 1 };
        });
      }, 30);
    }

    return () => stopMoving();
  }, [colided, starPosition.y]);

  useEffect(() => {
    if (starPosition.y >= 80) {
      reset();
    }
  }, [starPosition.y]);

  return (
    <img
      src={starImg}
      alt="Star"
      style={{ left: `${starPosition.x}%`, top: `${starPosition.y}%` }}
      className="absolute transform -translate-x-1/2 w-16 h-16"
    />
  );
};
