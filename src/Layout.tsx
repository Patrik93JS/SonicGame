import type { FC, ReactNode } from 'react';
import { Beams } from './components/Beams';
import { Floor } from './components/Floor';
import { Roof } from './components/Roof';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-red-200 flex items-center justify-center">
      <Floor />
      <Beams />
      <Roof />
      {children}
    </div>
  );
};
