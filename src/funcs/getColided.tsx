export const getColided = (
  sonicPos: { x: number; y: number },
  bombPos: {
    x: number;
    y: number;
  }
) => {
  const dx = sonicPos.x - bombPos.x;
  const dy = sonicPos.y - bombPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < 5;
};
