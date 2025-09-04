import React from 'react';
import { getBrandColor } from '../data/brand-colors';

export interface IconVariant {
  name: string;
  component: React.ComponentType<{ size?: number | string; color?: string; className?: string }>;
  type: string; // 'default', 'color', 'text', etc.
}

export interface IconInfo {
  name: string;
  component: React.ComponentType<{ size?: number | string; color?: string; className?: string }>;
  slug: string;
  category: string;
  hasColor: boolean;
  hasText: boolean;
  variants?: IconVariant[];
  baseIconName?: string; // For variant detection
  brandColor?: string; // Brand color if available
  id?: string; // Unique identifier
}

let iconsCache: IconInfo[] | null = null;

interface IconDefinition {
  content?: unknown[];
  viewBox?: string;
  name?: string;
}

interface IconNode {
  tag?: string;
  attrs?: Record<string, unknown>;
  children?: string | IconNode[];
}

// SVG renderer with robust error handling (from icon-browser.html)
function renderSVG(iconDef: IconDefinition, size = 32) {
  try {
    if (!iconDef || !iconDef.content || !Array.isArray(iconDef.content)) {
      return {
        svg: `<div style="width: ${size}px; height: ${size}px; background: #f0f0f0; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #999;">?</div>`,
        status: 'error',
      };
    }

    const renderNode = (node: IconNode): string => {
      try {
        if (!node || typeof node !== 'object' || !node.tag) return '';

        // Skip non-visual elements
        if (node.tag === 'title' || node.tag === 'desc' || node.tag === 'metadata') {
          return '';
        }

        const attrs = node.attrs
          ? Object.entries(node.attrs)
              .filter(([, v]) => v !== undefined && v !== null)
              .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
              .join(' ')
          : '';

        if (node.children) {
          if (typeof node.children === 'string') {
            // Handle text content
            return `<${node.tag} ${attrs}>${node.children}</${node.tag}>`;
          } else if (Array.isArray(node.children) && node.children.length > 0) {
            // Handle child elements
            const children = node.children.map(renderNode).filter(Boolean).join('');
            return `<${node.tag} ${attrs}>${children}</${node.tag}>`;
          }
        }

        return `<${node.tag} ${attrs} />`;
      } catch (e) {
        console.warn(`Error rendering node:`, node, e);
        return '';
      }
    };

    const content = iconDef.content
      .map(node => renderNode(node as IconNode))
      .filter(Boolean)
      .join('');

    if (!content.trim()) {
      return {
        svg: `<div style="width: ${size}px; height: ${size}px; background: #fed7e2; border: 1px dashed #fbb6ce; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #97266d;">Empty</div>`,
        status: 'empty',
      };
    }

    const svgAttrs = Object.entries({
      width: size,
      height: size,
      viewBox: iconDef.viewBox || '0 0 24 24',
      fill: 'currentColor',
      stroke: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    })
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ');

    return {
      svg: `<svg ${svgAttrs}>${content}</svg>`,
      status: 'working',
    };
  } catch (e) {
    console.warn(`Error rendering icon ${iconDef?.name}:`, e, iconDef);
    return {
      svg: `<div style="width: ${size}px; height: ${size}px; background: #fed7d7; border: 1px solid #feb2b2; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #c53030;">Error</div>`,
      status: 'error',
    };
  }
}

function getBaseIconName(name: string): string {
  // Remove common suffixes to get base icon name
  return name
    .toLowerCase()
    .replace(/color$/i, '')
    .replace(/text$/i, '')
    .replace(/line$/i, '')
    .replace(/fill$/i, '')
    .replace(/outline$/i, '')
    .replace(/solid$/i, '');
}

function getVariantType(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith('color')) return 'color';
  if (lower.endsWith('text')) return 'text';
  if (lower.endsWith('line')) return 'line';
  if (lower.endsWith('fill')) return 'fill';
  if (lower.endsWith('outline')) return 'outline';
  if (lower.endsWith('solid')) return 'solid';
  return 'default';
}

