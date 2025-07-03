// Utility functions for the memory sequence game
import { generateRandomSequence } from "expo-secure-rng";

export const generateGameSequence = (length: number): number[] => {
  const sequence = generateRandomSequence(length, 9);

  return sequence; // 9 squares (3x3 grid) using secure RNG
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
