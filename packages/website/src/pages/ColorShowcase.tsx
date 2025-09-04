import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { SEO } from '../components/SEO';

export function ColorShowcase() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const hexColor = searchParams.get('hex') || '#3b82f6';
  const [validHex, setValidHex] = useState('#3b82f6');
  const [copied, setCopied] = useState(false);
  const [showUsage, setShowUsage] = useState(searchParams.get('usage') === 'true');

  useEffect(() => {
    // Validate and format hex color
    const cleanHex = hexColor.startsWith('#') ? hexColor : `#${hexColor}`;
    const isValid = /^#[0-9A-F]{6}$/i.test(cleanHex);
    setValidHex(isValid ? cleanHex : '#3b82f6');
  }, [hexColor]);

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentUrl = `${window.location.origin}${location.pathname}?hex=${validHex.replace('#', '')}`;

  const markdownExample = `![Color Palette](${currentUrl})`;

  const markdownTable = `| Shade | Hex Code | Preview |
|-------|----------|---------|
| Light (+40%) | ${lighten(validHex, 40)} | ![](${currentUrl}) |
| Light (+20%) | ${lighten(validHex, 20)} | ![](${currentUrl}) |
| **Base** | **${validHex}** | ![](${currentUrl}) |
| Dark (-20%) | ${darken(validHex, 20)} | ![](${currentUrl}) |
| Dark (-40%) | ${darken(validHex, 40)} | ![](${currentUrl}) |`;

  return (
    <>
      <SEO
        title={`Color Palette - ${validHex}`}
        description={`Color palette showcase for ${validHex} with variations. Perfect for markdown documentation and design systems.`}
        keywords={`color palette, ${validHex}, hex color, color scheme, markdown color, design system`}
      />
      <div className="color-showcase-page">
        <div className="color-showcase-container">
          <div className="color-main">
            <div className="color-display-large" style={{ backgroundColor: validHex }}>
              <span className="color-hex-large">{validHex}</span>
            </div>
          </div>

          <div className="color-variations">
            <div className="color-palette">
              <div className="color-swatch" style={{ backgroundColor: lighten(validHex, 40) }}>
                <span className="swatch-label">+40%</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: lighten(validHex, 20) }}>
                <span className="swatch-label">+20%</span>
              </div>
              <div className="color-swatch main" style={{ backgroundColor: validHex }}>
                <span className="swatch-label">Base</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: darken(validHex, 20) }}>
                <span className="swatch-label">-20%</span>
              </div>
              <div className="color-swatch" style={{ backgroundColor: darken(validHex, 40) }}>
                <span className="swatch-label">-40%</span>
              </div>
            </div>
          </div>

          {showUsage && (
            <div className="usage-guide">
              <h3>How to Use in Markdown</h3>

              <div className="usage-section">
                <h4>Direct Image Embed</h4>
                <div className="code-example">
                  <code>{markdownExample}</code>
                  <button
                    className="copy-code-btn"
                    onClick={() => handleCopy(markdownExample)}
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                  >
                    {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                  </button>
                </div>
              </div>

              <div className="usage-section">
                <h4>Color Palette Table</h4>
                <div className="code-example">
                  <pre>{markdownTable}</pre>
                  <button
                    className="copy-code-btn"
                    onClick={() => handleCopy(markdownTable)}
                    title={copied ? 'Copied!' : 'Copy to clipboard'}
                  >
                    {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                  </button>
                </div>
              </div>

              <div className="usage-section">
                <h4>Live Markdown Table Preview</h4>
                <div className="markdown-preview">
                  <table>
                    <thead>
                      <tr>
                        <th>Shade</th>
                        <th>Hex Code</th>
                        <th>Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Light (+40%)</td>
                        <td>
                          <code>{lighten(validHex, 40)}</code>
                        </td>
                        <td>
                          <div
                            className="color-preview-cell"
                            style={{ backgroundColor: lighten(validHex, 40) }}
                          ></div>
                        </td>
                      </tr>
                      <tr>
                        <td>Light (+20%)</td>
                        <td>
                          <code>{lighten(validHex, 20)}</code>
                        </td>
                        <td>
                          <div
                            className="color-preview-cell"
                            style={{ backgroundColor: lighten(validHex, 20) }}
                          ></div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Base</strong>
                        </td>
                        <td>
                          <strong>
                            <code>{validHex}</code>
                          </strong>
                        </td>
                        <td>
                          <div
                            className="color-preview-cell"
                            style={{ backgroundColor: validHex }}
                          ></div>
                        </td>
                      </tr>
                      <tr>
                        <td>Dark (-20%)</td>
                        <td>
                          <code>{darken(validHex, 20)}</code>
                        </td>
                        <td>
                          <div
                            className="color-preview-cell"
                            style={{ backgroundColor: darken(validHex, 20) }}
                          ></div>
                        </td>
                      </tr>
                      <tr>
                        <td>Dark (-40%)</td>
                        <td>
                          <code>{darken(validHex, 40)}</code>
                        </td>
                        <td>
                          <div
                            className="color-preview-cell"
                            style={{ backgroundColor: darken(validHex, 40) }}
                          ></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="usage-section">
                <h4>Example URLs</h4>
                <ul className="url-examples">
                  <li>
                    <code>/color?hex=3b82f6</code> - Blue
                  </li>
                  <li>
                    <code>/color?hex=ef4444</code> - Red
                  </li>
                  <li>
                    <code>/color?hex=10b981</code> - Green
                  </li>
                  <li>
                    <code>/color?hex=f59e0b</code> - Amber
                  </li>
                </ul>
              </div>
            </div>
          )}

          <button className="toggle-usage-btn" onClick={() => setShowUsage(!showUsage)}>
            {showUsage ? 'Hide Usage Guide' : 'Show Usage Guide'}
          </button>
        </div>
      </div>
    </>
  );
}
