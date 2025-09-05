import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllIcons, type IconInfo, formatIconDisplayName } from '../utils/iconUtils';
import { SEO } from '../components/SEO';
import {
  FiDroplet,
  FiType,
  FiLayers,
  FiGrid,
  FiDownload,
  FiShuffle,
  FiList,
  FiDroplet as FiColor,
  FiX,
  FiFilter,
  FiPackage,
  FiLayout,
  FiHeart,
  FiNavigation,
  FiShare2,
  FiZap,
  FiFile,
  FiImage,
  FiCamera,
  FiSidebar,
  FiMaximize2,
  FiMinimize2,
  FiColumns,
  FiInbox,
} from 'react-icons/fi';

const categoryIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  All: FiGrid,
  'AI & Technology': FiZap, // Zap for AI/Tech
  'Brands & Social': FiShare2, // Share for social/brands
  Interface: FiLayout, // Layout for interface
  Actions: FiHeart, // Heart for actions
  Navigation: FiNavigation, // Navigation compass
  General: FiPackage, // Package for general items
};

interface HomePageProps {
  search: string;
  onSearchChange: (value: string) => void;
  onScrollModeChange?: (showFooter: boolean) => void;
}

type SortOption = 'default' | 'alphabetical' | 'random' | 'color';
type GridSize = 'small' | 'medium' | 'large';

