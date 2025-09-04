import { IconNode, IconDefinition } from '../types';

/**
 * Render an icon definition to an SVG string
 * @param definition - Icon definition object
 * @param props - SVG properties and attributes
 * @returns SVG string
 */
export function renderIconDefinition(
  definition: IconDefinition,
  props: Record<string, any> = {}
): string {
  const {
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    className = '',
    style = {},
    fill = 'none',
    stroke = 'currentColor',
    ...restProps
  } = props;

  const svgAttrs = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: definition.viewBox || '0 0 24 24',
    fill,
    stroke,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    style: { ...style, color },
    ...restProps,
  };

  const renderNode = (node: IconNode): string => {
    const { tag, attrs, children } = node;
    const attrString = Object.entries(attrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    if (children) {
      if (typeof children === 'string') {
        // Text content
        return `<${tag} ${attrString}>${children}</${tag}>`;
      } else if (Array.isArray(children) && children.length > 0) {
        // Child nodes
        const childrenString = children.map(renderNode).join('');
        return `<${tag} ${attrString}>${childrenString}</${tag}>`;
      }
    }

    return `<${tag} ${attrString} />`;
  };

  const content = definition.content.map(renderNode).join('');
  const svgAttrString = Object.entries(svgAttrs)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (key === 'style' && typeof value === 'object') {
        const styleString = Object.entries(value)
          .map(([k, v]) => `${k}: ${v}`)
          .join('; ');
        return `style="${styleString}"`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');

  return `<svg ${svgAttrString}>${content}</svg>`;
}

/**
 * Create an icon definition from path data
 * @param name - Icon name
 * @param paths - Array of SVG path data strings
 * @param options - Additional icon options
 * @returns Icon definition object
 */
export function createIconDefinition(
  name: string,
  paths: string[],
  options: Partial<IconDefinition> = {}
): IconDefinition {
  const content: IconNode[] = paths.map(d => ({
    tag: 'path',
    attrs: { d },
  }));

  return {
    name,
    content,
    viewBox: '0 0 24 24',
    width: 24,
    height: 24,
    ...options,
  };
}
