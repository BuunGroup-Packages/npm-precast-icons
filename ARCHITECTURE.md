# Precast Icons Architecture

## Optimized for Scale

This icon library is designed to handle **thousands of icons** efficiently:

### 🎯 Key Optimizations

1. **Individual Icon Files**
   - Each icon is in its own file (`src/icons/generated/home.ts`)
   - Only imported icons are bundled (perfect tree-shaking)
   - No giant single file with 5000+ icons

2. **Automatic Generation**
   - SVG files → TypeScript automatically on build
   - `npm run build` runs icon generation first
   - Zero manual copying of path data

3. **Lazy Loading Support**
   - Dynamic imports for runtime loading
   - `iconMap` for lazy-loaded icons
   - Perfect for icon pickers or dynamic UIs

## File Structure

```
src/icons/
├── svg/                 # Your SVG files (source of truth)
│   ├── home.svg
│   ├── search.svg
│   └── ... (can be thousands)
└── generated/          # Auto-generated TypeScript
    ├── index.ts        # Exports and lazy map
    ├── home.ts         # Individual icon file
    ├── search.ts       # Individual icon file
    └── ... (one per SVG)
```

## How It Scales

### With 10 Icons

- Bundle includes only used icons
- ~2KB per icon (uncompressed)
- Fast builds

### With 1000 Icons

- Still only bundles what you import
- Generation takes ~2 seconds
- Each icon is separate module

### With 5000+ Icons

- Generation takes ~10 seconds
- Build only compiles imported icons
- Zero impact on bundle size if unused

## Usage Patterns

### Static Imports (Best Performance)

```tsx
import { HomeIcon } from 'precast-icons/react';
// Only bundles the home icon
```

### Dynamic Imports (For Icon Pickers)

```tsx
import { iconMap } from 'precast-icons/icons';

const loadIcon = async (name: string) => {
  const loader = iconMap[name];
  if (loader) {
    const icon = await loader();
    return icon;
  }
};
```

### All Icons List

```tsx
import { iconNames } from 'precast-icons/icons';
// Just the names array, not the icons themselves
```

## Build Process

```bash
npm run build
```

This automatically:

1. Runs `generate-icons` script
2. Parses all SVG files
3. Creates individual TypeScript files
4. Builds only what's imported

## Adding Icons at Scale

### Add 100 icons:

```bash
cp ~/my-icons/*.svg src/icons/svg/
npm run build
```

### Add 1000 icons:

```bash
rsync -av ~/huge-icon-set/*.svg src/icons/svg/
npm run build
```

The system handles it automatically!

## Performance Benefits

1. **Bundle Size**: Only pay for what you use
2. **Build Time**: Parallel processing of icons
3. **Type Safety**: Full TypeScript support
4. **Code Splitting**: Each icon can be lazy-loaded
5. **Cache Friendly**: Individual files cache better

## Why This Architecture?

Traditional icon libraries often:

- Bundle all icons together (huge files)
- Require manual icon definition updates
- Don't scale well beyond 100-200 icons

Precast Icons:

- **Scales to thousands** of icons
- **Automatic** generation from SVGs
- **Optimal** bundle sizes
- **Developer friendly** with full types

This architecture ensures your icon library can grow from 10 to 10,000 icons without performance degradation!
