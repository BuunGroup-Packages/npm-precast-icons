export interface IconNode {
  tag: string;
  attrs: Record<string, string | number>;
  children?: IconNode[];
}

export interface IconDefinition {
  name: string;
  content: IconNode[];
  viewBox?: string;
  width?: number;
  height?: number;
}

export interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
  stroke?: string;
  mono?: boolean; // Monochrome mode - uses fill instead of stroke
}

export type IconComponent<P = Record<string, unknown>> = React.FC<IconProps & P>;
export type { IconName } from './icons/generated';
