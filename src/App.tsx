import {
  useEffect,
  useMemo,
  useState,
  type FC,
  type SetStateAction,
} from 'react';
import { Layout } from './Layout';
import { Rat } from './components/Rat';
import { Bomb } from './components/Bomb';
import { Star } from './components/Star';

const App: FC = () => {
  const [ratPosition, setRatPosition] = useState({ x: 50, y: 80 });
  const [bombPosition, setBombPosition] = useState({ x: 50, y: 20 });
  const [stars, setStars] = useState(0);

  const ratSize = 4;
  const bombSize = 4;

  const colided = useMemo(() => {
    const ratLeft = ratPosition.x;
    const ratRight = ratPosition.x + ratSize;
    const ratTop = ratPosition.y;
    const ratBottom = ratPosition.y + ratSize;

    const bombLeft = bombPosition.x;
    const bombRight = bombPosition.x + bombSize;
    const bombTop = bombPosition.y;
    const bombBottom = bombPosition.y + bombSize;

    const horizontalOverlap = ratLeft < bombRight && ratRight > bombLeft;
    const verticalOverlap = ratTop < bombBottom && ratBottom > bombTop;

    return horizontalOverlap && verticalOverlap;
  }, [ratPosition, bombPosition]);

  const handleRatPosition = (
    value: SetStateAction<{ x: number; y: number }>
  ) => {
    setRatPosition(value);
  };

  const handleBombPosition = (
    value: SetStateAction<{ x: number; y: number }>
  ) => {
    setBombPosition(value);
  };

  const generateStarsArr = () => {
    const starsLenght = Math.floor(Math.random() * (10 - 5) + 1);

    const x = Math.random() * (10 - 1) + starsLenght;
    return setStars(x);
  };

  useEffect(() => {
    stars === 0 ? generateStarsArr() : null;
  });

  return (
    <Layout>
      <Rat ratPosition={ratPosition} handleRatPosition={handleRatPosition} />
      <Bomb
        colided={colided}
        bombPosition={bombPosition}
        handleBombPosition={handleBombPosition}
      />
      {Array.from({ length: stars }, (_, i) => i + 1).map((i) => (
        <Star key={i} colided={colided} />
      ))}
    </Layout>
  );
};

export default App;
