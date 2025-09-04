#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load simple-icons data
const simpleIconsPath = path.join(__dirname, '../simple-icons/data/simple-icons.json');
const simpleIconsData = JSON.parse(fs.readFileSync(simpleIconsPath, 'utf8'));

// Create a mapping of normalized names to hex colors
const brandColors = {};
simpleIconsData.forEach(icon => {
  if (icon.hex) {
    // Store with multiple name variations
    const title = icon.title.toLowerCase();
    const normalized = title.replace(/[\s\-\.]/g, '');
    const withoutDot = title.replace(/\./g, 'dot');

    brandColors[normalized] = icon.hex;
    brandColors[title] = icon.hex;
    brandColors[withoutDot] = icon.hex;

    // Special cases for common variations
    if (title.includes(' ')) {
      brandColors[title.replace(/\s/g, '')] = icon.hex;
    }
  }
});

// Get all icon files
const iconsDir = path.join(__dirname, '../src/icons/generated');
const iconFiles = fs.readdirSync(iconsDir).filter(f => f.endsWith('.ts'));

// Create a color mapping for our icons
const iconColorMap = {};
let matchedCount = 0;
let unmatchedIcons = [];

iconFiles.forEach(file => {
  const iconName = file.replace('.ts', '');
  const normalized = iconName.toLowerCase().replace(/[\-_]/g, '');

  // Try different matching strategies
  let color = null;

  // Direct match
  if (brandColors[normalized]) {
    color = brandColors[normalized];
  }
  // Try with 'dot' replaced
  else if (brandColors[iconName.toLowerCase()]) {
    color = brandColors[iconName.toLowerCase()];
  }
  // Try specific mappings for common variations
  else {
    // Handle special cases
    const specialMappings = {
      aboutdotme: 'about.me',
      dotnet: '.net',
      dotenv: '.env',
      githubactions: 'github actions',
      githubcopilot: 'github copilot',
      githubpages: 'github pages',
      githubsponsors: 'github sponsors',
      googlechrome: 'google chrome',
      googledrive: 'google drive',
      googlecloud: 'google cloud',
      googleplay: 'google play',
      visualstudiocode: 'visual studio code',
      visualstudio: 'visual studio',
      x: 'x', // Twitter/X
      whatsapp: 'whatsapp',
      youtube: 'youtube',
      youtubemusic: 'youtube music',
      youtubetv: 'youtube tv',
      youtubegaming: 'youtube gaming',
      youtubeshorts: 'youtube shorts',
      youtubevr: 'youtube vr',
      youtubevanced: 'youtube vanced',
    };

    if (specialMappings[normalized] && brandColors[specialMappings[normalized]]) {
      color = brandColors[specialMappings[normalized]];
    }
  }

  if (color) {
    iconColorMap[iconName] = color;
    matchedCount++;
  } else {
    unmatchedIcons.push(iconName);
  }
});

// Output results
console.log(`\n=== Brand Color Mapping Results ===`);
console.log(`Total icons: ${iconFiles.length}`);
console.log(`Matched with brand colors: ${matchedCount}`);
console.log(`Unmatched: ${unmatchedIcons.length}`);

// Save the color map to a TypeScript file
const outputPath = path.join(__dirname, '../src/core/brand-colors.ts');
const tsContent = `/**
 * Brand colors from Simple Icons
 * Auto-generated - do not edit directly
 * Generated on: ${new Date().toISOString()}
 */

export const BRAND_COLORS: Record<string, string> = ${JSON.stringify(iconColorMap, null, 2)};

/**
 * Get brand color for an icon
 */
export function getBrandColor(iconName: string): string | undefined {
  return BRAND_COLORS[iconName];
}

/**
 * Icons without brand colors
 */
export const UNMATCHED_ICONS = ${JSON.stringify(unmatchedIcons, null, 2)};
`;

fs.writeFileSync(outputPath, tsContent);
console.log(`\n✅ Brand colors saved to: ${outputPath}`);

// Show sample of matched colors
console.log('\n=== Sample Matched Brand Colors ===');
const samples = Object.entries(iconColorMap).slice(0, 20);
samples.forEach(([icon, color]) => {
  console.log(`${icon}: #${color}`);
});

// Show unmatched icons (first 20)
if (unmatchedIcons.length > 0) {
  console.log('\n=== Sample Unmatched Icons ===');
  unmatchedIcons.slice(0, 20).forEach(icon => {
    console.log(`- ${icon}`);
  });
}
