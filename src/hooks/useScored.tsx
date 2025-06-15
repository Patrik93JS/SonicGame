import { useMemo } from 'react';
import { ratSize, starSize } from '../utils/consts';

export const useScored = (
  ratPosition: { x: number; y: number },
  starPosition: {
    x: number;
    y: number;
  }
) => {
  const scored = useMemo(() => {
    const ratLeft = ratPosition.x;
    const ratRight = ratPosition.x + ratSize;
    const ratTop = ratPosition.y;
    const ratBottom = ratPosition.y + ratSize;

    const bombLeft = starPosition.x;
    const bombRight = starPosition.x + starSize;
    const bombTop = starPosition.y;
    const bombBottom = starPosition.y + starSize;

    const horizontalOverlap = ratLeft < bombRight && ratRight > bombLeft;
    const verticalOverlap = ratTop < bombBottom && ratBottom > bombTop;

    return horizontalOverlap && verticalOverlap;
  }, [ratPosition, starPosition]);

  return scored;
};
