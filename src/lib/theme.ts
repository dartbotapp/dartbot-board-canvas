export const enum Token {
  boardBg = '--db-board-bg',
  sectorBg1 = '--db-sector-bg-1',
  sectorBg2 = '--db-sector-bg-2',
  sectorBg3 = '--db-sector-bg-3',
  sectorBg4 = '--db-sector-bg-4',
  wireShow = '--db-wire-show',
  wireWidth = '--db-wire-width',
  wireColor = '--db-wire-color',
  wireShadowShow = '--db-wire-shadow-show',
  wireShadowColor = '--db-wire-shadow-color',
  wireShadowBlur = '--db-wire-shadow-blur',
  wireShadowOffsetX = '--db-wire-shadow-offset-x',
  wireShadowOffsetY = '--db-wire-shadow-offset-y',
  wireRingOffset = '--db-wire-ring-offset',
  numberShow = '--db-number-show',
  numberWidth = '--db-number-width',
  numberColor = '--db-number-color',
  numberFont = '--db-number-font',
  numberInset = '--db-number-inset',
  numberWireShow = '--db-number-wire-show',
  numberWireWidth = '--db-number-wire-width',
  numberWireColor = '--db-number-wire-color',
  hitFillColor = '--db-hit-fill-color',
  hitRadius = '--db-hit-radius',
  hitStokeColor = '--db-hit-stoke-color',
  hitStrokeWidth = '--db-hit-stoke-width',
}

export interface Theme {
  boardBackground: string;
  sectorColor: string[][];
  wireShow: boolean,
  wireWidth: number,
  wireColor: string,
  wireShadowShow: boolean,
  wireShadowColor: string,
  wireShadowBlur: number,
  wireShadowOffsetX: number,
  wireShadowOffsetY: number,
  wireRingOffset: number,
  numberShow: boolean,
  numberWidth: number,
  numberColor: string,
  numberFont: string,
  numberInset: number,
  numberWireShow: boolean,
  numberWireWidth: number,
  numberWireColor: string,
  hitFillColor: string,
  hitRadius: number,
  hitStokeColor: string,
  hitStrokeWidth: number,
};
