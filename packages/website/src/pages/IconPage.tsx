import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllIcons, downloadSVG, generateSVG, type IconInfo } from '../utils/iconUtils';
import { CodeBlock } from '../components/CodeBlock';
import { ColorPicker } from '../components/ColorPicker';
import { SEO } from '../components/SEO';
import { useFramework } from '../hooks/useFramework';
import {
  FiChevronRight,
  FiDownload,
  FiCopy,
  FiPackage,
  FiChevronDown,
  FiFile,
  FiImage,
  FiCamera,
  FiDroplet,
  FiType,
  FiCircle,
  FiSquare,
  FiEdit3,
  FiPenTool,
  FiMoreVertical,
  FiFlag,
  FiAlertCircle,
} from 'react-icons/fi';
import type { Framework } from '../contexts/FrameworkContextDef';

const frameworks = [
  { id: 'react' as Framework, name: 'React', iconName: 'react', color: '#61dafb' },
  { id: 'vue' as Framework, name: 'Vue', iconName: 'vuedotjs', color: '#4fc08d' },
  { id: 'svelte' as Framework, name: 'Svelte', iconName: 'svelte', color: '#ff3e00' },
  { id: 'svg' as Framework, name: 'SVG', iconName: 'html5', color: '#e34c26' },
  { id: 'html' as Framework, name: 'HTML', iconName: 'html5', color: '#e34c26' },
];

