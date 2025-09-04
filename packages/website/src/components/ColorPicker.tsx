import { useState } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

const presetColors = [
  '#000000',
  '#ffffff',
  '#6b7280',
  '#374151',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#22c55e',
  '#10b981',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#ec4899',
  '#f43f5e',
  '#14b8a6',
  '#84cc16',
];

export function ColorPicker({ value, onChange, disabled }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value);

  const handlePresetClick = (color: string) => {
    if (disabled) return;
    onChange(color);
    setIsOpen(false);
  };

  const handleCustomChange = (color: string) => {
    if (disabled) return;
    setCustomColor(color);
    onChange(color);
  };

  return (
    <div className={`color-picker ${disabled ? 'disabled' : ''}`}>
      <div className="color-picker-preview" onClick={() => !disabled && setIsOpen(!isOpen)}>
        <div className="color-swatch" style={{ backgroundColor: value }} />
        <span className="color-value">{value}</span>
        <svg
          className={`color-picker-arrow ${isOpen ? 'open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {isOpen && (
        <div className="color-picker-dropdown">
          <div className="color-picker-section">
            <h4>Preset Colors</h4>
            <div className="color-preset-grid">
              {presetColors.map(color => (
                <button
                  key={color}
                  className={`color-preset-swatch ${value === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handlePresetClick(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="color-picker-section">
            <h4>Custom Color</h4>
            <div className="custom-color-input">
              <input
                type="color"
                value={customColor}
                onChange={e => handleCustomChange(e.target.value)}
                className="color-input-native"
                disabled={disabled}
              />
              <input
                type="text"
                value={customColor}
                onChange={e => handleCustomChange(e.target.value)}
                className="color-input-text"
                placeholder="#000000"
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
