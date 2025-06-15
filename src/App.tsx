import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type SetStateAction,
} from 'react';
import { Layout } from './Layout';
import { Sonic } from './components/Sonic';
import { Bomb } from './components/Bomb';
import { Ring } from './components/Ring';
import { getColided } from './funcs/getColided';
import { getScore } from './funcs/getScore';
import { EndGame } from './EndGame';

type Position = { x: number; y: number };

const App: FC = () => {
  const [ringPositions, setRingPositions] = useState<Position[]>([]);
  const [sonicPosition, setSonicPosition] = useState<Position>({
    x: 50,
    y: 81,
  });
  const [bombPositions, setBombPositions] = useState<Position[]>([
    { x: 50, y: 20 },
  ]);
  const [score, setScore] = useState<number>(0);

  const colided = bombPositions.some((bombPos) =>
    getColided(sonicPosition, bombPos)
  );

  const generateStars = useCallback(() => {
    const count = Math.floor(Math.random() * 3) + 7;
    const newStars: Position[] = Array.from({ length: count }, () => ({
      x: Math.random() * (95 - 4) + 4,
      y: Math.random() * (80 - 40) + 40,
    }));
    setRingPositions(newStars);
  }, []);

  const generateBombs = useCallback(() => {
    let bombCount = 1;
    if (score >= 40) bombCount = 6;
    else if (score >= 30) bombCount = 3;
    else if (score >= 20) bombCount = 2;

    setBombPositions((prev) => {
      if (prev.length === bombCount) return prev;
      return Array.from({ length: bombCount }, (_, i) => ({
        x: prev[i]?.x ?? Math.random() * (95 - 4) + 4,
        y: prev[i]?.y ?? 20,
      }));
    });
  }, [score]);

  useEffect(() => {
    generateStars();
  }, []);

  useEffect(() => {
    generateBombs();
  }, [score, generateBombs]);

  useEffect(() => {
    ringPositions.forEach((starPos, index) => {
      if (getScore(sonicPosition, starPos)) {
        setScore((prev) => prev + 1);
        setRingPositions((prev) =>
          prev.map((pos, i) =>
            i === index
              ? {
                  x: Math.random() * (95 - 4) + 4,
                  y: 20,
                }
              : pos
          )
        );
      }
    });
  }, [sonicPosition, ringPositions]);

  const handleSonicPosition = (value: SetStateAction<Position>) => {
    setSonicPosition(value);
  };

  const handleBombPosition = (
    index: number,
    value: SetStateAction<Position>
  ) => {
    setBombPositions((prev) =>
      prev.map((pos, i) =>
        i === index ? (typeof value === 'function' ? value(pos) : value) : pos
      )
    );
  };

  const handleRingPositions = (
    index: number,
    value: SetStateAction<Position>
  ) => {
    setRingPositions((prev) =>
      prev.map((pos, i) =>
        i === index ? (typeof value === 'function' ? value(pos) : value) : pos
      )
    );
  };

  return colided ? (
    <EndGame score={score} />
  ) : (
    <Layout>
      <div className="bg-blue-400 text-white fixed top-[5%] left-[10%] w-[10%] h-[5%] text-3xl justify-center items-center flex">
        Score: {score}
      </div>

      <Sonic
        colided={colided}
        sonicPosition={sonicPosition}
        handleSonicPosition={handleSonicPosition}
      />
      {bombPositions.map((pos, index) => (
        <Bomb
          key={index}
          colided={colided}
          bombPosition={pos}
          handleBombPosition={(value) => handleBombPosition(index, value)}
        />
      ))}
      {ringPositions.map((pos, index) => (
        <Ring
          key={index}
          colided={colided}
          ringPositions={pos}
          handleRingPositions={(value) => handleRingPositions(index, value)}
        />
      ))}
    </Layout>
  );
};

export default App;
