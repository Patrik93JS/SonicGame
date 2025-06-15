import type { FC } from 'react';

type Props = {
  score: number;
};

export const EndGame: FC<Props> = ({ score }) => {
  return (
    <div className="bg-red-400 w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center font-press-start">
        <h1 className="text-white text-8xl">End Game!</h1>
        <h1 className="text-white text-8xl">{score}</h1>
        <h1 className="text-white text-8xl mt-4">Points</h1>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="bg-white text-black font-bold py-2 px-4 rounded-md w-2/3 h-22 mt-10 hover:bg-gray-500 hover:text-white cursor-pointer"
        >
          <div className="text-4xl">Restart</div>
        </button>
      </div>
    </div>
  );
};
