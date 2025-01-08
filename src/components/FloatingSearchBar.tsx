import React from 'react';

interface FloatingSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick?: () => void;
  placeholder?: string;
}

const FloatingSearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  onFilterClick, 
  placeholder = "🔍 Search..."
}: FloatingSearchBarProps) => {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      backgroundColor: '#f5f5f5',
      padding: '20px',
      zIndex: 100,
      display: 'flex',
      gap: '10px',
      margin: '-20px -20px 20px -20px',
      borderBottom: '1px solid #eee',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #333',
          backgroundColor: '#222',
          color: 'white'
        }}
      />
      {onFilterClick && (
        <button
          onClick={onFilterClick}
          style={{
            padding: '10px',
            backgroundColor: '#222',
            border: '1px solid #333',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          ⚙️ Filter
        </button>
      )}
    </div>
  );
};

export default FloatingSearchBar; 