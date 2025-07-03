// Utility functions for the memory sequence game

export const generateRandomSequence = (length: number): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * 9)); // 9 squares (3x3 grid)
};

export const validateSequence = (
  sequence: number[],
  playerInput: number[],
): boolean => {
  if (playerInput.length !== sequence.length) return false;
  return playerInput.every((input, index) => input === sequence[index]);
};

export const calculateScore = (
  level: number,
  timeRemaining: number,
): number => {
  const baseScore = level * 10;
  const timeBonus = Math.floor(timeRemaining * 2);
  return baseScore + timeBonus;
};
