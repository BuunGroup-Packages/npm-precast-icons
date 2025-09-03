import { defineComponent, h } from 'vue';
import { IconDefinition } from '../types';

export function createIcon(definition: IconDefinition) {
  return defineComponent({
    name: `${definition.name.charAt(0).toUpperCase()}${definition.name.slice(1)}Icon`,
    props: {
      size: {
        type: [Number, String],
        default: 24,
      },
      color: {
        type: String,
        default: 'currentColor',
      },
      strokeWidth: {
        type: [Number, String],
        default: 2,
      },
      fill: {
        type: String,
        default: 'none',
      },
      stroke: {
        type: String,
        default: 'currentColor',
      },
      class: {
        type: String,
        default: '',
      },
    },
    setup(props, { attrs }) {
      const renderNode = (node: any): any => {
        const { tag, attrs: nodeAttrs, children } = node;

        if (children && children.length > 0) {
          return h(tag, nodeAttrs, children.map(renderNode));
        }

        return h(tag, nodeAttrs);
      };

      return () =>
        h(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            width: props.size,
            height: props.size,
            viewBox: definition.viewBox || '0 0 24 24',
            fill: props.fill,
            stroke: props.stroke,
            strokeWidth: props.strokeWidth,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            class: props.class,
            style: { color: props.color },
            'aria-hidden': 'true',
            ...attrs,
          },
          definition.content.map(renderNode)
        );
    },
  });
}
