import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

const external = ['react', 'react-dom', 'vue', 'svelte'];

const plugins = [
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: false,
    declarationMap: false,
  }),
];

export default [
  // Core bundle
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        exports: 'named',
        inlineDynamicImports: true,
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
        inlineDynamicImports: true,
      },
    ],
    plugins,
    external,
  },

  // Brand colors bundle
  {
    input: 'src/core/brand-colors.ts',
    output: [
      {
        file: 'dist/brand-colors.js',
        format: 'cjs',
        exports: 'named',
      },
      {
        file: 'dist/brand-colors.mjs',
        format: 'es',
      },
    ],
    plugins,
    external,
  },

  // React bundle
  {
    input: 'src/react/index.ts',
    output: [
      {
        file: 'dist/react/index.js',
        format: 'cjs',
        exports: 'named',
      },
      {
        file: 'dist/react/index.mjs',
        format: 'es',
      },
    ],
    plugins,
    external,
  },

  // Vue bundle
  {
    input: 'src/vue/index.ts',
    output: [
      {
        file: 'dist/vue/index.js',
        format: 'cjs',
        exports: 'named',
      },
      {
        file: 'dist/vue/index.mjs',
        format: 'es',
      },
    ],
    plugins,
    external,
  },

  // Svelte bundle
  {
    input: 'src/svelte/index.ts',
    output: [
      {
        file: 'dist/svelte/index.js',
        format: 'cjs',
        exports: 'named',
        inlineDynamicImports: true,
      },
      {
        file: 'dist/svelte/index.mjs',
        format: 'es',
        inlineDynamicImports: true,
      },
    ],
    plugins,
    external,
  },

  // Icons bundle
  {
    input: 'src/icons/generated/index.ts',
    output: [
      {
        file: 'dist/icons/index.js',
        format: 'cjs',
        exports: 'named',
      },
      {
        file: 'dist/icons/index.mjs',
        format: 'es',
      },
    ],
    plugins,
    external,
  },

  // Type definitions
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: 'src/react/index.ts',
    output: [{ file: 'dist/react/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external,
  },
  {
    input: 'src/vue/index.ts',
    output: [{ file: 'dist/vue/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external,
  },
  {
    input: 'src/svelte/index.ts',
    output: [{ file: 'dist/svelte/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external,
  },
  {
    input: 'src/icons/generated/index.ts',
    output: [{ file: 'dist/icons/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
