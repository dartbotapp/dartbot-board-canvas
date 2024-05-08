
export const translateCoords = (
  width: number,
  height: number,
  zoom: number,
  radius: number,
  sectors: number,
  x: number,
  y: number,
) => {

  // Correct for the center of the canvas
  const x1 = x - width / 2;
  const y1 = y - height / 2;

  // Correct for zoom
  let z = Math.abs(zoom) + 1;
  if (zoom < 0) {
    z **= -1;
  }
  const fit = Math.min(width, height);
  const scale = (fit / (radius * 2)) * z;
  const x2 = x1 / scale;
  const y2 = y1 / scale;

  // Correct for rotation
  const sectorWidth = (2 * Math.PI) / sectors;
  const radians = Math.PI / 2 + sectorWidth / 2;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const point = {
    x: x2 * cos - y2 * sin,
    y: x2 * sin + y2 * cos,
  };
  return point;
};
