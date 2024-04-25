import { Board, getSectorWidth } from './board';
import { BoardParams } from './board-params';

export const drawNumbers = (
  context: CanvasRenderingContext2D,
  board: Board,
  params: BoardParams
) => {
  // Draw the out ring wire
  if (params.showNumbers && params.showNumberWire) {
    context.save();
    context.strokeStyle = params.numberWireColor;
    context.lineWidth = params.numberWireWidth;
    const radius = board.radius - 5;
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI, false);
    context.stroke();
    context.restore();
  }

  // Draw the numbers
  context.save();
  context.font = "27px 'Consolas', Monospace";
  board.sectors.forEach((_, i) => drawNumber(context, board, params, i));
  context.restore();
};

export const drawNumber = (
  context: CanvasRenderingContext2D,
  board: Board,
  params: BoardParams,
  i: number
) => {
  context.save();

  context.lineWidth = params.numberWidth;
  context.strokeStyle = params.wireColor;
  const { numberColor, numberFont } = params;

  context.fillStyle = numberColor;
  context.font = numberFont;

  // Rotate the canvas until we get to the correct sector
  const { sectors } = board;
  const sectorWidth = getSectorWidth(board);
  const sectorAngle = (i + 0.5) * sectorWidth;
  context.rotate(sectorAngle);

  // Measure the text to position it in the center of the sector
  const text = sectors[i];
  const textVal = text.toString();
  const textHeight = context.measureText('N').width;
  const textWidth = context.measureText(textVal).width;
  const radius = board.radius - textHeight / 2 - 5;
  context.translate(radius, 0);

  // Draw the number
  context.shadowBlur = 2;
  context.shadowColor = '#000';
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  const a = sectorWidth * i;
  const adjust = a > Math.PI / 2 && a < 2 * Math.PI * 0.75 ? 1 : 0;
  const numAngle = Math.PI / 2 + adjust * Math.PI;
  context.rotate(numAngle);
  context.fillText(sectors[i].toString(), -(textWidth / 2), textHeight / 2);

  context.restore();
};
