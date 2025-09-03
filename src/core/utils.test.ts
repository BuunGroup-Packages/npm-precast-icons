import { describe, it, expect } from 'vitest';
import { renderIconDefinition, createIconDefinition } from './utils';
import { IconDefinition } from '../types';

describe('renderIconDefinition', () => {
  it('should render a simple icon definition to SVG string', () => {
    const icon: IconDefinition = {
      name: 'test',
      viewBox: '0 0 24 24',
      content: [
        {
          tag: 'path',
          attrs: { d: 'M12 2L2 7v10' },
        },
      ],
    };

    const result = renderIconDefinition(icon);
    expect(result).toContain('<svg');
    expect(result).toContain('</svg>');
    expect(result).toContain('<path d="M12 2L2 7v10"');
  });

  it('should apply custom props to the SVG', () => {
    const icon: IconDefinition = {
      name: 'test',
      viewBox: '0 0 24 24',
      content: [
        {
          tag: 'circle',
          attrs: { cx: '12', cy: '12', r: '10' },
        },
      ],
    };

    const result = renderIconDefinition(icon, {
      size: 32,
      color: 'red',
      strokeWidth: 3,
    });

    expect(result).toContain('width="32"');
    expect(result).toContain('height="32"');
    expect(result).toContain('stroke-width="3"');
    expect(result).toContain('style="color: red"');
  });
});

describe('createIconDefinition', () => {
  it('should create an icon definition from paths', () => {
    const icon = createIconDefinition('test', ['M12 2L2 7v10', 'M20 10L10 20']);

    expect(icon.name).toBe('test');
    expect(icon.content).toHaveLength(2);
    expect(icon.content[0].tag).toBe('path');
    expect(icon.content[0].attrs.d).toBe('M12 2L2 7v10');
    expect(icon.content[1].attrs.d).toBe('M20 10L10 20');
  });

  it('should apply custom options', () => {
    const icon = createIconDefinition('test', ['M12 2L2 7v10'], {
      viewBox: '0 0 48 48',
      width: 48,
      height: 48,
    });

    expect(icon.viewBox).toBe('0 0 48 48');
    expect(icon.width).toBe(48);
    expect(icon.height).toBe(48);
  });
});
