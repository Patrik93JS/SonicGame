import {
  useEffect,
  useRef,
  useState,
  type FC,
  type SetStateAction,
} from 'react';
import sonic from './../assets/sonic.png';

type Props = {
  colided: boolean;
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

export const Sonic: FC<Props> = ({
  sonicPosition,
  handleSonicPosition,
  colided,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const jumpIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(speed);
  const [direction, setDirection] = useState<
    'left' | 'right' | 'up' | 'down' | null
  >(null);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const startMoving = (dir: 'left' | 'right') => {
    if (colided) stopMoving();
    setDirection(dir);
    intervalRef.current = setInterval(() => {
      handleSonicPosition((prev) => {
        const step = speedRef.current;
        if (dir === 'left') return { x: Math.max(prev.x - step, 4), y: prev.y };
        if (dir === 'right')
          return { x: Math.min(prev.x + step, 96), y: prev.y };
        return { x: prev.x, y: prev.y };
      });
    }, 30);
  };

  const stopMoving = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (direction !== 'up' && direction !== 'down') {
      setDirection(null);
    }
  };

  const jump = () => {
    if (isJumping && direction !== 'down') return;
    setIsJumping(true);
    setDirection('up');

    if (jumpIntervalRef.current) {
      clearInterval(jumpIntervalRef.current);
      jumpIntervalRef.current = null;
    }

    const jumpHeight = 10;
    const jumpDuration = 500;
    const steps = 20;
    const stepHeight = jumpHeight / steps;
    const stepTime = jumpDuration / steps;

    let currentStep = 0;

    jumpIntervalRef.current = setInterval(() => {
      handleSonicPosition((prev) => {
        currentStep++;
        const newY = prev.y - stepHeight * speedRef.current;
        if (currentStep >= steps || newY <= prev.y - jumpHeight) {
          clearInterval(jumpIntervalRef.current!);
          jumpIntervalRef.current = null;
          startFalling(prev.y - jumpHeight);
        }
        return { x: prev.x, y: newY };
      });
    }, stepTime);
  };

  const startFalling = (startY: number) => {
    const fallHeight = 82 - startY;
    const fallDuration = 500;
    const steps = 20;
    const stepHeight = fallHeight / steps;
    const stepTime = fallDuration / steps;
    let currentStep = 0;

    jumpIntervalRef.current = setInterval(() => {
      handleSonicPosition((prev) => {
        currentStep++;
        const newY = prev.y + stepHeight * speedRef.current;
        if (currentStep >= steps || newY >= 82) {
          clearInterval(jumpIntervalRef.current!);
          jumpIntervalRef.current = null;
          handleSonicPosition((prev) => ({ x: prev.x, y: 82 }));
          setIsJumping(false);
          setDirection(null);
        }
        return { x: prev.x, y: newY };
      });
    }, stepTime);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === 'ArrowLeft') startMoving('left');
      if (e.key === 'ArrowRight') startMoving('right');
      if (e.key === 'ArrowUp') jump();
      if (e.key === 'Shift') {
        setSpeed(3);
        if (direction && direction !== 'up' && direction !== 'down') {
          startMoving(direction);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        stopMoving();
      }
      if (e.key === 'Shift') {
        setSpeed(1);
        if (direction && direction !== 'up' && direction !== 'down') {
          startMoving(direction);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      stopMoving();
      if (jumpIntervalRef.current) {
        clearInterval(jumpIntervalRef.current);
        jumpIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <img
      src={sonic}
      alt="Sonic"
      style={{ left: `${sonicPosition.x}%`, top: `${sonicPosition.y}%` }}
      className="absolute transform -translate-x-1/2 w-20 h-20 transition-all duration-[50ms] ease-linear"
    />
  );
};
