# Quick Start Guide

## Installation

```bash
npm install @precast/icons
# or
yarn add @precast/icons
# or
pnpm add @precast/icons
```

## Basic Usage

### React

```jsx
import { HomeIcon, SearchIcon, HeartIcon } from '@precast/icons/react';

function App() {
  return (
    <div>
      <HomeIcon size={24} color="blue" />
      <SearchIcon size={32} strokeWidth={1.5} />
      <HeartIcon size={24} fill="red" stroke="none" />
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <HomeIcon :size="24" color="blue" />
    <SearchIcon :size="32" :stroke-width="1.5" />
    <HeartIcon :size="24" fill="red" stroke="none" />
  </div>
</template>

<script setup>
import { HomeIcon, SearchIcon, HeartIcon } from '@precast/icons/vue';
</script>
```

### Svelte

```svelte
<script>
  import { HomeIcon, SearchIcon, HeartIcon } from '@precast/icons/svelte';
</script>

<HomeIcon size={24} color="blue" />
<SearchIcon size={32} strokeWidth={1.5} />
<HeartIcon size={24} fill="red" stroke="none" />
```

### Vanilla JavaScript

```javascript
import { icons } from '@precast/icons';

function renderIcon(iconName, options = {}) {
  const icon = icons[iconName];
  const { size = 24, color = 'currentColor' } = options;

  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', icon.viewBox || '0 0 24 24');
  svg.setAttribute('stroke', color);

  // Add icon paths
  icon.content.forEach(node => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', node.tag);
    Object.entries(node.attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    svg.appendChild(element);
  });

  return svg;
}

// Usage
document
  .getElementById('icon-container')
  .appendChild(renderIcon('home', { size: 32, color: '#3b82f6' }));
```

## Dynamic Icon Loading

### React with Lazy Loading

```jsx
import { lazy, Suspense } from 'react';
import { iconMap } from '@precast/icons/react';

function DynamicIcon({ name, ...props }) {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    iconMap[name]?.().then(module => {
      setIcon(() => module.default);
    });
  }, [name]);

  return Icon ? <Icon {...props} /> : <div>Loading...</div>;
}
```

### Vue with Dynamic Components

```vue
<template>
  <component :is="currentIcon" v-bind="iconProps" />
</template>

<script setup>
import { computed } from 'vue';
import { HomeIcon, SearchIcon, UserIcon } from '@precast/icons/vue';

const props = defineProps({
  name: String,
  size: { type: Number, default: 24 },
  color: { type: String, default: 'currentColor' },
});

const icons = {
  home: HomeIcon,
  search: SearchIcon,
  user: UserIcon,
};

const currentIcon = computed(() => icons[props.name]);
const iconProps = computed(() => ({
  size: props.size,
  color: props.color,
}));
</script>
```

## Development Setup

### Adding Icons to the Library

1. Place SVG files in the `assets/` directory:

```bash
cp ~/Downloads/new-icon.svg assets/new-icon.svg
```

2. Generate icon components:

```bash
npm run generate-icons
```

3. Build the library:

```bash
npm run build
```

The build process automatically:

- Parses SVG files
- Generates TypeScript definitions
- Creates framework-specific components
- Optimizes for tree-shaking

## Icon Properties

All icon components accept the following properties:

| Property      | Type               | Default          | Description                        |
| ------------- | ------------------ | ---------------- | ---------------------------------- |
| `size`        | `number \| string` | `24`             | Icon dimensions (width and height) |
| `color`       | `string`           | `'currentColor'` | Primary icon color                 |
| `strokeWidth` | `number \| string` | `2`              | Width of icon strokes              |
| `fill`        | `string`           | `'none'`         | Fill color for shapes              |
| `stroke`      | `string`           | `'currentColor'` | Stroke color override              |
| `className`   | `string`           | `''`             | CSS class names                    |
| `style`       | `object`           | `{}`             | Inline style object                |

## TypeScript Support

The library includes comprehensive TypeScript definitions:

```typescript
import type { IconProps, IconDefinition } from '@precast/icons';
import { HomeIcon } from '@precast/icons/react';

// Type-safe props
const MyIcon: React.FC<IconProps> = (props) => {
  return <HomeIcon {...props} />;
};

// Custom icon creation
const customIcon: IconDefinition = {
  name: 'custom',
  viewBox: '0 0 24 24',
  content: [
    {
      tag: 'path',
      attrs: { d: 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12' }
    }
  ]
};
```

## Performance Optimization

### Tree-Shaking

Only imported icons are included in your bundle:

```javascript
// Good - only imports what you need
import { HomeIcon, SearchIcon } from '@precast/icons/react';

// Avoid - imports entire icon set
import * as icons from '@precast/icons/react';
```

### Lazy Loading

Load icons on demand to reduce initial bundle size:

```javascript
const loadIcon = async name => {
  const module = await import(`@precast/icons/react/${name}`);
  return module.default;
};
```

## Styling Icons

### CSS Classes

```css
.custom-icon {
  color: #3b82f6;
  transition: transform 0.2s;
}

.custom-icon:hover {
  transform: scale(1.1);
}
```

### Inline Styles

```jsx
<HomeIcon
  style={{
    color: '#3b82f6',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
    cursor: 'pointer',
  }}
/>
```

## Common Patterns

### Icon Button

```jsx
function IconButton({ icon: Icon, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
      }}
    >
      <Icon size={20} {...props} />
    </button>
  );
}
```

### Loading State

```jsx
function LoadingIcon() {
  return (
    <div className="animate-spin">
      <RefreshIcon size={24} />
    </div>
  );
}
```

## Troubleshooting

### Icons Not Displaying

1. Ensure the package is properly installed
2. Check import paths match your framework
3. Verify icon names are correctly exported

### TypeScript Errors

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### Bundle Size Issues

Use dynamic imports for large icon sets:

```javascript
const icons = {
  home: () => import('@precast/icons/react/home'),
  search: () => import('@precast/icons/react/search'),
};
```
