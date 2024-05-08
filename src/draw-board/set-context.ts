import { Board } from '../lib';
import { getPoint, isValidPolar } from '../lib/polar-point';

const DEFAULT_ZOOM = 0;
const DEFAULT_CENTER_POINT = { radius: 0, angle: 0 };

/**
 * Set the scale and rotation of the canvas to match the dimensions
 * of a darboard. Positions will be relative to the center of the board
 * and units will be in millimeters. This allows us to draw the board
 * using coordinates that match the physical board.
 * @param radius The radius of the board in millimeters
 * @param sectors The number of sectors on the board
 * @param context Canvas rendering context to draw the board to
 * @param zoom Zoom level of the board. 0 is normal, negative zooms out, positive zooms in
 * @param centerPoint Point on the board that the canvas should be centered on
*/
export const setContext = (
  board: Board,
  context: CanvasRenderingContext2D
) => {

  if (context == null) {
    return;
  }

  const radius = board.radius;
  const sectors = board.sectors.length;
  const zoom = DEFAULT_ZOOM;
  const centerPoint = DEFAULT_CENTER_POINT;
  const width = context.canvas?.width;
  const height = context.canvas?.height;

  // Set the bulleye to center of canvas (0,0)
  context.translate(width / 2, height / 2);

  // Set rotation so X axis is the start of first sector
  const sectorWidth = sectors ? (2 * Math.PI) / sectors : 0;
  context.rotate(-(Math.PI / 2 + sectorWidth / 2));

  // Set the scale so that the board exactly fills
  // the canvas then adjust the zoom level
  let z = Math.abs(zoom) + 1;
  if (zoom < 0) { z **= -1; }
  const fit = Math.min(width, height);
  const scale = (fit / (radius * 2.0)) * z;
  context.scale(scale, scale);

  // If the user has specified a different center point,
  // translate the canvas so it is at the the center
  if (isValidPolar(centerPoint) && centerPoint.radius !== 0) {
    const center = getPoint(centerPoint);
    context.translate(-center.x, -center.y);
  }
};
