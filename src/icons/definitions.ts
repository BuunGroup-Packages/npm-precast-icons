import { IconDefinition } from '../types';

export const icons: Record<string, IconDefinition> = {
  home: {
    name: 'home',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'path',
        attrs: {
          d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        },
      },
      {
        tag: 'polyline',
        attrs: {
          points: '9 22 9 12 15 12 15 22',
        },
      },
    ],
  },

  search: {
    name: 'search',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'circle',
        attrs: {
          cx: '11',
          cy: '11',
          r: '8',
        },
      },
      {
        tag: 'path',
        attrs: {
          d: 'm21 21-4.35-4.35',
        },
      },
    ],
  },

  settings: {
    name: 'settings',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'circle',
        attrs: {
          cx: '12',
          cy: '12',
          r: '3',
        },
      },
      {
        tag: 'path',
        attrs: {
          d: 'M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 9.02l4.24 4.24m12.44 0l4.24 4.24M1.54 14.98l4.24-4.24',
        },
      },
    ],
  },

  user: {
    name: 'user',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'path',
        attrs: {
          d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
        },
      },
      {
        tag: 'circle',
        attrs: {
          cx: '12',
          cy: '7',
          r: '4',
        },
      },
    ],
  },

  chevronRight: {
    name: 'chevronRight',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'polyline',
        attrs: {
          points: '9 18 15 12 9 6',
        },
      },
    ],
  },

  chevronLeft: {
    name: 'chevronLeft',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'polyline',
        attrs: {
          points: '15 18 9 12 15 6',
        },
      },
    ],
  },

  plus: {
    name: 'plus',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'line',
        attrs: {
          x1: '12',
          y1: '5',
          x2: '12',
          y2: '19',
        },
      },
      {
        tag: 'line',
        attrs: {
          x1: '5',
          y1: '12',
          x2: '19',
          y2: '12',
        },
      },
    ],
  },

  x: {
    name: 'x',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'line',
        attrs: {
          x1: '18',
          y1: '6',
          x2: '6',
          y2: '18',
        },
      },
      {
        tag: 'line',
        attrs: {
          x1: '6',
          y1: '6',
          x2: '18',
          y2: '18',
        },
      },
    ],
  },

  menu: {
    name: 'menu',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'line',
        attrs: {
          x1: '3',
          y1: '12',
          x2: '21',
          y2: '12',
        },
      },
      {
        tag: 'line',
        attrs: {
          x1: '3',
          y1: '6',
          x2: '21',
          y2: '6',
        },
      },
      {
        tag: 'line',
        attrs: {
          x1: '3',
          y1: '18',
          x2: '21',
          y2: '18',
        },
      },
    ],
  },

  heart: {
    name: 'heart',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'path',
        attrs: {
          d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        },
      },
    ],
  },

  star: {
    name: 'star',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'polygon',
        attrs: {
          points:
            '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
        },
      },
    ],
  },

  download: {
    name: 'download',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'path',
        attrs: {
          d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
        },
      },
      {
        tag: 'polyline',
        attrs: {
          points: '7 10 12 15 17 10',
        },
      },
      {
        tag: 'line',
        attrs: {
          x1: '12',
          y1: '15',
          x2: '12',
          y2: '3',
        },
      },
    ],
  },

  upload: {
    name: 'upload',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'path',
        attrs: {
          d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
        },
      },
      {
        tag: 'polyline',
        attrs: {
          points: '17 8 12 3 7 8',
        },
      },
      {
        tag: 'line',
        attrs: {
          x1: '12',
          y1: '3',
          x2: '12',
          y2: '15',
        },
      },
    ],
  },

  check: {
    name: 'check',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'polyline',
        attrs: {
          points: '20 6 9 17 4 12',
        },
      },
    ],
  },

  alertCircle: {
    name: 'alertCircle',
    viewBox: '0 0 24 24',
    content: [
      {
        tag: 'circle',
        attrs: {
          cx: '12',
          cy: '12',
          r: '10',
        },
      },
      {
        tag: 'line',
        attrs: {
          x1: '12',
          y1: '8',
          x2: '12',
          y2: '12',
        },
      },
      {
        tag: 'line',
        attrs: {
          x1: '12',
          y1: '16',
          x2: '12.01',
          y2: '16',
        },
      },
    ],
  },
};