export function HomePage({ search, onScrollModeChange }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [allIcons, setAllIcons] = useState<IconInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollMode, setScrollMode] = useState<'infinite' | 'pagination'>(() => {
    const mode = (localStorage.getItem('scrollMode') as 'infinite' | 'pagination') || 'pagination';
    // Call the callback on initial load
    if (onScrollModeChange) {
      onScrollModeChange(mode === 'pagination');
    }
    return mode;
  });
  const [displayedIcons, setDisplayedIcons] = useState<IconInfo[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return localStorage.getItem('filterSidebarOpen') !== 'false';
  });
  const [downloadFormat, setDownloadFormat] = useState(() => {
    return localStorage.getItem('preferredDownloadFormat') || 'svg';
  });
  const [gridSize, setGridSize] = useState<GridSize>(() => {
    return (localStorage.getItem('gridSize') as GridSize) || 'medium';
  });
  const iconsPerPage = 48;

  useEffect(() => {
    getAllIcons()
      .then(icons => {
        setAllIcons(icons);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load icons:', error);
        setLoading(false);
      });
  }, []);

  // Add class to body when sidebar is open so footer can respond
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('homepage-sidebar-open');
    } else {
      document.body.classList.remove('homepage-sidebar-open');
    }

    return () => {
      document.body.classList.remove('homepage-sidebar-open');
    };
  }, [sidebarOpen]);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(allIcons.map(icon => icon.category))];
    return cats;
  }, [allIcons]);

  const filteredIcons = useMemo(() => {
    let filtered = allIcons.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || icon.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Apply sorting
    switch (sortOption) {
      case 'alphabetical':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'random':
        filtered = [...filtered].sort(() => Math.random() - 0.5);
        break;
      case 'color':
        // Sort by brand color - icons with colors first, then by hue
        filtered = [...filtered].sort((a, b) => {
          // Icons without color go to the end
          if (!a.brandColor && !b.brandColor) return 0;
          if (!a.brandColor) return 1;
          if (!b.brandColor) return -1;

          // Convert hex to HSL for better color sorting
          const hexToHue = (hex: string) => {
            const r = parseInt(hex.slice(0, 2), 16) / 255;
            const g = parseInt(hex.slice(2, 4), 16) / 255;
            const b = parseInt(hex.slice(4, 6), 16) / 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const diff = max - min;

            if (diff === 0) return 0;

            let hue = 0;
            if (max === r) {
              hue = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
            } else if (max === g) {
              hue = ((b - r) / diff + 2) / 6;
            } else {
              hue = ((r - g) / diff + 4) / 6;
            }

            return hue * 360;
          };

          const hueA = hexToHue(a.brandColor);
          const hueB = hexToHue(b.brandColor);

          return hueA - hueB;
        });
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [allIcons, search, selectedCategory, sortOption]);

  // Infinite scroll logic
  const loadMoreIcons = useCallback(() => {
    if (isLoadingMore || displayedIcons.length >= filteredIcons.length) return;

    setIsLoadingMore(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const currentLength = displayedIcons.length;
      const nextBatch = filteredIcons.slice(currentLength, currentLength + iconsPerPage);
      setDisplayedIcons(prev => [...prev, ...nextBatch]);
      setIsLoadingMore(false);
    }, 200);
  }, [displayedIcons, filteredIcons, isLoadingMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (scrollMode !== 'infinite') return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMoreIcons();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentElement = loadMoreRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [scrollMode, loadMoreIcons, isLoadingMore]);

  const totalPages = Math.ceil(filteredIcons.length / iconsPerPage);
  const currentIcons =
    scrollMode === 'pagination'
      ? filteredIcons.slice((currentPage - 1) * iconsPerPage, currentPage * iconsPerPage)
      : displayedIcons;

  // Reset page/displayed icons when search, category or sort changes
  useEffect(() => {
    setCurrentPage(1);
    if (scrollMode === 'infinite') {
      // Reset to first page of results
      setDisplayedIcons(filteredIcons.slice(0, iconsPerPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedCategory, sortOption, scrollMode]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('filterSidebarOpen', String(newState));
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="container">
          <div className="hero">
            <h1>PRECAST Icons</h1>
            <p>Loading icons...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO />
      <div className={`home-page ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Left Sidebar */}
        <div className={`filter-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>Filters & Sort</h2>
            <button
              className="sidebar-close-btn"
              onClick={toggleSidebar}
              aria-label="Close filters"
              title="Close filters"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="sidebar-content">
            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Categories</h3>
              <div className="sidebar-filters">
                {categories.map(category => {
                  const Icon = categoryIcons[category] || FiGrid;
                  return (
                    <button
                      key={category}
                      className={`sidebar-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(category)}
                      title={`Filter by ${category}`}
                    >
                      <Icon size={18} />
                      <span>{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Sort By</h3>
              <div className="sidebar-filters">
                <button
                  className={`sidebar-filter-btn ${sortOption === 'default' ? 'active' : ''}`}
                  onClick={() => setSortOption('default')}
                  title="Default order"
                >
                  <FiGrid size={18} />
                  <span>Default</span>
                </button>
                <button
                  className={`sidebar-filter-btn ${sortOption === 'alphabetical' ? 'active' : ''}`}
                  onClick={() => setSortOption('alphabetical')}
                  title="Sort A-Z"
                >
                  <FiList size={18} />
                  <span>Alphabetical</span>
                </button>
                <button
                  className={`sidebar-filter-btn ${sortOption === 'random' ? 'active' : ''}`}
                  onClick={() => setSortOption('random')}
                  title="Random order"
                >
                  <FiShuffle size={18} />
                  <span>Random</span>
                </button>
                <button
                  className={`sidebar-filter-btn ${sortOption === 'color' ? 'active' : ''}`}
                  onClick={() => setSortOption('color')}
                  title="Group by color"
                >
                  <FiColor size={18} />
                  <span>By Color</span>
                </button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Download Format</h3>
              <div className="sidebar-filters">
                <button
                  className={`sidebar-filter-btn ${downloadFormat === 'svg' ? 'active' : ''}`}
                  onClick={() => {
                    setDownloadFormat('svg');
                    localStorage.setItem('preferredDownloadFormat', 'svg');
                  }}
                  title="SVG format"
                >
                  <FiFile size={18} />
                  <span>SVG</span>
                </button>
                <button
                  className={`sidebar-filter-btn ${downloadFormat === 'png' ? 'active' : ''}`}
                  onClick={() => {
                    setDownloadFormat('png');
                    localStorage.setItem('preferredDownloadFormat', 'png');
                  }}
                  title="PNG format"
                >
                  <FiImage size={18} />
                  <span>PNG</span>
                </button>
                <button
                  className={`sidebar-filter-btn ${downloadFormat === 'webp' ? 'active' : ''}`}
                  onClick={() => {
                    setDownloadFormat('webp');
                    localStorage.setItem('preferredDownloadFormat', 'webp');
                  }}
                  title="WebP format"
                >
                  <FiCamera size={18} />
                  <span>WebP</span>
                </button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Grid Size</h3>
              <div className="sidebar-filters">
                <button
                  className={`sidebar-filter-btn ${gridSize === 'small' ? 'active' : ''}`}
                  onClick={() => {
                    setGridSize('small');
                    localStorage.setItem('gridSize', 'small');
                  }}
                  title="Small icons"
                >
                  <FiMinimize2 size={18} />
                  <span>Small</span>
                </button>
                <button
                  className={`sidebar-filter-btn ${gridSize === 'medium' ? 'active' : ''}`}
                  onClick={() => {
                    setGridSize('medium');
                    localStorage.setItem('gridSize', 'medium');
                  }}
                  title="Medium icons"
                >
                  <FiSidebar size={18} />
                  <span>Medium</span>
                </button>
                <button
                  className={`sidebar-filter-btn ${gridSize === 'large' ? 'active' : ''}`}
                  onClick={() => {
                    setGridSize('large');
                    localStorage.setItem('gridSize', 'large');
                  }}
                  title="Large icons"
                >
                  <FiMaximize2 size={18} />
                  <span>Large</span>
                </button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Display Mode</h3>
              <div className="sidebar-filters">
                <button
                  className={`sidebar-filter-btn ${scrollMode === 'pagination' ? 'active' : ''}`}
                  onClick={() => {
                    setScrollMode('pagination');
                    localStorage.setItem('scrollMode', 'pagination');
                    setCurrentPage(1);
                    if (onScrollModeChange) {
                      onScrollModeChange(true); // Show footer for pagination
                    }
                  }}
                  title="Pagination"
                >
                  <FiColumns size={18} />
                  <span>Pages</span>
                </button>
                <button
                  className={`sidebar-filter-btn ${scrollMode === 'infinite' ? 'active' : ''}`}
                  onClick={() => {
                    setScrollMode('infinite');
                    localStorage.setItem('scrollMode', 'infinite');
                    setDisplayedIcons([]);
                    if (onScrollModeChange) {
                      onScrollModeChange(false); // Hide footer for infinite scroll
                    }
                  }}
                  title="Infinite scroll"
                >
                  <FiInbox size={18} />
                  <span>Infinite</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle button when sidebar is closed */}
        {!sidebarOpen && (
          <button
            className="sidebar-toggle-tab"
            onClick={toggleSidebar}
            aria-label="Open filters"
            title="Open filters"
          >
            <FiFilter size={20} />
          </button>
        )}

        {/* Mobile overlay when sidebar is open */}
        {sidebarOpen && (
          <div className="mobile-overlay" onClick={toggleSidebar} aria-label="Close sidebar" />
        )}

        {/* Main Content */}
        <div className="home-content">
          <div className="container">
            <div className={`icons-grid grid-size-${gridSize}`}>
              {currentIcons.map(icon => (
                <IconCard
                  key={icon.id || `${icon.slug}-${icon.name}`}
                  icon={icon}
                  downloadFormat={downloadFormat}
                />
              ))}
            </div>

            {scrollMode === 'pagination' && totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  Previous
                </button>

                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}

            {scrollMode === 'infinite' && displayedIcons.length < filteredIcons.length && (
              <div ref={loadMoreRef} className="load-more-trigger">
                {isLoadingMore && (
                  <div className="loading-indicator">
                    <div className="spinner"></div>
                    <span>Loading more icons...</span>
                  </div>
                )}
              </div>
            )}

            <div className="results-info">
              {scrollMode === 'pagination'
                ? `Showing ${currentIcons.length} of ${filteredIcons.length} icons`
                : `Showing ${displayedIcons.length} of ${filteredIcons.length} icons`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface IconCardProps {
  icon: IconInfo;
  downloadFormat: string;
}

function IconCard({ icon, downloadFormat }: IconCardProps) {
  const IconComponent = icon.component;
  const [copied, setCopied] = useState(false);

  // Format icon name with proper spacing
  const displayName = formatIconDisplayName(icon.name);

  // Use brand color if available, otherwise default to black
  const iconColor = icon.brandColor ? `#${icon.brandColor}` : '#000000';

  const handleCopyColor = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    navigator.clipboard.writeText(iconColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickDownload = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    try {
      const { generateSVG, downloadSVG } = await import('../utils/iconUtils');
      const svgContent = await generateSVG(icon, 24, iconColor);

      if (downloadFormat === 'svg') {
        downloadSVG(icon.name, svgContent);
      } else {
        // Convert to PNG/WebP
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
          canvas.width = 24;
          canvas.height = 24;
          if (ctx) {
            ctx.drawImage(img, 0, 0, 24, 24);
            canvas.toBlob(blob => {
              if (blob) {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `${icon.name}.${downloadFormat}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }
            }, `image/${downloadFormat}`);
          }
          URL.revokeObjectURL(url);
        };
        img.src = url;
      }
    } catch (error) {
      console.error('Quick download failed:', error);
    }
  };

  return (
    <Link to={`/icon/${icon.slug}`} className="icon-card">
      <div className="icon-card-download">
        <button
          className="quick-download-btn"
          onClick={handleQuickDownload}
          title={`Download ${downloadFormat.toUpperCase()}`}
        >
          <FiDownload size={16} />
        </button>
      </div>
      <div className="icon-preview" style={{ color: iconColor }}>
        <IconComponent size={32} color={iconColor} />
      </div>
      <div className="icon-info">
        <h3 className="icon-name">{displayName}</h3>
        <div className="icon-meta">
          <span className="category">{icon.category}</span>
          <div className="badges">
            {icon.variants && icon.variants.length > 1 && (
              <span className="badge variants" title={`${icon.variants.length} variants available`}>
                <FiLayers size={14} />
                <span>{icon.variants.length} variants</span>
              </span>
            )}
            {icon.hasColor && !icon.variants && (
              <span className="badge color" title="Supports color variations">
                <FiDroplet size={14} />
                <span>Color</span>
              </span>
            )}
            {icon.hasText && !icon.variants && (
              <span className="badge text" title="Contains text elements">
                <FiType size={14} />
                <span>Text</span>
              </span>
            )}
            {!icon.hasColor && !icon.hasText && !icon.variants && (
              <div style={{ height: '20px' }}></div> // Spacer for consistency
            )}
          </div>
        </div>
      </div>
      <div
        className="color-display"
        onClick={handleCopyColor}
        title={copied ? 'Copied!' : 'Click to copy hex code'}
      >
        <span className="color-hex">{copied ? 'Copied!' : iconColor}</span>
        <span className="color-dot" style={{ backgroundColor: iconColor }}></span>
      </div>
    </Link>
  );
}
