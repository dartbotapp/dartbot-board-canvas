import { getRandomPoint, getSectorWidth } from './draw-board/board';
import { getBoardParams } from './draw-board/board-params';
import { clearBoard } from './draw-board/clear-board';
import { createBoard } from './draw-board/create-board';
import { drawBoard } from './draw-board/draw-board';
import { drawHits } from './draw-board/draw-hits';
import { PolarPoint } from './draw-board/polar-point';
import { setContext } from './draw-board/set-context';

export class DartbotBoardCanvas extends HTMLElement {
  private observer!: MutationObserver;
  private resizeObserver!: ResizeObserver;
  private template: HTMLTemplateElement;
  private shadow: ShadowRoot;

  private hits: PolarPoint[] = [];
  protected board: any;
  static get observedAttributes() {
    return ['prefix-text'];
  }
  constructor() {
    super();

    this.board = createBoard();
    this.hits = [...Array(20).keys()].map(k => getRandomPoint(this.board, 1, 4));

    this.shadow = this.attachShadow({mode: 'open'});
    this.template = document.createElement('template');
    this.template.innerHTML = `
      <style>
      :host {
        display: block;
        width: 300px;
        height: 300px;
        box-sizing: border-box;
      }
      canvas { position: absolute; }
      </style>
      <canvas></canvas>
    `;
  }
  connectedCallback() {
    this.observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
          console.log(`mutate
            ${mutation.attributeName}
            ${mutation.oldValue}
          `);
        }
      }
    });
    this.observer.observe(this, {attributes: true});

    function debounce(func: any, wait: any) {
      let timeout: NodeJS.Timeout;
      return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    }

    const debouncedResize = debounce((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        canvas.width = cr.width!;
        canvas.height = cr.height!;
      }
      this._render();
    }, 100);

    this.resizeObserver = new ResizeObserver(entries => {
      debouncedResize(entries);
      for (const entry of entries) {
        const cr = entry.contentRect;
      }
    });
    this.resizeObserver.observe(this);

    const content = this.template.content.cloneNode(true);
    this.shadow.appendChild(content);
    const canvas = this.shadow.querySelector('canvas')!;
    canvas.width = this.clientWidth!;
    canvas.height = this.clientHeight!;
    this._render();
  }

  disconnectedCallback() {
    const child = this.querySelector('svg');
    if (child) {
      this.removeChild(child);
    }
    this.observer.disconnect();
    this.resizeObserver.disconnect();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(`attribute changed ${name} ${newValue}`);
  }

  _render() {
    const canvas = this.shadow.querySelector('canvas');
    if (canvas == null) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    const params = getBoardParams();
    clearBoard(ctx);
    ctx.save();
    setContext({
      radius: this.board.radius,
      sectors: this.board.sectors.length,
      zoom: params.zoom,
      centerPoint: params.centerPoint
    }, ctx);
    drawBoard(ctx, params, this.board);

    drawHits(params, ctx, this.hits);

    ctx.restore();
  }
}
