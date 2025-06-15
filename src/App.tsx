import { useState, type FC, type SetStateAction } from 'react';
import { Layout } from './Layout';
import { Rat } from './components/Rat';
import { Bomb } from './components/Bomb';

const App: FC = () => {
  const [ratPosition, setRatPosition] = useState({ x: 50, y: 80 });
  const [bombPosition, setBombPosition] = useState({ x: 50, y: 20 });
  const colided = ratPosition.y === bombPosition.y;

  console.log('ratPosition', ratPosition);
  console.log('bombPosition', bombPosition);

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

  return (
    <Layout>
      <Rat ratPosition={ratPosition} handleRatPosition={handleRatPosition} />
      <Bomb
        colided={colided}
        bombPosition={bombPosition}
        handleBombPosition={handleBombPosition}
      />
    </Layout>
  );
};

export default App;
