import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from '@storybook/test';
import '../dartbot-board-canvas';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Events',
  component: 'dartbot-board-canvas',
  parameters: {
    actions: {
      handles: ['board-click', 'board-pointer-down'],
    },
  },
  decorators: [withActions],
  tags: ['autodocs'],
  render: (args: HeaderProps) => Header(args),
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<HeaderProps>;

type Story = StoryObj<HeaderProps>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

import { html } from 'lit';

import './header.css';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => html`
  <script>
    const e = document.querySelector('dartbot-board-canvas');
    e.addEventListener('pointerdown', pointerEvent);
    //e.addEventListener('click', pointerEvent)
    //e.addEventListener('pointerup', pointerEvent);
    //e.addEventListener('mousemove', pointerEvent);

    function pointerEvent(event) {
      const board = event.target;
      const point = board.translatePoint(event.offsetX, event.offsetY);
      board.hits = [...board.hits, point.polar];
      console.log(event.type, { event, ...point});
    };
  </script>
  <dartbot-board-canvas></dartbot-board-canvas>
`;
