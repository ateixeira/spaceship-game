export const randomNumber = (min: number = 0, max: number = 1) => {
  if (min > max) {
    throw new Error("Min should not be greather than max");
  }
  return min + Math.random() * (max - min);
};
