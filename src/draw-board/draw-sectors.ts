import { Board, getSectorWidth } from './board';
import { BoardParams } from './board-params';

export const drawSectors = (
  context: CanvasRenderingContext2D,
  board: Board,
  params: BoardParams
) => {
  const { sectors } = board;
  for (let s = 0; s < sectors.length; s += 1) {
    drawSector(context, board, params, s);
  }
};

export const drawSector = (
  context: CanvasRenderingContext2D,
  board: Board,
  params: BoardParams,
  s: number
) => {
  const { rings } = board;
  for (let r = rings.length - 1; r >= 2; r -= 1) {
    drawSection(context, board, params, s, r);
  }
};

export const drawSection = (
  context: CanvasRenderingContext2D,
  board: Board,
  params: BoardParams,
  s: number,
  r: number
) => {
  const sectorWidth = getSectorWidth(board);
  const { colors } = params;
  const c1 = r % colors.length;
  const c2 = s % colors[c1].length;
  context.moveTo(0, 0);
  const overhang = r === board.rings.length - 1 ? 0 : 0.5;
  const ring = board.rings[r] + overhang;
  const ringPrev = r === 0 ? 0 : board.rings[r - 1];
  const strokewidth = ring - ringPrev;
  // const PI = Math.PI;
  context.lineWidth = strokewidth;
  context.lineCap = 'butt';
  context.beginPath();
  const angleOverhang = s === board.sectors.length - 1 ? 0 : 0.01;
  const start = sectorWidth * s;
  const end = sectorWidth * (s + 1) + angleOverhang;
  const radius = ring - (ring - ringPrev) / 2;
  context.arc(0, 0, radius, start, end, false);
  context.strokeStyle = colors[c1][c2];
  context.stroke();
};
