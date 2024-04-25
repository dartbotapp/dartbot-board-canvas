import { Board } from './board';
import { BoardParams } from './board-params';
import { getCartesianX, getCartesianY, PolarPoint } from './polar-point';
import { drawNumbers } from './draw-numbers';
import { drawSection, drawSectors } from './draw-sectors';

export const drawBoard = (
  context: CanvasRenderingContext2D,
  params: BoardParams,
  board: Board
) => {
  context.save();
  context.fillStyle = params.boardBackground;
  context.beginPath();
  context.arc(0, 0, board.radius, 0, 2 * Math.PI, false);
  context.shadowBlur = 40;
  context.shadowColor = '#fff3';
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;

  context.fill();
  context.restore();

  if (params.showNumbers) {
    drawNumbers(context, board, params);
  }

  drawSectors(context, board, params);

  // Draw the ring wires
  if (params.showWire) {
    context.save();
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0.75;
    context.shadowBlur = 3;
    context.shadowColor = '#000';

    context.strokeStyle = params.wireColor;
    context.lineWidth = params.wireWidth;

    const sectorWidth = (2 * Math.PI) / board.sectors.length;

    // Draw line wires
    for (let s = 0; s < board.sectors.length; s += 1) {
      context.beginPath();
      context.moveTo(0, 0);
      const radius = board.radius * 0.81;
      const angle = s * sectorWidth;
      const point: PolarPoint = { radius, angle };
      const x = getCartesianX(point);
      const y = getCartesianY(point);
      context.lineTo(x, y);
      context.stroke();
    }
    context.restore();
  }

  // Draw Bullseye
  const { colors } = params;
  const c1 = 1 % colors[1].length;
  const c2 = 0 % colors[1].length;

  context.fillStyle = colors[1][c1];
  context.beginPath();
  context.moveTo(0, 0);
  context.arc(0, 0, board.rings[1], 0, Math.PI * 2);
  context.fill();

  context.beginPath();
  context.moveTo(0, 0);
  context.fillStyle = colors[1][c2];
  context.arc(0, 0, board.rings[0], 0, Math.PI * 2);
  context.fill();

  if (params.showWire) {
    context.save();
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0.75;
    context.shadowBlur = 2;
    context.shadowColor = '#000';

    context.strokeStyle = params.wireColor;
    context.lineWidth = params.wireWidth;
    // const adjust = params.wireWidth / 2;

    for (let r = 2; r < board.rings.length; r++) {
      const r0 = board.rings[r - 1];
      const r1 = board.rings[r];
      const r2 = board.rings[r + 1] ?? board.radius;
      const a = r1 - r0 > r2 - r1 ? -1 : 1;
      const adjust = params.wireWidth * 0.35 * a;
      // const adjust = 0;
      context.beginPath();
      context.arc(0, 0, board.rings[r] + adjust, 0, 2 * Math.PI, false);
      context.stroke();
    }

    for (let r = 0; r < 2; r++) {
      context.beginPath();
      context.arc(0, 0, board.rings[r] + (params.wireWidth / 2), 0, 2 * Math.PI, false);
      context.stroke();
    }

    context.restore();
  }
};
