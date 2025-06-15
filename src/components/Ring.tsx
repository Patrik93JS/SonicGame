import {
  useEffect,
  useRef,
  type Dispatch,
  type FC,
  type SetStateAction,
} from 'react';
import ring from './../assets/ring.png';

type Props = {
  colided: boolean;
  ringPositions: {
    x: number;
    y: number;
  };
  handleRingPositions: Dispatch<SetStateAction<{ x: number; y: number }>>;
};

export const Ring: FC<Props> = ({
  colided,
  ringPositions,
  handleRingPositions,
}) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const generateRandomPosition = () => {
    const x = Math.random() * (95 - 4) + 4;
    handleRingPositions({ x, y: 20 });
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
    if (colided || ringPositions.y >= 80) {
      stopMoving();
    }

    if (!colided && ringPositions.y < 80 && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        handleRingPositions((prev) => {
          return { x: prev.x, y: prev.y + 1 };
        });
      }, 30);
    }

    return () => stopMoving();
  }, [colided, ringPositions.y]);

  useEffect(() => {
    if (ringPositions.y >= 80) {
      reset();
    }
  }, [ringPositions.y]);

  return (
    <img
      src={ring}
      alt="Ring"
      style={{ left: `${ringPositions.x}%`, top: `${ringPositions.y}%` }}
      className="absolute transform -translate-x-1/2 w-16 h-16"
    />
  );
};
