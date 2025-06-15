import { useMemo } from 'react';
import { bombSize, ratSize } from '../utils/consts';

export const useColided = (
  ratPosition: { x: number; y: number },
  bombPosition: {
    x: number;
    y: number;
  }
) => {
  const colided = useMemo(() => {
    const ratLeft = ratPosition.x;
    const ratRight = ratPosition.x + ratSize;
    const ratTop = ratPosition.y;
    const ratBottom = ratPosition.y + ratSize;

    const bombLeft = bombPosition.x;
    const bombRight = bombPosition.x + bombSize;
    const bombTop = bombPosition.y;
    const bombBottom = bombPosition.y + bombSize;

    const horizontalOverlap = ratLeft < bombRight && ratRight > bombLeft;
    const verticalOverlap = ratTop < bombBottom && ratBottom > bombTop;

    return horizontalOverlap && verticalOverlap;
  }, [ratPosition, bombPosition]);

  return colided;
};
