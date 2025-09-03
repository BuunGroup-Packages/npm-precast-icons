import React, { forwardRef } from 'react';
import { IconDefinition, IconProps } from '../types';

export function createIcon(definition: IconDefinition) {
  const Component = forwardRef<SVGSVGElement, IconProps>(
    (
      {
        size = 24,
        color = 'currentColor',
        strokeWidth = 2,
        className = '',
        style = {},
        fill = 'none',
        stroke = 'currentColor',
        mono = false,
        ...props
      },
      ref
    ) => {
      const renderNode = (node: any, index: number): React.ReactElement => {
        const { tag, attrs, children } = node;
        const Tag = tag as keyof JSX.IntrinsicElements;

        if (children && children.length > 0) {
          return (
            <Tag key={index} {...attrs}>
              {children.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </Tag>
          );
        }

        return <Tag key={index} {...attrs} />;
      };

      // In mono mode, use fill for color and no stroke
      const svgProps = mono
        ? {
            fill: color,
            stroke: 'none',
            strokeWidth: 0,
          }
        : {
            fill: fill,
            stroke: stroke || color,
            strokeWidth: strokeWidth,
            strokeLinecap: 'round' as const,
            strokeLinejoin: 'round' as const,
          };

      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox={definition.viewBox || '0 0 24 24'}
          className={className}
          style={{ ...style, color }}
          aria-hidden="true"
          {...svgProps}
          {...props}
        >
          {definition.content.map((node, index) => renderNode(node, index))}
        </svg>
      );
    }
  );

  Component.displayName = `${definition.name.charAt(0).toUpperCase()}${definition.name.slice(1)}Icon`;

  return Component;
}
