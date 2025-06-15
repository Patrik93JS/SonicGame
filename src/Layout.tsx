import type { FC } from 'react';
import { Beams } from './components/Beams';
import { Floor } from './components/floor';
import { Roof } from './components/Roof';

export const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-red-200 flex items-center justify-center">
      <Floor />
      <Beams />
      <Roof />
    </div>
  );
};
