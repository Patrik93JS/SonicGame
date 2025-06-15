import type { FC } from 'react';

type Props = {};

export const Floor: FC<Props> = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div className="fixed bottom-0 left-0 w-full h-[20%] bg-gray-800">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(to right,transparent, #4d9f0c 40px)`,
          }}
        />
      </div>
    </div>
  );
};
