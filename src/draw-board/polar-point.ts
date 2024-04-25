/**
 * Point in the polar coordinate system
 * represented as a radius and an angle
 */
export interface PolarPoint {
  radius: number;
  angle: number;
}

/**
 * Gets a Cartesian point (x, y) from the polar point
 */
export const getCartesian = (point: PolarPoint) => ({
  x: getCartesianX(point),
  y: getCartesianY(point),
});

/**
 * Get the X value of the Cartesian point
 * @param point Polar point to convert to cartesian
 * @returns X value of the cartesian point
 */
export const getCartesianX = (point: PolarPoint): number =>
  point.radius * Math.cos(point.angle);

/**
 * Get the Y value of the Cartesian point
 * @param point Polar point to convert to cartesian
 * @returns Y value of the cartesian point
 */
export const getCartesianY = (point: PolarPoint): number =>
  point.radius * Math.sin(point.angle);

/**
 * Gets a polar point from Cartesian coordinates
 * @param x Cartesian X coordinate
 * @param y Cartesian Y coordinate
 * @returns Polar point representation of the cartesian coordinate
 */
export const getFromCartesian = (x: number, y: number): PolarPoint => {
  let radius = Math.sqrt(x * x + y * y);
  let angle = Math.atan2(y, x);

  if (radius < 0) {
    radius = Math.abs(radius);
    angle += Math.PI;
  }
  if (angle < 0) {
    angle += Math.PI * 2;
  }
  return { radius, angle };
};

/**
 * Returns a polar point that is the vector of the two other points
 */
export const addPoints = (p1: PolarPoint, p2: PolarPoint) => {
  // Convert Polar coordinates to Cartesian grid
  const xOff = getCartesianX(p2);
  const yOff = getCartesianY(p2);
  const xTarg = getCartesianX(p1);
  const yTarg = getCartesianY(p1);

  // Add target and offset vectors to get our actual hit
  const xHit = xTarg + xOff;
  const yHit = yTarg + yOff;

  // Create the point and convert it back to polar system
  return getFromCartesian(xHit, yHit);
};

/**
 * Returns true if the point is valid. A valid point is a point
 * where the radius and angle are both finite numbers
 */
export const validPoint = (p: PolarPoint) => {
  return Number.isFinite(p?.radius) && Number.isFinite(p?.angle);
}
