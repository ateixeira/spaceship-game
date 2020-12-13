import Vector from "./vector";

export const randomNumber = (
  min: number = 0,
  max: number = 1,
  integer: boolean = false
) => {
  if (min > max) {
    throw new Error("Min should not be greather than max");
  }
  const rNum = min + Math.random() * (max - min);
  return integer ? Math.round(rNum) : rNum;
};

/**
 * The distance between 2 points A(xa, ya) e B(xb, yb) is defined by the length of the segment
 * represented by Dab and it's calculated with the formula sqrt( pow(Xb - Xa, 2) + pow(Yb - Ya, 2) )
 * @param pa
 * @param pb
 */
export const distanceBetweenPoints = (pa: Vector, pb: Vector): number => {
  const Dab = Math.sqrt(Math.pow(pb.x - pa.x, 2) + Math.pow(pb.y - pa.y, 2));
  return Dab;
};

/**
 * Knowing the Point for circumference center and it's radius we verify if a given point is inside
 * the circuference by comparing it's distance from origin (0,0) and the radius.
 * @param point
 * @param circumferenceCenter
 * @param radius
 */
export const isPointInCircumference = (
  point: Vector,
  circumferenceCenter: Vector,
  radius: number
): boolean => {
  const distance = distanceBetweenPoints(point, circumferenceCenter);
  return distance < radius;
};

/**
 * cos(theta) = Px - Cx / radius
 * and
 * sin(theta) = Py - Cy / radius
 * @param point
 * @param circumferenceCenter
 * @param radius
 */
export const angleForPointInCircumference = (
  point: Vector,
  circumferenceCenter: Vector
): number => {
  const diffX = point.x - circumferenceCenter.x;
  const diffY = point.y - circumferenceCenter.y;
  const offset = 90;
  let angle = radiansToDegrees(Math.atan2(diffY, diffX)) + offset;
  return angle <= 180 ? angle : angle - 360;
};

/**
 * Returns a radian value for a given degree input
 * @param degrees
 */
export const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

/**
 * Returns degrees value for a given radian input
 * @param radians
 */
export const radiansToDegrees = (radians: number) => {
  return radians * (180 / Math.PI);
};
