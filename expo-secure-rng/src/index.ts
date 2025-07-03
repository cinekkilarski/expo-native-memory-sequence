// Reexport the native module. On web, it will be resolved to ExpoSecureRngModule.web.ts
// and on native platforms to ExpoSecureRngModule.ts
export { default } from "./ExpoSecureRngModule";
export { default as ExpoSecureRngView } from "./ExpoSecureRngView";
export * from "./ExpoSecureRng.types";

import { requireNativeModule } from "expo-modules-core";

const ExpoSecureRng = requireNativeModule("ExpoSecureRng");

export function getRandomInt(max: number): number {
  if (ExpoSecureRng && typeof ExpoSecureRng.getRandomInt === "function") {
    return ExpoSecureRng.getRandomInt(max);
  }
  // Fallback JS (not cryptographically secure)
  return Math.floor(Math.random() * max);
}

export function generateRandomSequence(
  length: number,
  max: number = 9
): number[] {
  if (
    ExpoSecureRng &&
    typeof ExpoSecureRng.generateRandomSequence === "function"
  ) {
    return ExpoSecureRng.generateRandomSequence(length, max);
  }
  // Fallback JS - generates a sequence of n random numbers with no consecutive repeats
  const sequence: number[] = [];

  for (let i = 0; i < length; i++) {
    let nextNumber: number;

    if (i === 0) {
      // The first number can be any value
      nextNumber = getRandomInt(max);
    } else {
      // Generate a number different from the previous one
      do {
        nextNumber = getRandomInt(max);
      } while (nextNumber === sequence[i - 1]);
    }

    sequence.push(nextNumber);
  }

  return sequence;
}

// Możesz dodać inne funkcje, np. getRandomBytes, jeśli chcesz
