import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  FiSearch,
  FiChevronDown,
  FiBook,
  FiGithub,
  FiPackage,
  FiFileText,
  FiDroplet,
  FiX,
} from 'react-icons/fi';
import { getAllIcons } from '../utils/iconUtils';
import { SettingsPopup } from './SettingsPopup';
import { COMPANY_INFO } from '../config/constants';

interface HeaderProps {
  search?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({ search = '', onSearchChange }: HeaderProps) {
  const location = useLocation();
  const [iconCount, setIconCount] = useState<number>(0);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    loadIconCount();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setShowResourcesMenu(false);
      }
    }

    if (showResourcesMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showResourcesMenu]);

  const loadIconCount = async () => {
    try {
      const icons = await getAllIcons();
      setIconCount(icons.length);
    } catch (error) {
      console.error('Failed to load icon count:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/precast-icons-logo.png" alt="PRECAST Icons" className="logo-image" />
          <span className="logo-text">Precast Icons</span>
        </Link>

        {isHomePage && onSearchChange && (
          <div className="header-search">
            <FiSearch className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search 4000+ icons..."
              value={search}
              onChange={e => onSearchChange(e.target.value)}
              className="header-search-input"
            />
            {search && (
              <button
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        )}

        <nav className="nav">
          <span className="icon-count">
            {iconCount > 0 ? `${iconCount.toLocaleString()} icons` : 'Loading...'}
          </span>

          {/* Resources Dropdown */}
          <div className="resources-dropdown" ref={resourcesRef}>
            <button
              className="resources-button"
              onClick={() => setShowResourcesMenu(!showResourcesMenu)}
              aria-expanded={showResourcesMenu}
            >
              <FiBook size={20} />
              <span className="desktop-only">Resources</span>
              <FiChevronDown
                size={16}
                className={`dropdown-arrow ${showResourcesMenu ? 'rotate' : ''}`}
              />
            </button>

            {showResourcesMenu && (
              <>
                <div className="mobile-backdrop" onClick={() => setShowResourcesMenu(false)} />
                <div className="resources-menu">
                  <div className="resources-menu-section">
                    <h4 className="resources-menu-title">Tools</h4>
                    <Link
                      to="/color?hex=3b82f6"
                      className="resources-menu-item featured"
                      onClick={() => setShowResourcesMenu(false)}
                    >
                      <FiDroplet size={16} />
                      <div>
                        <span className="resource-item-name">Color Preview Tool</span>
                        <span className="resource-item-desc">Markdown color table generator</span>
                      </div>
                    </Link>
                  </div>

                  <div className="resources-menu-divider" />

                  <div className="resources-menu-section">
                    <h4 className="resources-menu-title">Icon Documentation</h4>
                    <a
                      href="https://learn.microsoft.com/en-us/azure/architecture/icons/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resources-menu-item"
                      onClick={() => setShowResourcesMenu(false)}
                    >
                      <FiFileText size={16} />
                      <div>
                        <span className="resource-item-name">Azure Architecture Icons</span>
                        <span className="resource-item-desc">
                          Official Microsoft icon guidelines
                        </span>
                      </div>
                    </a>
                    <a
                      href="https://aws.amazon.com/architecture/icons/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resources-menu-item"
                      onClick={() => setShowResourcesMenu(false)}
                    >
                      <FiFileText size={16} />
                      <div>
                        <span className="resource-item-name">AWS Architecture Icons</span>
                        <span className="resource-item-desc">Amazon Web Services icons</span>
                      </div>
                    </a>
                  </div>

                  <div className="resources-menu-divider" />

                  <div className="resources-menu-section">
                    <h4 className="resources-menu-title">Links</h4>
                    <a
                      href={COMPANY_INFO.github.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resources-menu-item"
                      onClick={() => setShowResourcesMenu(false)}
                    >
                      <FiGithub size={16} />
                      <div>
                        <span className="resource-item-name">GitHub</span>
                        <span className="resource-item-desc">View source code</span>
                      </div>
                    </a>
                    <a
                      href="https://www.npmjs.com/package/@buun_group/precast-icons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resources-menu-item"
                      onClick={() => setShowResourcesMenu(false)}
                    >
                      <FiPackage size={16} />
                      <div>
                        <span className="resource-item-name">NPM Package</span>
                        <span className="resource-item-desc">View on NPM registry</span>
                      </div>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          <SettingsPopup />
        </nav>
      </div>
    </header>
  );
}
