export const getCurvedPath = (startX, startY, endX, endY) => {
  const midX = (startX + endX) / 2;
  const midY = startY - 50;
  return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
};