export async function getAllIcons(): Promise<IconInfo[]> {
  if (iconsCache) {
    return iconsCache;
  }

  try {
    // Import the icon definitions from CDN like in icon-browser.html
    const iconsModule = await import(
      'https://unpkg.com/@buun_group/precast-icons@1.0.0/dist/icons/index.mjs'
    );

    // Get all icons from the package
    const iconEntries = Object.keys(iconsModule);

    console.log(`Found ${iconEntries.length} icons in package`);

    // Group icons by base name
    const iconGroups: Map<string, string[]> = new Map();

    iconEntries.forEach(name => {
      const baseName = getBaseIconName(name);
      if (!iconGroups.has(baseName)) {
        iconGroups.set(baseName, []);
      }
      iconGroups.get(baseName)!.push(name);
    });

    const iconList: IconInfo[] = [];
    const processedIcons = new Set<string>();
    let iconIdCounter = 0;

    iconGroups.forEach((variants, baseName) => {
      if (variants.length > 1) {
        // This is a group with variants
        const mainIconName = variants.find(v => getVariantType(v) === 'default') || variants[0];

        if (!processedIcons.has(mainIconName)) {
          const slug = mainIconName
            .toLowerCase()
            .replace(/([A-Z])/g, '-$1')
            .replace(/^-/, '');
          const category = categorizeIcon(mainIconName);

          // Create components for all variants
          const variantComponents: IconVariant[] = variants.map(variantName => ({
            name: variantName,
            type: getVariantType(variantName),
            component: ({
              size = 24,
              color = 'currentColor',
              className = '',
            }: {
              size?: number | string;
              color?: string;
              className?: string;
            }) => {
              const iconDef = (iconsModule as Record<string, IconDefinition>)[variantName];
              const svgContent = renderSVG(iconDef, Number(size));

              return (
                <div
                  className={className}
                  style={{ color, fontSize: size }}
                  dangerouslySetInnerHTML={{ __html: svgContent.svg }}
                />
              );
            },
          }));

          // Main component uses the first variant
          const mainComponent = variantComponents[0].component;

          iconList.push({
            name: mainIconName,
            component: mainComponent,
            slug,
            category,
            hasColor: variants.some(v => v.toLowerCase().includes('color')),
            hasText: variants.some(v => v.toLowerCase().includes('text')),
            variants: variantComponents,
            baseIconName: baseName,
            brandColor: getBrandColor(mainIconName),
            id: `icon-${iconIdCounter++}`,
          });

          // Mark all variants as processed
          variants.forEach(v => processedIcons.add(v));
        }
      } else {
        // Single icon without variants
        const name = variants[0];
        if (!processedIcons.has(name)) {
          const slug = name
            .toLowerCase()
            .replace(/([A-Z])/g, '-$1')
            .replace(/^-/, '');
          const category = categorizeIcon(name);
          const hasColor = name.toLowerCase().includes('color');
          const hasText = name.toLowerCase().includes('text');

          // Create a React component that renders the SVG
          const component = ({
            size = 24,
            color = 'currentColor',
            className = '',
          }: {
            size?: number | string;
            color?: string;
            className?: string;
          }) => {
            const iconDef = (iconsModule as Record<string, IconDefinition>)[name];
            const svgContent = renderSVG(iconDef, Number(size));

            return (
              <div
                className={className}
                style={{ color, fontSize: size }}
                dangerouslySetInnerHTML={{ __html: svgContent.svg }}
              />
            );
          };

          iconList.push({
            name,
            component,
            slug,
            category,
            hasColor,
            hasText,
            brandColor: getBrandColor(name),
            id: `icon-${iconIdCounter++}`,
          });

          processedIcons.add(name);
        }
      }
    });

    iconsCache = iconList;
    return iconList;
  } catch (error) {
    console.error('Failed to load icons:', error);
    return [];
  }
}

