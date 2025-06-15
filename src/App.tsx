import type { FC } from 'react';
import { Layout } from './Layout';
import { Rat } from './components/Rat';

const App: FC = () => {
  return (
    <Layout>
      <Rat />
    </Layout>
  );
};

export default App;
