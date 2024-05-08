import { html, TemplateResult } from 'lit';
import '../src/dartbot-board-canvas';

export default {
  title: 'Events',
  component: 'dartbot-board-canvas',
  parameters: {
    actions: {
      handles: ['mouseover', 'click', 'boardclick']
    },
  },
  argTypes: {
    style: { control: 'inline-radio', options: ['sixties', 'eighties'], },
    header: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};


interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

enum Styles {
  sixties = 'sixties',
  eighties = 'eighties'
}

interface ArgTypes {
  header?: string;
  counter?: number;
  textColor?: string;
  style: Styles;
}

const Template: Story<ArgTypes> = ({
  header = 'Hello world',
  counter = 5,
  textColor,
  style
}: ArgTypes) => {

  return html`
  <style>
    dartbot-board-canvas.sixties {
      --db-sector-bg-1: maroon;
      --db-sector-bg-2: magenta;
      --db-sector-bg-3: turquoise;
      --db-sector-bg-4: indigo;
    }
  </style>
  <dartbot-board-canvas class="${style}"></dartbot-board-canvas>
`
};

export const Regular = Template.bind({});

export const CustomHeader = Template.bind({});
CustomHeader.args = {
  header: 'My header',

};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 123456,
};
