import React from 'react';
import {
  HomeIcon,
  SearchIcon,
  UserIcon,
  HeartIcon,
  StarIcon,
  MenuIcon,
  CheckIcon,
  DownloadIcon,
  UploadIcon,
} from '@precast/icons/react';

export function IconShowcase() {
  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Precast Icons - React Examples</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        A comprehensive showcase of icon usage patterns in React applications
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          Basic Icons
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <HomeIcon />
          <SearchIcon />
          <UserIcon />
          <HeartIcon />
          <StarIcon />
          <MenuIcon />
          <CheckIcon />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          Size Variations
        </h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <HomeIcon size={16} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>16px</p>
          </div>
          <div>
            <HomeIcon size={24} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
              24px (default)
            </p>
          </div>
          <div>
            <HomeIcon size={32} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>32px</p>
          </div>
          <div>
            <HomeIcon size={48} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>48px</p>
          </div>
          <div>
            <HomeIcon size={64} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>64px</p>
          </div>
          <div>
            <HomeIcon size="5rem" />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>5rem</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          Color Customization
        </h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <HeartIcon size={32} color="red" />
          <StarIcon size={32} color="gold" />
          <CheckIcon size={32} color="green" />
          <SearchIcon size={32} color="#3b82f6" />
          <UserIcon size={32} color="#8b5cf6" />
          <MenuIcon size={32} color="#10b981" />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          Stroke Width
        </h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <SearchIcon size={32} strokeWidth={0.5} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>0.5</p>
          </div>
          <div>
            <SearchIcon size={32} strokeWidth={1} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>1</p>
          </div>
          <div>
            <SearchIcon size={32} strokeWidth={2} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>2 (default)</p>
          </div>
          <div>
            <SearchIcon size={32} strokeWidth={3} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>3</p>
          </div>
          <div>
            <SearchIcon size={32} strokeWidth={4} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>4</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          Fill and Stroke Combinations
        </h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <HeartIcon size={32} fill="pink" stroke="red" strokeWidth={2} />
          <StarIcon size={32} fill="yellow" stroke="orange" strokeWidth={2} />
          <UserIcon size={32} fill="lightblue" stroke="navy" strokeWidth={2} />
          <HeartIcon size={32} fill="red" stroke="none" />
          <StarIcon size={32} fill="gold" stroke="none" />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          Monochrome Mode
        </h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <HeartIcon size={32} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Normal</p>
          </div>
          <div>
            <HeartIcon size={32} mono color="red" />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Mono Red</p>
          </div>
          <div>
            <StarIcon size={32} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Normal</p>
          </div>
          <div>
            <StarIcon size={32} mono color="gold" />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Mono Gold</p>
          </div>
          <div>
            <UserIcon size={32} />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Normal</p>
          </div>
          <div>
            <UserIcon size={32} mono color="#3b82f6" />
            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>Mono Blue</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          Interactive Examples
        </h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              border: '2px solid #3b82f6',
              borderRadius: '0.5rem',
              background: 'white',
              color: '#3b82f6',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#3b82f6';
            }}
          >
            <DownloadIcon size={20} />
            Download
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              border: '2px solid #10b981',
              borderRadius: '0.5rem',
              background: '#10b981',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <CheckIcon size={20} />
            Success
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '0.5rem',
              background: '#ef4444',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#dc2626';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#ef4444';
            }}
          >
            Cancel
          </button>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          Navigation Components
        </h2>
        <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
            }}
          >
            <HomeIcon size={20} />
            <span>Home</span>
          </a>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
            }}
          >
            <UserIcon size={20} />
            <span>Profile</span>
          </a>
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#374151',
              textDecoration: 'none',
            }}
          >
            <MenuIcon size={20} />
            <span>Menu</span>
          </a>
        </nav>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          List Items with Icons
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}
          >
            <CheckIcon size={20} color="green" />
            <span>Task completed successfully</span>
          </li>
          <li
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}
          >
            <StarIcon size={20} color="orange" />
            <span>Important: Review required</span>
          </li>
          <li
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}
          >
            <HeartIcon size={20} color="red" />
            <span>Favorite item</span>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '0.5rem',
          }}
        >
          Animated Icons
        </h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ animation: 'spin 2s linear infinite' }}>
            <StarIcon size={32} />
          </div>
          <div style={{ animation: 'pulse 2s ease-in-out infinite' }}>
            <HeartIcon size={32} color="red" />
          </div>
          <div style={{ animation: 'bounce 1s ease-in-out infinite' }}>
            <DownloadIcon size={32} color="#3b82f6" />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

// Example: Dynamic icon loading
export function DynamicIconExample() {
  const [selectedIcon, setSelectedIcon] = React.useState('home');
  const icons = {
    home: HomeIcon,
    search: SearchIcon,
    user: UserIcon,
    menu: MenuIcon,
    heart: HeartIcon,
  };

  const IconComponent = icons[selectedIcon];

  return (
    <div style={{ padding: '2rem' }}>
      <h3>Dynamic Icon Selection</h3>
      <select
        value={selectedIcon}
        onChange={e => setSelectedIcon(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      >
        {Object.keys(icons).map(key => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <div>
        <IconComponent size={48} color="#3b82f6" />
      </div>
    </div>
  );
}
