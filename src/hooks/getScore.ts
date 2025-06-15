export const getScore = (
  ratPos: { x: number; y: number },
  starPos: { x: number; y: number }
): boolean => {
  const dx = ratPos.x - starPos.x;
  const dy = ratPos.y - starPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < 5;
};
