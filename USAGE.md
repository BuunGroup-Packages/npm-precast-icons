# How Precast Icons Works

## Icon System Architecture

Precast Icons uses actual SVG files as the source of truth for icons. Here's how it works:

### 1. SVG Files Location

All icon SVG files are stored in `src/icons/svg/`. Each file is a standard SVG with:

- 24x24 viewBox
- `currentColor` for stroke (inherits from CSS color)
- No fill by default
- 2px stroke width

Example SVG file (`src/icons/svg/home.svg`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>
</svg>
```

### 2. Icon Generation Process

Run the build script to convert SVG files into TypeScript/JavaScript components:

```bash
node scripts/build-icons.js
```

This script:

1. Reads all `.svg` files from `src/icons/svg/`
2. Parses the SVG structure
3. Generates `src/icons/generated.ts` with icon definitions
4. Creates typed exports for each framework

### 3. Adding New Icons

To add a new icon:

1. **Add the SVG file** to `src/icons/svg/`:

```bash
# Example: Add a "bell" icon
echo '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
</svg>' > src/icons/svg/bell.svg
```

2. **Run the build script**:

```bash
node scripts/build-icons.js
```

3. **Update React exports** in `src/react/icons.ts`:

```typescript
export const BellIcon = createIcon(icons.bell);
```

4. **Build the package**:

```bash
npm run build
```

### 4. Using Icons in Your Project

#### React

```jsx
import { HomeIcon, SearchIcon } from 'precast-icons/react';

function App() {
  return (
    <div>
      {/* Basic usage */}
      <HomeIcon />

      {/* With props */}
      <SearchIcon size={32} color="blue" strokeWidth={1.5} />

      {/* With custom styling */}
      <HomeIcon className="icon-home" style={{ transform: 'rotate(45deg)' }} />
    </div>
  );
}
```

#### Vue

```vue
<template>
  <div>
    <HomeIcon :size="24" color="red" />
    <SearchIcon :stroke-width="1.5" />
  </div>
</template>

<script setup>
import { HomeIcon, SearchIcon } from 'precast-icons/vue';
</script>
```

#### Dynamic Icon Loading

If you need to load icons dynamically:

```jsx
import { Icon } from 'precast-icons/react';
import { icons } from 'precast-icons/icons';

function DynamicIcon({ name }) {
  const icon = icons[name];
  if (!icon) return null;

  return <Icon icon={icon} size={24} />;
}

// Usage
<DynamicIcon name="home" />
<DynamicIcon name="search" />
```

### 5. Customization

All icons accept these props:

- `size` - Icon size (number or string)
- `color` - CSS color value
- `strokeWidth` - Stroke width
- `fill` - Fill color (default: 'none')
- `stroke` - Stroke color (default: 'currentColor')
- `className` - CSS class
- `style` - Inline styles

### 6. File Structure

```
precast-icons/
├── src/
│   ├── icons/
│   │   ├── svg/           # Source SVG files
│   │   │   ├── home.svg
│   │   │   ├── search.svg
│   │   │   └── ...
│   │   ├── generated.ts   # Auto-generated from SVGs
│   │   └── definitions.ts # Manual definitions (optional)
│   ├── react/
│   │   ├── createIcon.tsx
│   │   ├── Icon.tsx
│   │   └── icons.ts       # React icon exports
│   ├── vue/
│   │   └── ...
│   └── svelte/
│       └── ...
├── scripts/
│   └── build-icons.js     # SVG to TS converter
└── package.json
```

### 7. Benefits of This Approach

1. **Source of Truth**: SVG files are the single source of truth
2. **Easy Updates**: Just drop in new SVG files and rebuild
3. **Type Safety**: Full TypeScript support
4. **Tree Shaking**: Only import the icons you use
5. **Framework Agnostic**: Same icons work in React, Vue, Svelte
6. **Customizable**: All visual properties can be modified via props
7. **Performance**: Icons are bundled as JavaScript, no runtime SVG loading

### 8. Development Workflow

1. Add/modify SVG files in `src/icons/svg/`
2. Run `node scripts/build-icons.js`
3. Update framework-specific exports if needed
4. Run `npm run build`
5. Test your changes
6. Publish to npm

This system ensures your icons are always in sync with the source SVG files while providing excellent developer experience and performance!
