export const randomNumber = (
  min: number = 0,
  max: number = 1,
  integer: boolean = true
) => {
  if (min > max) {
    throw new Error("Min should not be greather than max");
  }
  const rNum = min + Math.random() * (max - min);
  return integer ? Math.round(rNum) : rNum;
};
