import { useState, useEffect, useRef } from 'react';
import {
  FiSettings,
  FiX,
  FiDownload,
  FiPackage,
  FiFile,
  FiImage,
  FiCamera,
  FiGrid,
  FiLayers,
} from 'react-icons/fi';
import { useFramework } from '../hooks/useFramework';
import type { Framework } from '../contexts/FrameworkContextDef';
import { motion, AnimatePresence } from 'framer-motion';

const frameworks = [
  { id: 'react' as Framework, name: 'React', iconName: 'react', color: '#61dafb' },
  { id: 'vue' as Framework, name: 'Vue', iconName: 'vuedotjs', color: '#4fc08d' },
  { id: 'svelte' as Framework, name: 'Svelte', iconName: 'svelte', color: '#ff3e00' },
  { id: 'svg' as Framework, name: 'SVG', iconName: 'html5', color: '#e34c26' },
];

export function SettingsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedFramework, setSelectedFramework } = useFramework();
  const [frameworkIcons, setFrameworkIcons] = useState<
    Record<string, React.ComponentType<{ size?: number }>>
  >({});
  const [packageIcons, setPackageIcons] = useState<
    Record<string, React.ComponentType<{ size?: number }>>
  >({});
  const [downloadFormat, setDownloadFormat] = useState(() => {
    return localStorage.getItem('preferredDownloadFormat') || 'svg';
  });
  const [packageManager, setPackageManager] = useState(() => {
    return localStorage.getItem('preferredPackageManager') || 'npm';
  });
  const [scrollMode, setScrollMode] = useState(() => {
    return localStorage.getItem('scrollMode') || 'infinite';
  });
  const popupRef = useRef<HTMLDivElement>(null);

  // Format icons
  const formatIcons: Record<string, React.ComponentType<{ size?: number }>> = {
    svg: FiFile,
    png: FiImage,
    webp: FiCamera,
  };

  useEffect(() => {
    loadFrameworkIcons();
    loadPackageIcons();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

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
                    `<path d="${node.attrs.d}" fill="currentColor" stroke="none"/>`
                )
                .join('');

              return (
                <div
                  style={{ width: size, height: size, display: 'inline-flex' }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="none">${paths}</svg>`,
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
                    `<path d="${node.attrs.d}" fill="currentColor" stroke="none"/>`
                )
                .join('');

              return (
                <div
                  style={{ width: size, height: size, display: 'inline-flex' }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="none">${paths}</svg>`,
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

  const handleFrameworkSelect = (framework: Framework) => {
    setSelectedFramework(framework);
    localStorage.setItem('preferredFramework', framework);
    setIsOpen(false);
  };

  return (
    <div className="settings-container" ref={popupRef}>
      <button className="settings-button" onClick={() => setIsOpen(!isOpen)} title="Settings">
        <FiSettings size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="mobile-backdrop" onClick={() => setIsOpen(false)} />
            <motion.div
              className="settings-popup"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="settings-header">
                <h3>Settings</h3>
                <button className="settings-close" onClick={() => setIsOpen(false)}>
                  <FiX size={18} />
                </button>
              </div>

              <div className="settings-section">
                <label className="settings-label">Preferred Framework</label>
                <div className="framework-options">
                  {frameworks.map(framework => {
                    const FrameworkIcon = frameworkIcons[framework.iconName];
                    return (
                      <button
                        key={framework.id}
                        className={`framework-option ${selectedFramework === framework.id ? 'active' : ''}`}
                        onClick={() => handleFrameworkSelect(framework.id)}
                        style={{ '--framework-color': framework.color } as React.CSSProperties}
                      >
                        {FrameworkIcon && <FrameworkIcon size={18} />}
                        <span>{framework.name}</span>
                        {selectedFramework === framework.id && (
                          <motion.div
                            className="framework-check"
                            layoutId="framework-check"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="settings-section download-format-section">
                <label className="settings-label">
                  <FiDownload size={16} style={{ display: 'inline', marginRight: '4px' }} />
                  Download Format
                </label>
                <div className="format-options">
                  {['svg', 'png', 'webp'].map(format => {
                    const Icon = formatIcons[format];
                    return (
                      <button
                        key={format}
                        className={`format-option-btn ${downloadFormat === format ? 'active' : ''}`}
                        onClick={() => {
                          setDownloadFormat(format);
                          localStorage.setItem('preferredDownloadFormat', format);
                        }}
                      >
                        {Icon && <Icon size={16} />}
                        <span>{format.toUpperCase()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="settings-section package-manager-section">
                <label className="settings-label">
                  <FiPackage size={16} style={{ display: 'inline', marginRight: '4px' }} />
                  Package Manager
                </label>
                <div className="format-options">
                  {['npm', 'yarn', 'pnpm', 'bun'].map(pm => {
                    const Icon = packageIcons[pm];
                    return (
                      <button
                        key={pm}
                        className={`format-option-btn ${packageManager === pm ? 'active' : ''}`}
                        onClick={() => {
                          setPackageManager(pm);
                          localStorage.setItem('preferredPackageManager', pm);
                        }}
                        style={
                          {
                            '--pm-color':
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
                        {Icon && <Icon size={16} />}
                        <span>{pm}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="settings-section">
                <label className="settings-label">
                  <FiLayers size={16} style={{ display: 'inline', marginRight: '4px' }} />
                  Scroll Mode
                </label>
                <div className="format-options">
                  <button
                    className={`format-option-btn ${scrollMode === 'infinite' ? 'active' : ''}`}
                    onClick={() => {
                      setScrollMode('infinite');
                      localStorage.setItem('scrollMode', 'infinite');
                      // Trigger a page reload to apply the new scroll mode
                      window.location.reload();
                    }}
                  >
                    <FiLayers size={16} />
                    <span>Infinite</span>
                  </button>
                  <button
                    className={`format-option-btn ${scrollMode === 'pagination' ? 'active' : ''}`}
                    onClick={() => {
                      setScrollMode('pagination');
                      localStorage.setItem('scrollMode', 'pagination');
                      // Trigger a page reload to apply the new scroll mode
                      window.location.reload();
                    }}
                  >
                    <FiGrid size={16} />
                    <span>Pagination</span>
                  </button>
                </div>
                <p className="settings-note" style={{ fontSize: '12px', marginTop: '8px' }}>
                  Choose how icons load on the homepage
                </p>
              </div>

              <div className="settings-footer">
                <p className="settings-note">
                  Your preferences are saved locally and will be remembered on your next visit.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
