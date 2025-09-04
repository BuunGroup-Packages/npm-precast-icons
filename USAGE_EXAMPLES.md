# Icon Usage Examples - Implementation Summary

## What's Been Added

### 1. Real SVG Path Data in Examples

- The SVG and HTML usage examples now show the **actual path data** from the icon instead of just a comment placeholder
- Path data is dynamically loaded from the icon definitions
- Includes all path attributes (d, fill, stroke, stroke-width) when present

### 2. New HTML Tab for Usage Examples

The icon detail page now includes 5 frameworks:

- React
- Vue
- Svelte
- SVG (raw SVG code with actual paths)
- **HTML** (new - with CDN and inline options)

### 3. HTML Usage Examples

Two methods are shown for using icons in plain HTML:

#### Method 1: CDN Image Tag

```html
<img
  src="https://unpkg.com/@buun_group/precast-icons@latest/dist/icons/github.svg"
  width="24"
  height="24"
  alt="github icon"
/>
```

#### Method 2: Inline SVG

```html
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49..." />
</svg>
```

## How It Works

1. **Path Extraction**: When an icon page loads, the component:
   - Imports the icon module from the CDN
   - Extracts the SVG content from the icon definition
   - Formats the path elements with proper attributes
   - Stores the paths in state for use in examples

2. **Dynamic Updates**: The path data updates when:
   - User selects a different icon variant
   - User navigates to a different icon
   - Size or color settings change

3. **Fallback Handling**: If path extraction fails:
   - Shows `<!-- Icon path data -->` comment as fallback
   - Logs error to console for debugging
   - Still renders the icon using the React component

## Files Modified

- `/packages/website/src/pages/IconPage.tsx`:
  - Added `svgPaths` state to store extracted path data
  - Added `useEffect` to load paths when icon changes
  - Updated `usageExamples` to include HTML examples
  - Modified SVG examples to use actual path data

- `/packages/website/src/contexts/FrameworkContextDef.ts`:
  - Added 'html' to Framework type definition

## Testing

Created `/test-svg-extraction.html` to verify path extraction works correctly with the CDN module.

## Benefits

1. **Developer Friendly**: Developers can copy the exact SVG code they need
2. **Transparency**: Shows the actual icon structure, not just placeholders
3. **Flexibility**: Provides multiple ways to use icons (npm package, CDN, inline)
4. **Educational**: Helps developers understand the SVG structure

## Live on Website

These changes are now active on the website. When users visit any icon detail page, they will see:

- Real SVG path data in the SVG tab
- New HTML tab with CDN and inline examples
- Path data that updates based on selected variant
