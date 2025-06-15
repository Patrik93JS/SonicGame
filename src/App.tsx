import { useEffect, useState, type FC, type SetStateAction } from 'react';
import { Layout } from './Layout';
import { Rat } from './components/Rat';
import { Bomb } from './components/Bomb';
import { Star } from './components/Star';
import { useColided } from './hooks/useColided';
import { getScore } from './hooks/getScore';

type Position = { x: number; y: number };

const App: FC = () => {
  const [starPositions, setStarPositions] = useState<Position[]>([]);
  const [ratPosition, setRatPosition] = useState<Position>({ x: 50, y: 80 });
  const [bombPosition, setBombPosition] = useState<Position>({ x: 50, y: 20 });
  const [score, setScore] = useState(0);

  const colided = useColided(ratPosition, bombPosition);

  const generateStars = () => {
    const count = Math.floor(Math.random() * 3) + 7;
    const newStars: Position[] = Array.from({ length: count }, () => ({
      x: Math.random() * (95 - 4) + 4,
      y: Math.random() * (80 - 40) + 40,
    }));
    setStarPositions(newStars);
  };

  useEffect(() => {
    generateStars();
  }, []);

  useEffect(() => {
    starPositions.forEach((starPos, index) => {
      if (getScore(ratPosition, starPos)) {
        setScore((prev) => prev + 1);
        setStarPositions((prev) =>
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
  }, [ratPosition, starPositions]);

  const handleRatPosition = (value: SetStateAction<Position>) => {
    setRatPosition(value);
  };

  const handleBombPosition = (value: SetStateAction<Position>) => {
    setBombPosition(value);
  };

  const handleStarPosition = (
    index: number,
    value: SetStateAction<Position>
  ) => {
    setStarPositions((prev) =>
      prev.map((pos, i) =>
        i === index ? (typeof value === 'function' ? value(pos) : value) : pos
      )
    );
  };

  return (
    <Layout>
      <div className="bg-blue-400 text-white fixed top-[5%] left-[10%] w-[10%] h-[5%] text-3xl justify-center items-center flex">
        Score: {score}
      </div>

      <Rat ratPosition={ratPosition} handleRatPosition={handleRatPosition} />
      <Bomb
        colided={colided}
        bombPosition={bombPosition}
        handleBombPosition={handleBombPosition}
      />
      {starPositions.map((pos, index) => (
        <Star
          key={index}
          colided={colided}
          starPosition={pos}
          handleStarPosition={(value) => handleStarPosition(index, value)}
        />
      ))}
    </Layout>
  );
};

export default App;
