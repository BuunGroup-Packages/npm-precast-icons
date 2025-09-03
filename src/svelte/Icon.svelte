<script lang="ts">
  import type { IconDefinition } from '../types';
  
  export let icon: IconDefinition;
  export let size: number | string = 24;
  export let color: string = 'currentColor';
  export let strokeWidth: number | string = 2;
  export let fill: string = 'none';
  export let stroke: string = 'currentColor';
  let className: string = '';
  export { className as class };
  
  function renderNode(node: any): string {
    const { tag, attrs, children } = node;
    const attrString = Object.entries(attrs)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    
    if (children && children.length > 0) {
      const childrenString = children.map(renderNode).join('');
      return `<${tag} ${attrString}>${childrenString}</${tag}>`;
    }
    
    return `<${tag} ${attrString} />`;
  }
  
  $: svgContent = icon.content.map(renderNode).join('');
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox={icon.viewBox || '0 0 24 24'}
  {fill}
  {stroke}
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  style="color: {color}"
  aria-hidden="true"
  {...$$restProps}
>
  {@html svgContent}
</svg>