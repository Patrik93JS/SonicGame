import type { FC } from 'react';

export const Floor: FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[10%] bg-gray-800">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `repeating-linear-gradient(to right,transparent, #4d9f0c 40px)`,
        }}
      />
    </div>
  );
};
