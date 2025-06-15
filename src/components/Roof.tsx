import type { FC } from 'react';

type Props = {};

export const Roof: FC<Props> = () => {
  return (
    <div className="relative w-full h-screen">
      <div
        className="fixed top-0 left-0 w-full h-[15%] bg-gray-800"
        style={{
          clipPath: 'polygon(0 100%, 10% 0, 90% 0, 100% 100%)',
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(transparent, #4d9f0c 40px)`,
          }}
        />
      </div>
    </div>
  );
};
