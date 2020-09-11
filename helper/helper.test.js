import Color from 'color';
import utils from './utils';

// `describe` is used for grouping related tests together. For example, here we are writing tests for a single class.
// `it` is used for specifying a test that we should run against our code. This is where the checks will go.

// Test helper functions
describe('Testing hoverColor', () => {
  it('pass a color, return 0.2 darker color as hoverColor', () => {
    const color = Color('#a65151').darken(0.2).hex();
    const val = utils.hoverColor('#a65151');
    expect(val).toBe(color);
  });
  it('if params is empty, default color to #080808', () => {
    const color = Color('#080808').darken(0.2).hex();
    const val = utils.hoverColor();
    expect(val).toBe(color);
  });
  it('if params color is #00000, light the hover color', () => {
    const color = Color('#080808').lighten(6).hex();
    const val = utils.hoverColor('#000000');
    expect(val).toBe(color);
  });
});
