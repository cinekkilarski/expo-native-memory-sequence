export const makeColorBrighter = (color: string) => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const brighterR = Math.min(255, r + 50);
  const brighterG = Math.min(255, g + 50);
  const brighterB = Math.min(255, b + 50);

  return `#${brighterR.toString(16).padStart(2, "0")}${brighterG
    .toString(16)
    .padStart(2, "0")}${brighterB.toString(16).padStart(2, "0")}`;
};
