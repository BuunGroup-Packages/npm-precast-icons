declare module 'https://unpkg.com/@buun_group/precast-icons@1.0.0/dist/icons/index.mjs' {
  interface IconNode {
    tag: string;
    attrs?: Record<string, string | number>;
    children?: IconNode[] | string;
  }

  interface IconDefinition {
    name: string;
    content: IconNode[];
    viewBox?: string;
    width?: number;
    height?: number;
  }

  const icons: Record<string, IconDefinition>;
  export = icons;
}
