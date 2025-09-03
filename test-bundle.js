/**
 * Test file to verify tree-shaking with 3362 icons
 * This only imports 3 icons out of 3362
 */

import { home } from './src/icons/generated/home.js';
import { search } from './src/icons/generated/search.js';
import { star } from './src/icons/generated/star.js';

console.log('Testing with 3 icons out of 3362:');
console.log('Home icon:', home.name);
console.log('Search icon:', search.name);
console.log('Star icon:', star.name);

export { home, search, star };
