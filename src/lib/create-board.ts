export const createBoard = () => {
  return {
    radius: 225,
    rings: [
      6.35, // Double Bull
      16, // Single Bull
      99, // Skinny Single
      107, // Treble
      162, // Fat Single
      170, // Double and edge of score-able area
    ],
    sectors: [
      20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
    ],
  };
};
