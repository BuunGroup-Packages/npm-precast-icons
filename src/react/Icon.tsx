import React, { forwardRef } from 'react';
import { IconDefinition, IconProps } from '../types';

export interface PrecastIconProps extends IconProps {
  icon: IconDefinition;
}

export const Icon = forwardRef<SVGSVGElement, PrecastIconProps>(
  (
    {
      icon,
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
        viewBox={icon.viewBox || '0 0 24 24'}
        className={className}
        style={{ ...style, color }}
        {...svgProps}
        {...props}
      >
        {icon.content.map((node, index) => renderNode(node, index))}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