function categorizeIcon(name: string): string {
  const lowerName = name.toLowerCase();

  if (
    lowerName.includes('ai') ||
    lowerName.includes('cog') ||
    lowerName.includes('openai') ||
    lowerName.includes('anthropic')
  ) {
    return 'AI & Technology';
  }

  if (
    lowerName.includes('github') ||
    lowerName.includes('gitlab') ||
    lowerName.includes('google') ||
    lowerName.includes('microsoft') ||
    lowerName.includes('apple') ||
    lowerName.includes('meta') ||
    lowerName.includes('twitter') ||
    lowerName.includes('facebook') ||
    lowerName.includes('instagram')
  ) {
    return 'Brands & Social';
  }

  if (
    lowerName.includes('home') ||
    lowerName.includes('user') ||
    lowerName.includes('search') ||
    lowerName.includes('menu') ||
    lowerName.includes('settings') ||
    lowerName.includes('profile')
  ) {
    return 'Interface';
  }

  if (
    lowerName.includes('heart') ||
    lowerName.includes('star') ||
    lowerName.includes('like') ||
    lowerName.includes('favorite') ||
    lowerName.includes('bookmark')
  ) {
    return 'Actions';
  }

  if (
    lowerName.includes('arrow') ||
    lowerName.includes('chevron') ||
    lowerName.includes('next') ||
    lowerName.includes('prev') ||
    lowerName.includes('up') ||
    lowerName.includes('down')
  ) {
    return 'Navigation';
  }

  return 'General';
}

