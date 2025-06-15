import type { FC } from 'react';

export const Beams: FC = () => {
  return (
    <>
      <div className="fixed top-[15%] left-[15%] w-1/6 h-[5%] bg-gray-800" />
      <div className="fixed left-[21%] w-[5%] h-[80%]  bg-gray-800">
        <div className="fixed bottom-[10%] left-[15%] w-1/6 h-[5%] bg-gray-800" />
      </div>

      <div className="fixed top-[15%] right-[15%] w-1/6 h-[5%] bg-gray-800" />
      <div className="fixed right-[21%] w-[5%] h-[80%]  bg-gray-800">
        <div className="fixed bottom-[10%] right-[15%] w-1/6 h-[5%] bg-gray-800" />
      </div>
    </>
  );
};
