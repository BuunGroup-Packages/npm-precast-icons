import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiDroplet,
  FiLayers,
  FiTarget,
  FiTriangle,
  FiCircle,
  FiSquare,
  FiGrid,
  FiStar,
} from 'react-icons/fi';
import { SEO } from '../components/SEO';

// Popular color palettes
const COLOR_PALETTES = {
  'Tailwind Blue': {
    colors: ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
    description: 'Default Tailwind CSS blue palette',
  },
  'Material Purple': {
    colors: ['#e1bee7', '#ba68c8', '#9c27b0', '#7b1fa2', '#4a148c'],
    description: 'Material Design purple palette',
  },
  'GitHub Green': {
    colors: ['#d1f2eb', '#7bc96f', '#239a3b', '#196127', '#0e4429'],
    description: 'GitHub contribution graph greens',
  },
  Sunset: {
    colors: ['#ffd4a3', '#ffab76', '#ff6b6b', '#ee5a6f', '#c44569'],
    description: 'Warm sunset gradient',
  },
  Ocean: {
    colors: ['#a8dadc', '#6bb6d6', '#457b9d', '#1d3557', '#0d1b2a'],
    description: 'Deep ocean blues',
  },
  Forest: {
    colors: ['#d4e9d7', '#95d5b2', '#52b788', '#2d6a4f', '#1b4332'],
    description: 'Natural forest greens',
  },
  Slate: {
    colors: ['#f1f5f9', '#cbd5e1', '#64748b', '#334155', '#0f172a'],
    description: 'Neutral slate grays',
  },
  Rose: {
    colors: ['#ffe4e6', '#fecdd3', '#fb7185', '#e11d48', '#881337'],
    description: 'Romantic rose palette',
  },
  Amber: {
    colors: ['#fef3c7', '#fde68a', '#fbbf24', '#f59e0b', '#d97706'],
    description: 'Warm amber tones',
  },
  Indigo: {
    colors: ['#e0e7ff', '#c7d2fe', '#6366f1', '#4f46e5', '#3730a3'],
    description: 'Deep indigo shades',
  },
};

type PaletteType =
  | 'shades'
  | 'custom'
  | 'complementary'
  | 'triadic'
  | 'analogous'
  | 'monochromatic'
  | 'split-complementary'
  | 'tetradic';
type UseCase = 'website' | 'app' | 'brand' | 'design-system' | 'custom';

const USE_CASE_LABELS = {
  website: {
    name: 'Website',
    labels: ['Background', 'Surface', 'Primary', 'Primary Hover', 'Text'],
    description: 'Optimized for web interfaces',
  },
  app: {
    name: 'Mobile App',
    labels: ['Background', 'Card', 'Accent', 'Accent Dark', 'Disabled'],
    description: 'Perfect for mobile applications',
  },
  brand: {
    name: 'Brand Identity',
    labels: ['Primary', 'Secondary', 'Tertiary', 'Support', 'Dark'],
    description: 'Complete brand color system',
  },
  'design-system': {
    name: 'Design System',
    labels: ['50', '200', '500', '700', '900'],
    description: 'Systematic color scale',
  },
  custom: {
    name: 'Custom',
    labels: ['Color 1', 'Color 2', 'Color 3', 'Color 4', 'Color 5'],
    description: 'Define your own naming',
  },
};

