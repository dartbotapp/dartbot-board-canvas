import { PolarPoint } from './polar-point';

export interface BoardParams {
  centerPoint: PolarPoint;
  zoom: number;
  boardBackground: string;
  colors: string[][];
  showWire: boolean;
  wireWidth: number;
  wireColor: string;
  showNumbers: boolean;
  numberWidth: number;
  numberColor: string;
  numberFont: string;
  showNumberWire: boolean;
  numberWireWidth: number;
  numberWireColor: string;
  hitFillColor: string;
  hitLineColor: string;
  hitLineWidth: number;
  hitRadius: number;
}

export const getBoardParams = (): BoardParams => ({
  centerPoint: {
    radius: 0,
    angle: 0,
  },
  zoom: 0,
  boardBackground: '#000',
  colors: [
    ['rgba(10, 10, 10, 1)', 'rgba(255, 250, 231, 1)'],
    ['rgba(193, 50, 50, 1)', 'rgba(39, 91, 42, 1)'],
  ],
  showWire: true,
  showNumbers: true,
  showNumberWire: true,
  numberFont: 'Consolas',
  wireWidth: 1,
  numberWidth: 1.75,
  numberWireWidth: 2.5,
  wireColor: '#fff',
  numberColor: '#eee',
  numberWireColor: '#fff',
  hitFillColor: 'rgba(80, 00, 160, .6)',
  hitLineColor: 'rgba(30, 33, 50, .8)',
  hitLineWidth: 0.3,
  hitRadius: 4,
});
