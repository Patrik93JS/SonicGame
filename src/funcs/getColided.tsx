export const getColided = (
  ratPos: { x: number; y: number },
  bombPos: {
    x: number;
    y: number;
  }
) => {
  const dx = ratPos.x - bombPos.x;
  const dy = ratPos.y - bombPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < 5;
};
