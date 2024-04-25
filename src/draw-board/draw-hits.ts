import { BoardParams } from './board-params';
import { PolarPoint, getCartesian } from './polar-point';

export const drawHits = (
  params: BoardParams,
  context: CanvasRenderingContext2D,
  hits: PolarPoint[]
) => {
  context.fillStyle = params.hitFillColor;
  context.strokeStyle = params.hitLineColor;
  context.lineWidth = params.hitLineWidth;
  const radius = params.hitRadius;
  for (const hit of hits) {
    const point = getCartesian(hit);
    context.beginPath();
    context.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
  }
};
