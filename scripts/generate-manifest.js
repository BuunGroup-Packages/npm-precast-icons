/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../src/icons/generated');
const MANIFEST_FILE = path.join(__dirname, '../dist/manifest.json');
const SCHEMA_FILE = path.join(__dirname, '../dist/schema.json');

function toCamelCase(str) {
  str = str
    .replace(/[^a-zA-Z0-9\-_\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .toLowerCase();

  if (/^\d/.test(str)) {
    str = 'icon' + str.charAt(0).toUpperCase() + str.slice(1);
  }

  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function generateManifest() {
  const iconFiles = fs
    .readdirSync(ICONS_DIR)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts');

  const icons = [];
  const categories = {
    brands: [],
    tech: [],
    social: [],
    ai: [],
    development: [],
    cloud: [],
    general: [],
  };

  const brandKeywords = [
    'google',
    'microsoft',
    'apple',
    'amazon',
    'meta',
    'netflix',
    'adobe',
    'oracle',
    'ibm',
    'intel',
    'nvidia',
    'salesforce',
  ];
  const techKeywords = [
    'react',
    'vue',
    'angular',
    'node',
    'python',
    'java',
    'javascript',
    'typescript',
    'html',
    'css',
    'docker',
    'kubernetes',
  ];
  const socialKeywords = [
    'twitter',
    'facebook',
    'instagram',
    'linkedin',
    'youtube',
    'tiktok',
    'snapchat',
    'discord',
    'telegram',
    'whatsapp',
  ];
  const aiKeywords = [
    'openai',
    'anthropic',
    'claude',
    'chatgpt',
    'huggingface',
    'replicate',
    'ollama',
    'langchain',
    'deepmind',
    'perplexity',
    'coze',
  ];
  const developmentKeywords = [
    'github',
    'gitlab',
    'bitbucket',
    'vscode',
    'jetbrains',
    'figma',
    'notion',
    'slack',
    'linear',
    'jira',
  ];
  const cloudKeywords = [
    'aws',
    'azure',
    'gcp',
    'cloudflare',
    'vercel',
    'netlify',
    'railway',
    'heroku',
    'digitalocean',
    'linode',
  ];

  for (const file of iconFiles) {
    const name = path.basename(file, '.ts');
    const camelName = name;
    const pascalName = toPascalCase(name);

    const iconData = {
      name: camelName,
      pascalName: pascalName,
      filename: file,
      importName: `${pascalName}Icon`,
      imports: {
        react: `import { ${pascalName}Icon } from '@precast/icons/react';`,
        vue: `import { ${pascalName}Icon } from '@precast/icons/vue';`,
        svelte: `import { ${pascalName}Icon } from '@precast/icons/svelte';`,
        definition: `import { ${camelName} } from '@precast/icons/icons';`,
      },
      usage: {
        react: {
          basic: `<${pascalName}Icon />`,
          withProps: `<${pascalName}Icon size={24} color="currentColor" />`,
          monochrome: `<${pascalName}Icon mono color="#3b82f6" size={32} />`,
        },
        vue: {
          basic: `<${pascalName}Icon />`,
          withProps: `<${pascalName}Icon :size="24" color="currentColor" />`,
          monochrome: `<${pascalName}Icon :mono="true" color="#3b82f6" :size="32" />`,
        },
        svelte: {
          basic: `<${pascalName}Icon />`,
          withProps: `<${pascalName}Icon size={24} color="currentColor" />`,
          monochrome: `<${pascalName}Icon mono color="#3b82f6" size={32} />`,
        },
      },
      category: 'general',
    };

    // Categorize icons
    const lowerName = name.toLowerCase();
    if (brandKeywords.some(keyword => lowerName.includes(keyword))) {
      iconData.category = 'brands';
      categories.brands.push(iconData);
    } else if (aiKeywords.some(keyword => lowerName.includes(keyword))) {
      iconData.category = 'ai';
      categories.ai.push(iconData);
    } else if (techKeywords.some(keyword => lowerName.includes(keyword))) {
      iconData.category = 'tech';
      categories.tech.push(iconData);
    } else if (socialKeywords.some(keyword => lowerName.includes(keyword))) {
      iconData.category = 'social';
      categories.social.push(iconData);
    } else if (developmentKeywords.some(keyword => lowerName.includes(keyword))) {
      iconData.category = 'development';
      categories.development.push(iconData);
    } else if (cloudKeywords.some(keyword => lowerName.includes(keyword))) {
      iconData.category = 'cloud';
      categories.cloud.push(iconData);
    } else {
      categories.general.push(iconData);
    }

    icons.push(iconData);
  }

  const manifest = {
    name: '@precast/icons',
    version: '1.0.0',
    description: 'A modern, minimal SVG icon library for React, Vue, Svelte and more',
    totalIcons: icons.length,
    generatedAt: new Date().toISOString(),
    disclaimer:
      'If any companies want their icons removed, please reach out to support@buungroup.com',
    features: [
      '4000+ icons',
      'Multiple framework support (React, Vue, Svelte)',
      'TypeScript support',
      'Tree-shakeable',
      'Customizable (size, color, stroke)',
      'Monochrome mode support',
    ],
    installation: {
      npm: 'npm install @precast/icons',
      yarn: 'yarn add @precast/icons',
      pnpm: 'pnpm add @precast/icons',
    },
    imports: {
      react: {
        description: 'Import React icon components',
        example: "import { HomeIcon, SearchIcon } from '@precast/icons/react';",
      },
      vue: {
        description: 'Import Vue icon components',
        example: "import { HomeIcon, SearchIcon } from '@precast/icons/vue';",
      },
      svelte: {
        description: 'Import Svelte icon components',
        example: "import { HomeIcon, SearchIcon } from '@precast/icons/svelte';",
      },
      icons: {
        description: 'Import raw icon definitions',
        example: "import { home, search } from '@precast/icons/icons';",
      },
    },
    props: {
      size: {
        type: 'number | string',
        default: 24,
        description: 'Icon size in pixels or CSS units',
      },
      color: {
        type: 'string',
        default: 'currentColor',
        description: 'Icon color',
      },
      strokeWidth: {
        type: 'number | string',
        default: 2,
        description: 'Stroke width for line icons',
      },
      mono: {
        type: 'boolean',
        default: false,
        description: 'Enable monochrome mode (uses fill instead of stroke)',
      },
      className: {
        type: 'string',
        description: 'CSS class name',
      },
      style: {
        type: 'React.CSSProperties',
        description: 'Inline styles',
      },
    },
    categories: Object.keys(categories).map(key => ({
      name: key,
      count: categories[key].length,
      icons: categories[key].map(icon => icon.name),
    })),
    icons: icons,
  };

  // Ensure dist directory exists
  const distDir = path.dirname(MANIFEST_FILE);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

  // Generate JSON Schema for AI tools
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: '@precast/icons AI Schema',
    description: 'JSON Schema for AI tools to understand @precast/icons package usage',
    type: 'object',
    properties: {
      package: {
        type: 'object',
        properties: {
          name: { const: '@precast/icons' },
          description: {
            const: 'A modern, minimal SVG icon library for React, Vue, Svelte and more',
          },
          totalIcons: { type: 'number', const: icons.length },
          disclaimer: {
            const:
              'If any companies want their icons removed, please reach out to support@buungroup.com',
          },
        },
      },
      usage: {
        type: 'object',
        properties: {
          installation: {
            type: 'object',
            properties: {
              npm: { const: 'npm install @precast/icons' },
              yarn: { const: 'yarn add @precast/icons' },
              pnpm: { const: 'pnpm add @precast/icons' },
            },
          },
          frameworks: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['react', 'vue', 'svelte'],
            },
          },
          importPatterns: {
            type: 'object',
            properties: {
              react: { const: "import { IconNameIcon } from '@precast/icons/react';" },
              vue: { const: "import { IconNameIcon } from '@precast/icons/vue';" },
              svelte: { const: "import { IconNameIcon } from '@precast/icons/svelte';" },
            },
          },
        },
      },
      availableIcons: {
        type: 'array',
        items: {
          type: 'string',
          enum: icons.map(icon => icon.name),
        },
      },
      iconCategories: {
        type: 'object',
        properties: Object.fromEntries(
          Object.keys(categories).map(key => [
            key,
            {
              type: 'array',
              items: {
                type: 'string',
                enum: categories[key].map(icon => icon.name),
              },
            },
          ])
        ),
      },
    },
  };

  fs.writeFileSync(SCHEMA_FILE, JSON.stringify(schema, null, 2));

  console.log(`✅ Generated manifest with ${icons.length} icons`);
  console.log(`📄 Manifest saved to: ${MANIFEST_FILE}`);
  console.log(`📄 Schema saved to: ${SCHEMA_FILE}`);
  console.log(`\n📊 Icon categories:`);
  Object.keys(categories).forEach(key => {
    console.log(`  - ${key}: ${categories[key].length} icons`);
  });
}

generateManifest();
