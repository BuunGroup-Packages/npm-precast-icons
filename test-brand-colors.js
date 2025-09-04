import { getBrandColor, ALL_BRAND_COLORS } from './src/core/brand-colors.js';

// Test some major brands
const testBrands = [
  'adobe',
  'adobefirefly',
  'amazon',
  'aws',
  'google',
  'googlechrome',
  'microsoft',
  'microsoftazure',
  'github',
  'gitlab',
  'apple',
  'applepay',
  'meta',
  'facebook',
  'alibaba',
  'alibabacloud',
  'baidu',
  'bytedance',
  'twitter',
  'x',
];

console.log('=== Testing Brand Colors ===\n');
testBrands.forEach(brand => {
  const color = getBrandColor(brand);
  if (color) {
    console.log(`✅ ${brand.padEnd(20)} #${color}`);
  } else {
    console.log(`❌ ${brand.padEnd(20)} No color found`);
  }
});

// Count total colors
const totalColors = Object.keys(ALL_BRAND_COLORS).length;
console.log(`\n=== Total Brand Colors: ${totalColors} ===`);
