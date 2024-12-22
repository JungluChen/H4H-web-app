import React, { useState } from 'react';

interface LocationPickerProps {
  onLocationSelect: (location: string) => void;
}

const LocationPicker = ({ onLocationSelect }: LocationPickerProps) => {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        const newPosition = {
          lat: location.coords.latitude,
          lon: location.coords.longitude
        };
        setPosition(newPosition);
        onLocationSelect(`${newPosition.lat}, ${newPosition.lon}`);
      });
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      if (data && data[0]) {
        const newPosition = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon)
        };
        setPosition(newPosition);
        onLocationSelect(`${newPosition.lat}, ${newPosition.lon}`);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        gap: '10px',
        marginBottom: '10px' 
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search location..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #333',
            backgroundColor: '#222',
            color: 'white'
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px',
            backgroundColor: '#007AFF',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          🔍
        </button>
      </div>

      <button
        type="button"
        onClick={handleGetCurrentLocation}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#333',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          marginBottom: '10px',
          cursor: 'pointer'
        }}
      >
        📍 Use Current Location
      </button>

      <div style={{ height: '300px', borderRadius: '10px', overflow: 'hidden' }}>
        <iframe
          title="location-map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src={position 
            ? `https://www.openstreetmap.org/export/embed.html?bbox=${position.lon-0.01}%2C${position.lat-0.01}%2C${position.lon+0.01}%2C${position.lat+0.01}&layer=mapnik&marker=${position.lat}%2C${position.lon}`
            : 'https://www.openstreetmap.org/export/embed.html?bbox=-0.1%2C51.5%2C-0.08%2C51.52&layer=mapnik'
          }
        />
      </div>

      {position && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: '#222',
          borderRadius: '5px',
          fontSize: '14px',
          color: '#999'
        }}>
          Selected location: {position.lat.toFixed(6)}, {position.lon.toFixed(6)}
        </div>
      )}

      <a
        href={position 
          ? `https://www.openstreetmap.org/?mlat=${position.lat}&mlon=${position.lon}#map=15/${position.lat}/${position.lon}`
          : 'https://www.openstreetmap.org'
        }
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          marginTop: '10px',
          color: '#007AFF',
          textDecoration: 'none',
          fontSize: '14px'
        }}
      >
        View on OpenStreetMap ↗
      </a>
    </div>
  );
};

export default LocationPicker; 