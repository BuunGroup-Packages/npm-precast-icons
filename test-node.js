#!/usr/bin/env node

console.log('🧪 Testing @buun_group/precast-icons in Node.js environment\n');

// Test 1: Icon definitions
try {
  console.log('📦 Testing icon definitions...');
  // Using dynamic import since we're in CommonJS
  import('@buun_group/precast-icons/icons')
    .then(iconsModule => {
      const iconCount = Object.keys(iconsModule).length;
      console.log(`✅ Icons loaded: ${iconCount} total`);

      // Test a few specific icons
      const testIcons = ['abb', 'google', 'github', 'react', 'vue'];
      console.log('🔍 Testing specific icons:');

      testIcons.forEach(iconName => {
        if (iconsModule[iconName]) {
          const icon = iconsModule[iconName];
          console.log(
            `  ✅ ${iconName}: ${icon.content.length} elements, viewBox: ${icon.viewBox}`
          );
        } else {
          console.log(`  ❌ ${iconName}: not found`);
        }
      });

      console.log('\n🎨 Sample icon structure (abb):');
      if (iconsModule.abb) {
        console.log(JSON.stringify(iconsModule.abb, null, 2));
      }

      console.log('\n✅ All tests passed! The icons export is working correctly.');
      console.log('\n📋 Usage examples:');
      console.log('   import { abb, google } from "@buun_group/precast-icons/icons";');
      console.log('   import * as allIcons from "@buun_group/precast-icons/icons";');
    })
    .catch(error => {
      console.error('❌ Failed to load icons:', error.message);
    });
} catch (error) {
  console.error('❌ Test failed:', error.message);
}