export function IconPage() {
  const { slug } = useParams<{ slug: string }>();
  const { selectedFramework, setSelectedFramework } = useFramework();
  const [size, setSize] = useState(48);
  const [color, setColor] = useState('#000000');
  const [useBrandColor, setUseBrandColor] = useState(true);
  const [icon, setIcon] = useState<IconInfo | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Framework>(selectedFramework);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [frameworkIcons, setFrameworkIcons] = useState<
    Record<string, React.ComponentType<{ size?: number }>>
  >({});
  const [packageIcons, setPackageIcons] = useState<
    Record<string, React.ComponentType<{ size?: number }>>
  >({});
  const [downloadFormat, setDownloadFormat] = useState<'svg' | 'png' | 'webp'>(() => {
    return (localStorage.getItem('preferredDownloadFormat') as 'svg' | 'png' | 'webp') || 'svg';
  });
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [activePackageManager, setActivePackageManager] = useState(() => {
    return localStorage.getItem('preferredPackageManager') || 'npm';
  });
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [svgPaths, setSvgPaths] = useState('  <!-- Icon path data -->');
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const reportMenuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(selectedFramework);
  }, [selectedFramework]);

  useEffect(() => {
    loadFrameworkIcons();
    loadPackageIcons();
  }, []);

  // Load SVG paths when icon or variant changes
  useEffect(() => {
    const loadSvgPaths = async () => {
      if (!icon) return;
      try {
        const iconsModule = await import(
          'https://unpkg.com/@buun_group/precast-icons@1.0.0/dist/icons/index.mjs'
        );
        // Use the variant name or fall back to the icon name
        const variantName = icon.variants?.[selectedVariant]?.name || icon.name;
        if (iconsModule[variantName]) {
          const iconDef = iconsModule[variantName];
          if (iconDef?.content) {
            const paths = iconDef.content
              .filter((node: any) => node.tag === 'path' && node.attrs?.d)
              .map((node: any) => {
                let pathAttrs = `d="${node.attrs.d}"`;
                if (node.attrs.fill && node.attrs.fill !== 'currentColor') {
                  pathAttrs += ` fill="${node.attrs.fill}"`;
                }
                if (node.attrs.stroke) {
                  pathAttrs += ` stroke="${node.attrs.stroke}"`;
                }
                if (node.attrs['stroke-width']) {
                  pathAttrs += ` stroke-width="${node.attrs['stroke-width']}"`;
                }
                return `  <path ${pathAttrs} />`;
              })
              .join('\n');
            setSvgPaths(paths || '  <!-- No paths found -->');
            return;
          }
        }
      } catch (e) {
        console.error('Could not extract SVG path:', e);
      }
      setSvgPaths('  <!-- Icon path data -->');
    };

    loadSvgPaths();
  }, [icon, selectedVariant]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFormatDropdown(false);
      }
      if (reportMenuRef.current && !reportMenuRef.current.contains(event.target as Node)) {
        setShowReportMenu(false);
      }
    }

    if (showFormatDropdown || showReportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showFormatDropdown, showReportMenu]);

  useEffect(() => {
    getAllIcons()
      .then(icons => {
        const foundIcon = icons.find(i => i.slug === slug);
        setIcon(foundIcon);
        // Set initial color to brand color if available
        if (foundIcon?.brandColor && useBrandColor) {
          setColor(`#${foundIcon.brandColor}`);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load icons:', error);
        setLoading(false);
      });
  }, [slug, useBrandColor]);

  const loadPackageIcons = async () => {
    try {
      const iconsModule = await import(
        'https://unpkg.com/@buun_group/precast-icons@1.0.0/dist/icons/index.mjs'
      );
      const packageManagers = [
        { name: 'npm', iconName: 'npm' },
        { name: 'yarn', iconName: 'yarn' },
        { name: 'pnpm', iconName: 'pnpm' },
        { name: 'bun', iconName: 'bun' },
      ];

      const icons: Record<string, React.ComponentType<{ size?: number }>> = {};

      packageManagers.forEach(pm => {
        if (iconsModule[pm.iconName]) {
          icons[pm.name] = ({ size = 16 }) => {
            const iconDef = iconsModule[pm.iconName];
            if (iconDef?.content) {
              const paths = iconDef.content
                .filter(
                  (node: { tag?: string; attrs?: { d?: string } }) =>
                    node.tag === 'path' && node.attrs?.d
                )
                .map(
                  (node: { attrs: { d: string } }) =>
                    `<path d="${node.attrs.d}" fill="currentColor"/>`
                )
                .join('');

              return (
                <div
                  style={{ width: size, height: size, display: 'inline-flex' }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor">${paths}</svg>`,
                  }}
                />
              );
            }
            return <div style={{ width: size, height: size }} />;
          };
        }
      });
      setPackageIcons(icons);
    } catch (error) {
      console.error('Failed to load package icons:', error);
    }
  };

  const loadFrameworkIcons = async () => {
    try {
      const iconsModule = await import(
        'https://unpkg.com/@buun_group/precast-icons@1.0.0/dist/icons/index.mjs'
      );
      const icons: Record<string, React.ComponentType<{ size?: number }>> = {};

      frameworks.forEach(framework => {
        if (iconsModule[framework.iconName]) {
          icons[framework.iconName] = ({ size = 16 }) => {
            const iconDef = iconsModule[framework.iconName];
            if (iconDef?.content) {
              const paths = iconDef.content
                .filter(
                  (node: { tag?: string; attrs?: { d?: string } }) =>
                    node.tag === 'path' && node.attrs?.d
                )
                .map(
                  (node: { attrs: { d: string } }) =>
                    `<path d="${node.attrs.d}" fill="currentColor"/>`
                )
                .join('');

              return (
                <div
                  style={{ width: size, height: size, display: 'inline-flex' }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor">${paths}</svg>`,
                  }}
                />
              );
            }
            return <div style={{ width: size, height: size }} />;
          };
        }
      });
      setFrameworkIcons(icons);
    } catch (error) {
      console.error('Failed to load framework icons:', error);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>Loading...</h1>
          <p>Loading icon details...</p>
        </div>
      </div>
    );
  }

  if (!icon) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>Icon not found</h1>
          <p>The icon you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant = icon.variants?.[selectedVariant] || {
    component: icon.component,
    name: icon.name,
    type: 'default',
  };
  const IconComponent = currentVariant.component;
  const displayName = icon.name.charAt(0).toUpperCase() + icon.name.slice(1);

  // Format icons
  const formatIcons = {
    svg: FiFile,
    png: FiImage,
    webp: FiCamera,
  };

  const convertSvgToImage = async (svgContent: string, format: 'png' | 'webp'): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);
          canvas.toBlob(blob => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to convert image'));
            }
            URL.revokeObjectURL(url);
          }, `image/${format}`);
        } else {
          reject(new Error('Failed to get canvas context'));
          URL.revokeObjectURL(url);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load SVG'));
        URL.revokeObjectURL(url);
      };

      img.src = url;
    });
  };

  const handleDownload = async () => {
    try {
      // Create a temporary IconInfo object with the current variant's name
      const variantIcon = { ...icon, name: currentVariant.name };
      const svgContent = await generateSVG(variantIcon, size, color);

      if (downloadFormat === 'svg') {
        downloadSVG(currentVariant.name, svgContent);
      } else {
        const blob = await convertSvgToImage(svgContent, downloadFormat);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentVariant.name}.${downloadFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Failed to download ${downloadFormat.toUpperCase()}:`, error);
    }
  };

  const handleCopyCode = (tab: string) => {
    const code = usageExamples[tab as keyof typeof usageExamples];
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleTabChange = (tab: Framework) => {
    setActiveTab(tab);
    setSelectedFramework(tab);
  };

  const usageExamples = {
    react: `import { ${icon.name} } from '@buun_group/precast-icons/react';

function MyComponent() {
  return <${icon.name} size={${size}} color="${color}" />;
}`,
    vue: `<template>
  <${icon.name} :size="${size}" color="${color}" />
</template>

<script>
import { ${icon.name} } from '@buun_group/precast-icons/vue';

export default {
  components: {
    ${icon.name}
  }
}
</script>`,
    svelte: `<script>
  import { ${icon.name} } from '@buun_group/precast-icons/svelte';
</script>

<${icon.name} size={${size}} color="${color}" />`,
    svg: `<!-- Direct SVG usage -->
<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
${svgPaths}
</svg>`,
    html: `<!-- Using JavaScript module from CDN -->
<div id="${icon.name}-icon"></div>
<script type="module">
  import { ${icon.name} } from 'https://unpkg.com/@buun_group/precast-icons@latest/dist/icons/index.mjs';
  
  function renderIcon(iconDef, size = ${size}) {
    const paths = iconDef.content
      .filter(node => node.tag === 'path')
      .map(node => \`<path d="\${node.attrs.d}" />\`)
      .join('');
    
    return \`<svg width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="${color}">\${paths}</svg>\`;
  }
  
  document.getElementById('${icon.name}-icon').innerHTML = renderIcon(${icon.name});
</script>

<!-- Or use inline SVG directly -->
<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
${svgPaths}
</svg>`,
  };

  const installCommands = {
    npm: 'npm install @buun_group/precast-icons',
    yarn: 'yarn add @buun_group/precast-icons',
    pnpm: 'pnpm add @buun_group/precast-icons',
    bun: 'bun add @buun_group/precast-icons',
  };

  const tabs = frameworks.map(f => ({
    id: f.id,
    label: f.name,
    color: f.color,
    iconName: f.iconName,
  }));

  const getLanguage = (fw: string) => {
    switch (fw) {
      case 'react':
        return 'jsx';
      case 'vue':
        return 'markup';
      case 'svelte':
        return 'jsx';
      case 'svg':
        return 'markup';
      case 'html':
        return 'markup';
      default:
        return 'javascript';
    }
  };

  return (
    <>
      <SEO
        title={displayName}
        description={`${displayName} icon from PRECAST Icons. Download as SVG, PNG, or WebP. Available for React, Vue, Svelte and more.`}
        keywords={`${icon.name}, ${displayName}, icon, svg, react icon, vue icon, ${icon.category} icon`}
      />
      <div className="icon-page">
        <div className="container">
          {/* Enhanced Breadcrumb */}
          <div className="breadcrumb-enhanced">
            <Link to="/" className="breadcrumb-link">
              <span>Icons</span>
            </Link>
            <FiChevronRight className="breadcrumb-separator" size={20} />
            <div className="breadcrumb-current">
              <IconComponent size={20} />
              <span>{displayName}</span>
            </div>
          </div>

          {/* Separator */}
          <div className="section-separator" />

          {/* Icon Header Section */}
          <div className="icon-header-section">
            <div className="icon-showcase">
              <div className="icon-preview-container">
                <IconComponent size={size} color={color} />
              </div>
            </div>

            <div className="icon-info-panel">
              <div className="icon-title-row">
                <h1 className="icon-title">{displayName}</h1>
                <div className="icon-actions" ref={reportMenuRef}>
                  <button
                    className="icon-menu-button"
                    onClick={() => setShowReportMenu(!showReportMenu)}
                    title="More options"
                  >
                    <FiMoreVertical size={20} />
                  </button>
                  {showReportMenu && (
                    <div className="report-dropdown">
                      <a
                        href={`mailto:hello@buungroup.com?subject=Icon Report: ${displayName}&body=Hi,%0D%0A%0D%0AI would like to report an issue with the ${displayName} icon.%0D%0A%0D%0AReason:%0D%0A[Please describe the issue or request removal]%0D%0A%0D%0AThank you.`}
                        className="report-option"
                        onClick={() => setShowReportMenu(false)}
                      >
                        <FiFlag size={16} />
                        <span>Report Icon</span>
                      </a>
                      <a
                        href={`mailto:hello@buungroup.com?subject=Request Removal: ${displayName}&body=Hi,%0D%0A%0D%0AI would like to request the removal of the ${displayName} icon.%0D%0A%0D%0AReason:%0D%0A[Please provide your reason for removal request]%0D%0A%0D%0AThank you.`}
                        className="report-option"
                        onClick={() => setShowReportMenu(false)}
                      >
                        <FiAlertCircle size={16} />
                        <span>Request Removal</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="icon-metadata">
                <span className="icon-category">{icon.category}</span>
                {icon.hasColor && (
                  <span className="icon-feature-badge color">
                    <span className="badge-dot" />
                    Color Support
                  </span>
                )}
                {icon.hasText && (
                  <span className="icon-feature-badge text">
                    <span className="badge-dot" />
                    Text Support
                  </span>
                )}
              </div>

              {/* Variant Switcher */}
              {icon.variants && icon.variants.length > 1 && (
                <div className="variant-switcher">
                  <label className="control-label">Variant</label>
                  <div className="variant-buttons">
                    {icon.variants.map((variant, idx) => {
                      // Select icon based on variant type
                      let VariantIcon = FiCircle;
                      if (variant.type === 'color') VariantIcon = FiDroplet;
                      else if (variant.type === 'text') VariantIcon = FiType;
                      else if (variant.type === 'line') VariantIcon = FiEdit3;
                      else if (variant.type === 'fill') VariantIcon = FiSquare;
                      else if (variant.type === 'solid') VariantIcon = FiSquare;
                      else if (variant.type === 'outline') VariantIcon = FiPenTool;

                      return (
                        <button
                          key={variant.name}
                          className={`variant-button ${selectedVariant === idx ? 'active' : ''}`}
                          onClick={() => setSelectedVariant(idx)}
                          title={variant.name}
                        >
                          <VariantIcon size={14} />
                          <span>{variant.type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Controls Section */}
              <div className="icon-controls">
                <div className="control-item">
                  <label className="control-label">
                    Size
                    <span className="control-value">{size}px</span>
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="128"
                    value={size}
                    onChange={e => setSize(Number(e.target.value))}
                    className="control-slider"
                  />
                </div>

                {icon?.brandColor && (
                  <div className="control-item">
                    <label className="control-label">
                      Brand Color
                      <button
                        className={`brand-color-toggle ${useBrandColor ? 'active' : ''}`}
                        onClick={() => {
                          const newUseBrandColor = !useBrandColor;
                          setUseBrandColor(newUseBrandColor);
                          if (newUseBrandColor && icon.brandColor) {
                            setColor(`#${icon.brandColor}`);
                          } else {
                            setColor('#000000');
                          }
                        }}
                        title={useBrandColor ? 'Using brand color' : 'Using custom color'}
                      >
                        {useBrandColor ? 'ON' : 'OFF'}
                      </button>
                    </label>
                  </div>
                )}

                <div className="control-item">
                  <label className="control-label">Color</label>
                  <ColorPicker
                    value={color}
                    onChange={setColor}
                    disabled={useBrandColor && !!icon?.brandColor}
                  />
                </div>
              </div>

              {/* Download Section */}
              <div className="download-section">
                <button onClick={handleDownload} className="download-button">
                  <FiDownload size={20} />
                  <span>Download {downloadFormat.toUpperCase()}</span>
                </button>
                <div className="format-selector" ref={dropdownRef}>
                  <button
                    className="format-dropdown-toggle"
                    onClick={() => setShowFormatDropdown(!showFormatDropdown)}
                  >
                    <FiChevronDown size={18} />
                  </button>
                  {showFormatDropdown && (
                    <div className="format-dropdown">
                      {(['svg', 'png', 'webp'] as const).map(format => {
                        const Icon = formatIcons[format];
                        return (
                          <button
                            key={format}
                            className={`format-option ${downloadFormat === format ? 'active' : ''}`}
                            onClick={() => {
                              setDownloadFormat(format);
                              localStorage.setItem('preferredDownloadFormat', format);
                              setShowFormatDropdown(false);
                            }}
                          >
                            <Icon size={16} />
                            <span>{format.toUpperCase()}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="section-separator" />

          {/* Usage Examples Section with Tabs */}
          <div className="usage-examples-section">
            <h2 className="section-title">Usage Examples</h2>

            {/* Tab Navigation */}
            <div className="tabs-navigation">
              {tabs.map(tab => {
                const FrameworkIcon = frameworkIcons[tab.iconName];
                return (
                  <button
                    key={tab.id}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab.id)}
                    style={{ '--tab-color': tab.color } as React.CSSProperties}
                  >
                    {FrameworkIcon && <FrameworkIcon size={18} />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              <div className="code-block-wrapper">
                <div className="code-block-header">
                  <div className="code-block-title-with-icon">
                    {frameworkIcons[tabs.find(t => t.id === activeTab)?.iconName || ''] &&
                      React.createElement(
                        frameworkIcons[tabs.find(t => t.id === activeTab)?.iconName || ''],
                        { size: 18 }
                      )}
                    <span className="code-block-title">
                      {tabs.find(t => t.id === activeTab)?.label} Usage
                    </span>
                  </div>
                  <button
                    className="copy-button"
                    onClick={() => handleCopyCode(activeTab)}
                    title={copiedTab === activeTab ? 'Copied!' : 'Copy code'}
                  >
                    <FiCopy size={16} />
                    <span>{copiedTab === activeTab ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <CodeBlock
                  code={usageExamples[activeTab as keyof typeof usageExamples]}
                  language={getLanguage(activeTab)}
                  title=""
                  onCopy={() => {}}
                />
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="section-separator" />

          {/* Installation Section */}
          <div className="installation-section">
            <h2 className="section-title">
              <FiPackage size={24} />
              <span>Installation</span>
            </h2>

            {/* Package Manager Tabs */}
            <div className="tabs-navigation">
              {Object.keys(installCommands).map(pm => {
                const Icon = packageIcons[pm];
                return (
                  <button
                    key={pm}
                    className={`tab-button ${activePackageManager === pm ? 'active' : ''}`}
                    onClick={() => {
                      setActivePackageManager(pm);
                      localStorage.setItem('preferredPackageManager', pm);
                    }}
                    style={
                      {
                        '--tab-color':
                          pm === 'npm'
                            ? '#cb3837'
                            : pm === 'yarn'
                              ? '#2c8ebb'
                              : pm === 'pnpm'
                                ? '#f69220'
                                : '#f0dc4e',
                      } as React.CSSProperties
                    }
                  >
                    {Icon && <Icon size={18} />}
                    <span>{pm}</span>
                  </button>
                );
              })}
            </div>

            <div className="tab-content">
              <div className="code-block-wrapper">
                <div className="code-block-header">
                  <div className="code-block-title-with-icon">
                    {packageIcons[activePackageManager] &&
                      React.createElement(packageIcons[activePackageManager], { size: 18 })}
                    <span className="code-block-title">Install with {activePackageManager}</span>
                  </div>
                  <button
                    className="copy-button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        installCommands[activePackageManager as keyof typeof installCommands]
                      );
                      setCopiedTab('install');
                      setTimeout(() => setCopiedTab(null), 2000);
                    }}
                    title={copiedTab === 'install' ? 'Copied!' : 'Copy command'}
                  >
                    <FiCopy size={16} />
                    <span>{copiedTab === 'install' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <CodeBlock
                  code={installCommands[activePackageManager as keyof typeof installCommands]}
                  language="bash"
                  title=""
                  onCopy={() => {}}
                />
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="section-separator" />

          {/* Button Examples (if applicable) */}
          {(icon.hasColor || icon.hasText) && (
            <div className="button-examples-section">
              <h2 className="section-title">Button Examples</h2>
              <div className="button-showcase">
                <button className="example-button primary">
                  <IconComponent size={20} />
                  <span>Primary Action</span>
                </button>
                <button className="example-button secondary">
                  <IconComponent size={20} />
                  <span>Secondary</span>
                </button>
                <button className="example-button outline">
                  <IconComponent size={20} />
                  <span>Outline</span>
                </button>
                <button className="example-button ghost">
                  <IconComponent size={20} />
                  <span>Ghost</span>
                </button>
              </div>
            </div>
          )}

          {/* Brand Guidelines Disclaimer */}
          <div className="brand-disclaimer">
            <FiAlertCircle size={16} />
            <p>
              <strong>Important:</strong> Please ensure you comply with the respective brand
              guidelines when using any logo or trademarked icon. The icons are provided for
              identification purposes only. Commercial use may require permission from the trademark
              holder.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