export function formatIconDisplayName(name: string): string {
  // First, handle known multi-word patterns and specific brand names
  const formatted = name
    // Handle specific brand patterns first (before general replacements)
    .replace(/^affinityphoto$/i, 'Affinity Photo')
    .replace(/^affinitydesigner$/i, 'Affinity Designer')
    .replace(/^affinitypublisher$/i, 'Affinity Publisher')
    .replace(/^androidstudio$/i, 'Android Studio')
    .replace(/^visualstudio$/i, 'Visual Studio')
    .replace(/^visualstudiocode$/i, 'Visual Studio Code')
    .replace(/^sublimetext$/i, 'Sublime Text')
    .replace(/^archlinux$/i, 'Arch Linux')
    .replace(/^alpinelinux$/i, 'Alpine Linux')
    .replace(/^rockylinux$/i, 'Rocky Linux')
    .replace(/^almalinux$/i, 'AlmaLinux')
    .replace(/^asahilinux$/i, 'Asahi Linux')
    .replace(/^artixlinux$/i, 'Artix Linux')
    .replace(/^endeavouros$/i, 'EndeavourOS')
    .replace(/^digitalocean$/i, 'DigitalOcean')
    .replace(/^americanexpress$/i, 'American Express')
    .replace(/^stackoverflow$/i, 'Stack Overflow')
    .replace(/^newrelic$/i, 'New Relic')
    .replace(/^redhat$/i, 'Red Hat')
    .replace(/^opensuse$/i, 'openSUSE')
    .replace(/^bigcommerce$/i, 'BigCommerce')
    .replace(/^woocommerce$/i, 'WooCommerce')
    .replace(/^jetbrainsintellijidea$/i, 'IntelliJ IDEA')
    .replace(/^pycharm$/i, 'PyCharm')
    .replace(/^webstorm$/i, 'WebStorm')
    .replace(/^phpstorm$/i, 'PhpStorm')
    .replace(/^datagrip$/i, 'DataGrip')
    .replace(/^rubymine$/i, 'RubyMine')
    .replace(/^clion$/i, 'CLion')
    .replace(/^godotengine$/i, 'Godot Engine')
    .replace(/^unrealengine$/i, 'Unreal Engine')
    .replace(/^blendermarket$/i, 'Blender Market')
    .replace(/^davinciresolve$/i, 'DaVinci Resolve')
    .replace(/^finalcutpro$/i, 'Final Cut Pro')
    .replace(/^adobeaftereeffects$/i, 'Adobe After Effects')
    .replace(/^adobepremierepro$/i, 'Adobe Premiere Pro')
    .replace(/^adobephotoshop$/i, 'Adobe Photoshop')
    .replace(/^adobeillustrator$/i, 'Adobe Illustrator')
    .replace(/^adobeindesign$/i, 'Adobe InDesign')
    .replace(/^adobelightroom$/i, 'Adobe Lightroom')
    .replace(/^adobexd$/i, 'Adobe XD')
    .replace(/^microsoftoffice$/i, 'Microsoft Office')
    .replace(/^microsoftword$/i, 'Microsoft Word')
    .replace(/^microsoftexcel$/i, 'Microsoft Excel')
    .replace(/^microsoftpowerpoint$/i, 'Microsoft PowerPoint')
    .replace(/^googledocs$/i, 'Google Docs')
    .replace(/^googlesheets$/i, 'Google Sheets')
    .replace(/^googleslides$/i, 'Google Slides')
    .replace(/^googledrive$/i, 'Google Drive')
    .replace(/^googlecloud$/i, 'Google Cloud')
    .replace(/^amazons3$/i, 'Amazon S3')
    .replace(/^amazonaws$/i, 'Amazon Web Services')
    .replace(/^microsoftazure$/i, 'Microsoft Azure')
    // Add spaces before capital letters that follow lowercase letters (for camelCase)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Handle specific patterns
    .replace(/^threeds/i, '3DS')
    .replace(/^fourdotzero/i, '4.0')
    .replace(/^oneeightoneone/i, '1811')
    .replace(/^onepassword/i, '1Password')
    .replace(/^twocaptcha/i, '2Captcha')
    .replace(/^threedotjs/i, 'Three.js')
    .replace(/^vuedotjs/i, 'Vue.js')
    .replace(/^nodedotjs/i, 'Node.js')
    .replace(/^nextdotjs/i, 'Next.js')
    .replace(/^nuxtdotjs/i, 'Nuxt.js')
    .replace(/^emberdotjs/i, 'Ember.js')
    .replace(/^alpinedotjs/i, 'Alpine.js')
    .replace(/^cytoscapedotjs/i, 'Cytoscape.js')
    .replace(/^chartdotjs/i, 'Chart.js')
    .replace(/^babylondotjs/i, 'Babylon.js')
    .replace(/^backbonedotjs/i, 'Backbone.js')
    .replace(/^docsdotrs/i, 'Docs.rs')
    .replace(/dot([A-Z])/g, '.$1')
    // Handle common abbreviations
    .replace(/Ai$/g, 'AI')
    .replace(/Api$/g, 'API')
    .replace(/Aws/g, 'AWS')
    .replace(/Gcp/g, 'GCP')
    .replace(/Ide$/g, 'IDE')
    .replace(/Ios/g, 'iOS')
    .replace(/Js$/g, 'JS')
    .replace(/Ts$/g, 'TS')
    .replace(/Css/g, 'CSS')
    .replace(/Html/g, 'HTML')
    .replace(/Xml/g, 'XML')
    .replace(/Json/g, 'JSON')
    .replace(/Yaml/g, 'YAML')
    .replace(/Sql/g, 'SQL')
    .replace(/Php/g, 'PHP')
    .replace(/Sdk/g, 'SDK')
    .replace(/Cdn/g, 'CDN')
    .replace(/Url/g, 'URL')
    .replace(/Http/g, 'HTTP')
    .replace(/Https/g, 'HTTPS')
    .replace(/Ftp/g, 'FTP')
    .replace(/Ssh/g, 'SSH')
    .replace(/Ssl/g, 'SSL')
    .replace(/Tls/g, 'TLS')
    .replace(/Vpn/g, 'VPN')
    .replace(/Dns/g, 'DNS')
    .replace(/Ip$/g, 'IP')
    .replace(/Tcp/g, 'TCP')
    .replace(/Udp/g, 'UDP')
    .replace(/Cli/g, 'CLI')
    .replace(/Gui/g, 'GUI')
    .replace(/Os$/g, 'OS')
    .replace(/Db$/g, 'DB')
    .replace(/Vm$/g, 'VM')
    .replace(/Ci$/g, 'CI')
    .replace(/Cd$/g, 'CD')
    // Handle specific company/brand names
    .replace(/Github/g, 'GitHub')
    .replace(/Gitlab/g, 'GitLab')
    .replace(/Linkedin/g, 'LinkedIn')
    .replace(/Youtube/g, 'YouTube')
    .replace(/Mongodb/g, 'MongoDB')
    .replace(/Postgresql/g, 'PostgreSQL')
    .replace(/Mysql/g, 'MySQL')
    .replace(/Javascript/g, 'JavaScript')
    .replace(/Typescript/g, 'TypeScript')
    .replace(/Webassembly/g, 'WebAssembly')
    .replace(/Tensorflow/g, 'TensorFlow')
    .replace(/Pytorch/g, 'PyTorch')
    .replace(/Opencv/g, 'OpenCV')
    .replace(/Openai/g, 'OpenAI')
    .replace(/Chatgpt/g, 'ChatGPT')
    .replace(/Wordpress/g, 'WordPress')
    .replace(/Woocommerce/g, 'WooCommerce')
    .replace(/Shopify/g, 'Shopify')
    .replace(/Bigcommerce/g, 'BigCommerce')
    .replace(/Squarespace/g, 'Squarespace')
    .replace(/Paypal/g, 'PayPal')
    .replace(/Mastercard/g, 'MasterCard')
    .replace(/Americanexpress/g, 'American Express')
    .replace(/Stackoverflow/g, 'Stack Overflow')
    .replace(/Devops/g, 'DevOps')
    .replace(/Datadog/g, 'Datadog')
    .replace(/Newrelic/g, 'New Relic')
    .replace(/Cloudflare/g, 'Cloudflare')
    .replace(/Digitalocean/g, 'DigitalOcean')
    .replace(/Redhat/g, 'Red Hat')
    .replace(/Centos/g, 'CentOS')
    .replace(/Freebsd/g, 'FreeBSD')
    .replace(/Openbsd/g, 'OpenBSD')
    .replace(/Netbsd/g, 'NetBSD')
    .replace(/Archlinux/g, 'Arch Linux')
    .replace(/Alpinelinux/g, 'Alpine Linux')
    .replace(/Rockylinux/g, 'Rocky Linux')
    .replace(/Almalinux/g, 'AlmaLinux')
    .replace(/Asahilinux/g, 'Asahi Linux')
    .replace(/Artixlinux/g, 'Artix Linux')
    .replace(/Endeavouros/g, 'EndeavourOS')
    .replace(/Popos/g, 'Pop!_OS')
    .replace(/Zorin/g, 'Zorin')
    .replace(/Manjaro/g, 'Manjaro')
    .replace(/Opensuse/g, 'openSUSE')
    .replace(/Slackware/g, 'Slackware')
    .replace(/Gentoo/g, 'Gentoo')
    .replace(/Vscode/g, 'VS Code')
    .replace(/Visualstudio/g, 'Visual Studio')
    .replace(/Intellij/g, 'IntelliJ')
    .replace(/Pycharm/g, 'PyCharm')
    .replace(/Webstorm/g, 'WebStorm')
    .replace(/Phpstorm/g, 'PhpStorm')
    .replace(/Androidstudio/g, 'Android Studio')
    .replace(/Xcode/g, 'Xcode')
    .replace(/Sublimetext/g, 'Sublime Text')
    .replace(/Notepad/g, 'Notepad')
    .replace(/Textmate/g, 'TextMate');

  // Capitalize first letter of each word
  return formatted
    .split(' ')
    .map(word => {
      // Don't capitalize if it's already all caps (like API, AWS, etc.)
      if (word === word.toUpperCase() && word.length > 1) {
        return word;
      }
      // Special cases that should remain lowercase
      if (
        [
          'js',
          'io',
          'ai',
          'tv',
          'fm',
          'am',
          'pm',
          'vs',
          'to',
          'of',
          'in',
          'on',
          'at',
          'by',
          'for',
          'and',
          'or',
          'the',
          'a',
          'an',
        ].includes(word.toLowerCase()) &&
        formatted.split(' ').indexOf(word) > 0
      ) {
        return word.toLowerCase();
      }
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .trim();
}

export async function generateSVG(
  iconInfo: IconInfo,
  size: number = 24,
  color?: string
): Promise<string> {
  try {
    // Get the icon definition from CDN
    const iconsModule = await import(
      'https://unpkg.com/@buun_group/precast-icons@1.0.0/dist/icons/index.mjs'
    );
    const iconDef = (iconsModule as Record<string, IconDefinition>)[iconInfo.name];

    if (iconDef) {
      const result = renderSVG(iconDef, size);
      // Apply color if provided
      if (color && result.svg.includes('<svg')) {
        return result.svg.replace('fill="currentColor"', `fill="${color}"`);
      }
      return result.svg;
    }

    // Fallback if icon not found
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- ${iconInfo.name} icon not found -->
    </svg>`;
  } catch (error) {
    console.error('Error generating SVG:', error);
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Error generating ${iconInfo.name} icon -->
    </svg>`;
  }
}

export function downloadSVG(iconName: string, svgContent: string) {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${iconName}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