export function ColorShowcase() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const hexColor = searchParams.get('hex') || '3b82f6';
  const [validHex, setValidHex] = useState('#3b82f6');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<string>('');
  const [paletteType, setPaletteType] = useState<PaletteType>('shades');
  const [customPalette, setCustomPalette] = useState<string[]>([]);
  const [showPaletteMenu, setShowPaletteMenu] = useState(false);
  const [inputHex, setInputHex] = useState('#3b82f6');
  const [isValidInput, setIsValidInput] = useState(true);
  const [livePreviewHex, setLivePreviewHex] = useState('#3b82f6');
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase>('website');

  useEffect(() => {
    // Validate and format hex color
    const cleanHex = hexColor.startsWith('#') ? hexColor : `#${hexColor}`;
    const isValid = /^#[0-9A-F]{6}$/i.test(cleanHex);
    const finalHex = isValid ? cleanHex : '#3b82f6';
    setValidHex(finalHex);
    setInputHex(finalHex);
    setLivePreviewHex(finalHex);
    setIsValidInput(true);
  }, [hexColor]);

  // Validate input as user types
  const validateLiveInput = (value: string) => {
    let cleanHex = value.trim().replace(/\s/g, '');

    // Handle empty input
    if (!cleanHex) {
      setIsValidInput(false);
      return;
    }

    // Remove # if present and re-add it
    cleanHex = cleanHex.replace('#', '');

    // If it's a 3-digit hex, expand it to 6 digits
    if (cleanHex.length === 3 && /^[0-9A-F]{3}$/i.test(cleanHex)) {
      cleanHex = cleanHex
        .split('')
        .map(char => char + char)
        .join('');
    }

    // Validate hex format
    if (/^[0-9A-F]{6}$/i.test(cleanHex)) {
      setLivePreviewHex(`#${cleanHex.toUpperCase()}`);
      setIsValidInput(true);
    } else if (/^[0-9A-F]{1,6}$/i.test(cleanHex)) {
      // Partial valid hex (still typing)
      setIsValidInput(false);
    } else {
      // Invalid characters
      setIsValidInput(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputHex(value);
    validateLiveInput(value);
  };

  // Generate color variations
  const lighten = (hex: string, percent: number) => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  };

  const darken = (hex: string, percent: number) => lighten(hex, -percent);

  // Generate complementary color
  const getComplementary = (hex: string) => {
    const num = parseInt(hex.slice(1), 16);
    const R = (num >> 16) ^ 0xff;
    const G = ((num >> 8) & 0x00ff) ^ 0xff;
    const B = (num & 0x0000ff) ^ 0xff;
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1).toUpperCase()}`;
  };

  // Generate triadic colors
  const getTriadic = (hex: string) => {
    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }
      return [h * 360, s, l];
    };

    const hslToRgb = (h: number, s: number, l: number) => {
      h = h / 360;
      let r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return `#${[r, g, b]
        .map(x => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
        .toUpperCase()}`;
    };

    const num = parseInt(hex.slice(1), 16);
    const r = num >> 16;
    const g = (num >> 8) & 0x00ff;
    const b = num & 0x0000ff;
    const [h, s, l] = rgbToHsl(r, g, b);

    return [hex, hslToRgb((h + 120) % 360, s, l), hslToRgb((h + 240) % 360, s, l)];
  };

  // Generate analogous colors
  const getAnalogous = (hex: string) => {
    const rgbToHsl = (r: number, g: number, b: number) => {
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }
      return [h * 360, s, l];
    };

    const hslToRgb = (h: number, s: number, l: number) => {
      h = h / 360;
      let r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return `#${[r, g, b]
        .map(x => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
        .toUpperCase()}`;
    };

    const num = parseInt(hex.slice(1), 16);
    const r = num >> 16;
    const g = (num >> 8) & 0x00ff;
    const b = num & 0x0000ff;
    const [h, s, l] = rgbToHsl(r, g, b);

    return [
      hslToRgb((h - 30 + 360) % 360, s, l),
      hslToRgb((h - 15 + 360) % 360, s, l),
      hex,
      hslToRgb((h + 15) % 360, s, l),
      hslToRgb((h + 30) % 360, s, l),
    ];
  };

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(identifier);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleHexSubmit = () => {
    let cleanHex = inputHex.trim().replace(/\s/g, '');

    // Remove # if present and re-add it
    cleanHex = cleanHex.replace('#', '');

    // If it's a 3-digit hex, expand it to 6 digits
    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split('')
        .map(char => char + char)
        .join('');
    }

    // Add # prefix
    cleanHex = `#${cleanHex}`;

    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(cleanHex)) {
      const upperHex = cleanHex.toUpperCase();
      setValidHex(upperHex);
      setInputHex(upperHex);
      setSearchParams({ hex: upperHex.replace('#', '') });
      // Reset to shades when generating new color
      setPaletteType('shades');
      setSelectedPalette('');
      setCustomPalette([]);
    } else {
      // If invalid, reset to default
      setInputHex('#3b82f6');
      setValidHex('#3b82f6');
      setSearchParams({ hex: '3b82f6' });
    }
  };

  const selectPresetPalette = (paletteName: string) => {
    setSelectedPalette(paletteName);
    setPaletteType('custom');
    setCustomPalette(COLOR_PALETTES[paletteName as keyof typeof COLOR_PALETTES].colors);
    setShowPaletteMenu(false);
  };

  const generatePalette = () => {
    switch (paletteType) {
      case 'shades':
        return [
          lighten(validHex, 40),
          lighten(validHex, 20),
          validHex,
          darken(validHex, 20),
          darken(validHex, 40),
        ];
      case 'complementary':
        return [
          validHex,
          lighten(validHex, 20),
          getComplementary(validHex),
          lighten(getComplementary(validHex), 20),
          darken(getComplementary(validHex), 20),
        ];
      case 'triadic': {
        const triadic = getTriadic(validHex);
        return [
          triadic[0],
          lighten(triadic[0], 20),
          triadic[1],
          triadic[2],
          darken(triadic[0], 20),
        ];
      }
      case 'analogous':
        return getAnalogous(validHex);
      case 'monochromatic':
        return [
          lighten(validHex, 50),
          lighten(validHex, 30),
          validHex,
          darken(validHex, 15),
          darken(validHex, 30),
        ];
      case 'split-complementary': {
        const comp = getComplementary(validHex);
        const analogous = getAnalogous(comp);
        return [validHex, lighten(validHex, 20), analogous[1], analogous[3], darken(validHex, 20)];
      }
      case 'tetradic': {
        const triadic = getTriadic(validHex);
        const comp = getComplementary(validHex);
        return [validHex, triadic[1], comp, triadic[2], darken(validHex, 20)];
      }
      case 'custom':
        return customPalette.length
          ? customPalette
          : [
              lighten(validHex, 40),
              lighten(validHex, 20),
              validHex,
              darken(validHex, 20),
              darken(validHex, 40),
            ];
      default:
        return [
          lighten(validHex, 40),
          lighten(validHex, 20),
          validHex,
          darken(validHex, 20),
          darken(validHex, 40),
        ];
    }
  };

  const currentPalette = generatePalette();

  // Get contextual labels based on use case
  const getColorLabel = (index: number) => {
    const labels = USE_CASE_LABELS[selectedUseCase].labels;
    if (paletteType === 'shades' && selectedUseCase === 'design-system') {
      return labels[index] || `Color ${index + 1}`;
    }
    return labels[index] || `Color ${index + 1}`;
  };

  // Use shields.io service to generate color badges that work in all markdown renderers
  const getColorSwatch = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    return `![${hex}](https://img.shields.io/badge/${cleanHex}-${cleanHex}?style=for-the-badge&label=%20)`;
  };

  const markdownTable = `| ${selectedUseCase === 'design-system' ? 'Scale' : 'Role'} | Hex Code | Preview |
|-------|----------|---------|
${currentPalette
  .map((color, index) => {
    const label = getColorLabel(index);
    const hexDisplay = `\`${color}\``;
    return `| ${label} | ${hexDisplay} | ${getColorSwatch(color)} |`;
  })
  .join('\n')}`;

  const currentUrl = `${window.location.origin}${location.pathname}?hex=${validHex.replace('#', '')}`;
  const markdownExample = `![Color Palette](${currentUrl})`;

  return (
    <>
      <SEO
        title={`Color Palette Generator - ${validHex}`}
        description={`Generate beautiful color palettes from ${validHex}. Create shades, complementary, triadic, and analogous color schemes for your design system.`}
        keywords={`color palette generator, ${validHex}, hex color, color scheme, design system, complementary colors, triadic colors`}
      />
      <div className="color-showcase-page">
        <div className="color-showcase-container">
          {/* Color Input Section */}
          <div className="color-input-section">
            <h1 className="color-title">Color Palette Generator</h1>
            <div className="hex-input-group">
              <div className="hex-input-wrapper">
                <div
                  className={`color-preview-square ${!isValidInput ? 'invalid' : ''}`}
                  style={{ backgroundColor: isValidInput ? livePreviewHex : '#ef4444' }}
                  title={isValidInput ? livePreviewHex : 'Invalid hex color'}
                />
                <input
                  type="text"
                  value={inputHex}
                  onChange={handleInputChange}
                  onKeyPress={e => e.key === 'Enter' && handleHexSubmit()}
                  placeholder="#3b82f6"
                  className={`hex-input ${!isValidInput ? 'invalid' : ''}`}
                />
                {!isValidInput && <span className="hex-error-text">Invalid hex color</span>}
              </div>
              <button onClick={handleHexSubmit} className="hex-submit-btn">
                Generate
              </button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="controls-section">
            {/* Use Case Selector */}
            <div className="use-case-selector">
              <h3 className="section-label">Purpose</h3>
              <div className="use-case-buttons">
                {Object.entries(USE_CASE_LABELS).map(([key, value]) => (
                  <button
                    key={key}
                    className={`use-case-btn ${selectedUseCase === key ? 'active' : ''}`}
                    onClick={() => setSelectedUseCase(key as UseCase)}
                    title={value.description}
                  >
                    <span className="use-case-name">{value.name}</span>
                    <span className="use-case-desc">{value.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Palette Type Selector */}
            <div className="palette-type-selector">
              <h3 className="section-label">Color Theory</h3>
              <div className="palette-type-buttons">
                <button
                  className={`palette-type-btn ${paletteType === 'shades' ? 'active' : ''}`}
                  onClick={() => {
                    setPaletteType('shades');
                    setSelectedPalette('');
                  }}
                >
                  <FiLayers size={16} />
                  <span>Shades</span>
                </button>
                <button
                  className={`palette-type-btn ${paletteType === 'monochromatic' ? 'active' : ''}`}
                  onClick={() => {
                    setPaletteType('monochromatic');
                    setSelectedPalette('');
                  }}
                >
                  <FiSquare size={16} />
                  <span>Monochromatic</span>
                </button>
                <button
                  className={`palette-type-btn ${paletteType === 'complementary' ? 'active' : ''}`}
                  onClick={() => {
                    setPaletteType('complementary');
                    setSelectedPalette('');
                  }}
                >
                  <FiTarget size={16} />
                  <span>Complementary</span>
                </button>
                <button
                  className={`palette-type-btn ${paletteType === 'split-complementary' ? 'active' : ''}`}
                  onClick={() => {
                    setPaletteType('split-complementary');
                    setSelectedPalette('');
                  }}
                >
                  <FiStar size={16} />
                  <span>Split Complementary</span>
                </button>
                <button
                  className={`palette-type-btn ${paletteType === 'triadic' ? 'active' : ''}`}
                  onClick={() => {
                    setPaletteType('triadic');
                    setSelectedPalette('');
                  }}
                >
                  <FiTriangle size={16} />
                  <span>Triadic</span>
                </button>
                <button
                  className={`palette-type-btn ${paletteType === 'tetradic' ? 'active' : ''}`}
                  onClick={() => {
                    setPaletteType('tetradic');
                    setSelectedPalette('');
                  }}
                >
                  <FiGrid size={16} />
                  <span>Tetradic</span>
                </button>
                <button
                  className={`palette-type-btn ${paletteType === 'analogous' ? 'active' : ''}`}
                  onClick={() => {
                    setPaletteType('analogous');
                    setSelectedPalette('');
                  }}
                >
                  <FiCircle size={16} />
                  <span>Analogous</span>
                </button>
              </div>
            </div>

            {/* Preset Palette Dropdown */}
            <div className="preset-palette-section">
              <h3 className="section-label">Presets</h3>
              <div className="preset-palette-dropdown">
                <button
                  className="preset-palette-btn"
                  onClick={() => setShowPaletteMenu(!showPaletteMenu)}
                >
                  <FiDroplet size={18} />
                  <span>{selectedPalette || 'Popular Palettes'}</span>
                  <FiChevronDown size={16} className={showPaletteMenu ? 'rotate' : ''} />
                </button>
                {showPaletteMenu && (
                  <div className="palette-menu">
                    {Object.entries(COLOR_PALETTES).map(([name, palette]) => (
                      <button
                        key={name}
                        className="palette-menu-item"
                        onClick={() => selectPresetPalette(name)}
                      >
                        <div className="palette-menu-colors">
                          {palette.colors.map(color => (
                            <span
                              key={color}
                              className="palette-menu-color"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="palette-menu-info">
                          <span className="palette-menu-name">{name}</span>
                          <span className="palette-menu-desc">{palette.description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Color Palette Display */}
          <div className="color-variations">
            <div className="color-palette large">
              {currentPalette.map((color, index) => (
                <div
                  key={index}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  onClick={() => handleCopy(color, `palette-${index}`)}
                >
                  <span className="swatch-label">
                    {copiedItem === `palette-${index}` ? 'Copied!' : color}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Markdown Usage Guide - Always Visible */}
          <div className="usage-guide">
            <h3>How to Use in Markdown</h3>

            <div className="usage-section">
              <h4>Direct Link</h4>
              <div className="code-example">
                <code>{markdownExample}</code>
                <button
                  className="copy-code-btn"
                  onClick={() => handleCopy(markdownExample, 'direct-link')}
                  title={copiedItem === 'direct-link' ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copiedItem === 'direct-link' ? <FiCheck size={16} /> : <FiCopy size={16} />}
                </button>
              </div>
            </div>

            <div className="usage-section">
              <h4>Color Palette Table</h4>
              <div className="code-example">
                <pre>{markdownTable}</pre>
                <button
                  className="copy-code-btn"
                  onClick={() => handleCopy(markdownTable, 'palette-table')}
                  title={copiedItem === 'palette-table' ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copiedItem === 'palette-table' ? <FiCheck size={16} /> : <FiCopy size={16} />}
                </button>
              </div>
              <p
                style={{ fontSize: '13px', color: '#6b7280', marginTop: '12px', lineHeight: '1.5' }}
              >
                <strong>Note:</strong> Color swatches use{' '}
                <a
                  href="https://shields.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#3b82f6', textDecoration: 'underline' }}
                >
                  shields.io
                </a>{' '}
                service to generate badge images that work in GitHub and other markdown renderers.
                The format is:{' '}
                <code
                  style={{
                    backgroundColor: '#f3f4f6',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontSize: '12px',
                  }}
                >
                  https://img.shields.io/badge/HEX-HEX?style=for-the-badge
                </code>
              </p>
            </div>

            <div className="usage-section">
              <h4>Live Markdown Table Preview</h4>
              <div className="markdown-preview">
                <table>
                  <thead>
                    <tr>
                      <th>Color</th>
                      <th>Hex Code</th>
                      <th>Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPalette.map((color, index) => (
                      <tr key={index}>
                        <td>{getColorLabel(index)}</td>
                        <td>
                          <code>{color}</code>
                        </td>
                        <td>
                          <div className="color-preview-cell" style={{ backgroundColor: color }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
