import type { FC } from 'react';
import { Layout } from './Layout';
import { Rat } from './components/Rat';
import { Bomb } from './components/Bomb';

const App: FC = () => {
  return (
    <Layout>
      <Rat />
      <Bomb />
    </Layout>
  );
};

export default App;
