import { clearBoard } from './draw-board/clear-board';
import { createBoard } from './lib/create-board';
import { drawBoard } from './draw-board/draw-board';
import { drawHits } from './draw-board/draw-hits';
import { getPolar, Point, PolarPoint } from './lib/polar-point';
import { setContext } from './draw-board/set-context';
import { debounce } from './lib/debounce';
import { Board, translateCoords } from './lib';
import { themeBuilder } from './lib/theme-builder';

const RESIZE_DEBOUNCE_MS = 100;
const DEFAULT_ZOOM = 0;

export class DartbotBoardCanvas extends HTMLElement {
  #resizeObserver: ResizeObserver;
  #canvas!: HTMLCanvasElement;
  #hits: PolarPoint[] = [];
  #zoom = DEFAULT_ZOOM;
  #template: HTMLTemplateElement;
  #shadow: ShadowRoot;
  #board: Board;

  get zoom(): number {
    return this.#zoom;
  }

  set zoom(value: number) {
    this.#zoom = value;
    this.#render();
  }

  get hits(): PolarPoint[] {
    return this.#hits;
  }

  set hits(value: PolarPoint[]) {
    this.#hits = value;
    this.#render();
  }

  constructor() {
    super();
    this.#board = createBoard();
    this.#resizeObserver = new ResizeObserver(
      debounce(this.#resize.bind(this), RESIZE_DEBOUNCE_MS)
    );
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#template = document.createElement('template');
    this.#template.innerHTML = `
      <style>
      :host {
        --size: 800px;
        display: block;
        width: var(--size);
        height: var(--size);
        box-sizing: border-box;
      }
      canvas { position: absolute; }
      </style>
      <canvas></canvas>
    `;
  }

  connectedCallback() {
    this.#resizeObserver.observe(this, { box: 'device-pixel-content-box' });
    const content = this.#template.content.cloneNode(true);
    this.#shadow.appendChild(content);
    this.#canvas = this.#shadow.querySelector('canvas')!;
  }

  renderCallback() {
    this.#render();
  }

  disconnectedCallback() {
    this.#resizeObserver.disconnect();
  }

  #resize(entries: ResizeObserverEntry[]) {
    console.log(`resize ${JSON.stringify(entries[0])}`);
    for (const entry of entries) {
      const dw = entry.devicePixelContentBoxSize[0].inlineSize;
      const dh = entry.devicePixelContentBoxSize[0].blockSize;
      const cr = entry.contentRect;
      this.#canvas.width = dw;
      this.#canvas.height = dh;
      this.#canvas.style.width = `${cr.width}px`;
      this.#canvas.style.height = `${cr.height}px`;
    }
    this.#render();
  }

  #render() {
    const canvas = this.#shadow.querySelector('canvas')!;
    if (canvas == null) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }
    const board = this.#board;
    const style = getComputedStyle(this);
    const theme = themeBuilder(style);

    ctx.save();
    clearBoard(ctx);
    setContext(board, ctx);
    drawBoard(board, theme, ctx);
    drawHits(theme,ctx, this.#hits);
    ctx.restore();
  }

  /**
   * Translates a point from the canvas to match
   * dimensions of the board. The point is adjusted
   * so that 0,0 is the center of the board and dimensions
   * are in mm relative to the board radius.
   */
  translatePoint(x: number, y: number): PointInfo {
    const { offsetWidth, offsetHeight } = this.#canvas;
    const sectors = this.#board.sectors.length;
    const radius = this.#board.radius;
    const point = translateCoords(offsetWidth, offsetHeight, this.#zoom, radius, sectors, x, y);
    const polar = getPolar(point.x, point.y);
    return { point, polar, x, y };
  }

}

export interface PointInfo {
  x: number;
  y: number;
  point: Point;
  polar: PolarPoint;
}