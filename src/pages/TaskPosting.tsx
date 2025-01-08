import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';
import LocationPicker from '../components/LocationPicker';

interface FormData {
  title: string;
  category: string;
  time: string;
  location: string;
  description: string;
  price: string;
  selectedDays: string[];
  startTime: string;
  endTime: string;
  country: string;
  language: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  flag?: string;
  [key: string]: string | string[] | { lat: number; lng: number; } | undefined;
}

const hideScrollbarStyle: CSSProperties = {
  padding: '20px', 
  color: 'white',
  paddingBottom: '80px',
  height: '100vh',
  overflowY: 'auto',
  msOverflowStyle: 'none' as const,  /* IE and Edge */
  scrollbarWidth: 'none' as const,   /* Firefox */
  WebkitOverflowScrolling: 'touch',  /* Smooth scrolling on iOS */
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;
document.head.appendChild(styleSheet);

const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'Korea', flag: '🇰🇷' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' }
].sort((a, b) => a.name.localeCompare(b.name));

// Add default coordinates for common locations
const locationCoordinates: { [key: string]: { lat: number, lng: number } } = {
  'Taipei': { lat: 25.0330, lng: 121.5654 },
  'Taichung': { lat: 24.1473, lng: 120.6780 },
  'Kaohsiung': { lat: 22.6273, lng: 120.3014 },
  'Tainan': { lat: 22.9997, lng: 120.2270 },
  'Hsinchu': { lat: 24.8138, lng: 120.9675 },
  'Keelung': { lat: 25.1276, lng: 121.7392 },
  // Default to Taipei Main Station if location not found
  'default': { lat: 25.0478, lng: 121.5170 }
};

const TaskPosting = () => {
  const navigate = useNavigate();
  const addTask = useTaskStore((state) => state.addTask);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    price: '',
    time: '',
    location: '',
    description: '',
    selectedDays: [],
    startTime: '',
    endTime: '',
    language: 'English',
    country: '',
    flag: 'us'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isFormValid = Object.entries(formData).every(([key, value]) => {
      if (key === 'selectedDays') {
        return (value as string[]).length > 0;
      }
      if (typeof value === 'string') {
        return value.trim() !== '';
      }
      return true;
    });
    
    if (!isFormValid) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.selectedDays.length === 0 || !formData.startTime || !formData.endTime) {
      alert('Please select days and time');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get coordinates based on location or use default
    const cityName = formData.location.split(',')[0].trim();
    const coordinates = locationCoordinates[cityName] || locationCoordinates.default;

    addTask({
      ...formData,
      price: Number(formData.price),
      postedBy: 'User',
      language: formData.language || 'English',
      flag: 'us',
      status: 'open',
      coordinates: coordinates // Add coordinates to the task
    });
    
    setIsLoading(false);
    navigate('/tasks');
  };

  const CATEGORIES = [
    'Finance',
    'Telecom',
    'Education',
    'Transport',
    'Shopping',
    'Food',
    'Healthcare',
    'Other'
  ];

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const LANGUAGES = [
    { code: 'ar', name: 'Arabic', flag: '🇦🇪' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ms', name: 'Malay', flag: '🇲🇾' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'th', name: 'Thai', flag: '🇹🇭' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLang = LANGUAGES.find(lang => 
      lang.name.toLowerCase() === e.target.value.toLowerCase()
    );
    setFormData({
      ...formData,
      language: e.target.value,
      flag: selectedLang?.flag || 'us'
    });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCountry = COUNTRIES.find(country => 
      country.name.toLowerCase() === e.target.value.toLowerCase()
    );
    setFormData({
      ...formData,
      country: e.target.value,
      flag: selectedCountry?.flag || '🌐'
    });
  };

  const renderFormField = (field: keyof FormData) => {
    // Define unified colors
    const colors = {
      background: '#222',
      text: 'white',
      border: '#333',
      label: '#000080'
    };

    const commonInputStyle: React.CSSProperties = {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: `1px solid ${colors.border}`,
      fontSize: '16px',
      boxSizing: 'border-box' as const,
      backgroundColor: colors.background,
      color: colors.text
    };

    switch (field) {
      case 'description':
        return (
          <textarea
            value={formData[field] as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            style={{
              ...commonInputStyle,
              height: '100px',
              resize: 'vertical'
            } as React.CSSProperties}
          />
        );
      case 'category':
        return (
          <select
            value={formData[field] as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            style={commonInputStyle}
          >
            <option value="" style={{ backgroundColor: colors.background }}>Select a category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} style={{ backgroundColor: colors.background }}>{cat}</option>
            ))}
          </select>
        );
      case 'time':
        return (
          <div>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {DAYS.map(day => (
                  <button
                    type="button"
                    key={day}
                    onClick={() => {
                      const newDays = formData.selectedDays.includes(day)
                        ? formData.selectedDays.filter(d => d !== day)
                        : [...formData.selectedDays, day];
                      setFormData({
                        ...formData,
                        selectedDays: newDays,
                        time: `${newDays.join(', ')} ${formData.startTime}-${formData.endTime}`
                      });
                    }}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: formData.selectedDays.includes(day) ? '#007AFF' : '#333',
                      border: 'none',
                      borderRadius: '5px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({
                  ...formData,
                  startTime: e.target.value,
                  time: `${formData.selectedDays.join(', ')} ${e.target.value}-${formData.endTime}`
                })}
                style={{
                  ...commonInputStyle,
                  flex: 1
                }}
              />
              <span style={{ alignSelf: 'center', color: colors.text }}>-</span>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({
                  ...formData,
                  endTime: e.target.value,
                  time: `${formData.selectedDays.join(', ')} ${formData.startTime}-${e.target.value}`
                })}
                style={{
                  ...commonInputStyle,
                  flex: 1
                }}
              />
            </div>
          </div>
        );
      case 'location':
        return (
          <LocationPicker
            onLocationSelect={(location) => setFormData({
              ...formData,
              location
            })}
          />
        );
      case 'language':
      case 'country':
        return (
          <div style={{ position: 'relative' }}>
            <input
              list={field === 'language' ? 'languages' : 'countries'}
              value={formData[field] as string}
              onChange={field === 'language' ? handleLanguageChange : handleCountryChange}
              placeholder={`Type or select a ${field}...`}
              style={commonInputStyle}
            />
            <datalist id={field === 'language' ? 'languages' : 'countries'}>
              {(field === 'language' ? LANGUAGES : COUNTRIES).map(item => (
                <option key={item.code} value={item.name}>
                  {item.name} {item.flag}
                </option>
              ))}
            </datalist>
          </div>
        );
      default:
        return (
          <input
            type={field === 'price' ? 'number' : 'text'}
            value={formData[field] as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            style={commonInputStyle}
          />
        );
    }
  };

  return (
    <div 
      className="hide-scrollbar"
      style={{
        ...hideScrollbarStyle,
        position: 'relative',
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '0'
      }}
    >
      <div style={{ 
        padding: '0',
        width: '100%',
        maxWidth: '390px'
      }}>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData)
            .filter(field => !['selectedDays', 'startTime', 'endTime', 'flag'].includes(field))
            .map((field) => (
              <div key={field} style={{ 
                marginBottom: '15px',
                width: '100%'
              }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '5px', 
                  textTransform: 'capitalize',
                  color: '#000080',
                  fontWeight: 'bold',
                  width: '100%'
                }}>
                  {field}
                  {field === 'price' && ' 💰'}
                  {field === 'location' && ' 📍'}
                  {field === 'time' && ' ⏰'}
                </label>
                <div style={{ width: '100%' }}>
                  {renderFormField(field as keyof FormData)}
                </div>
              </div>
            ))}

          <div style={{
            marginTop: '0',
            marginBottom: '0',
            width: '100%'
          }}>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: isLoading ? '#666' : '#000080',
                border: 'none',
                borderRadius: '5px',
                color: 'white',
                fontSize: '16px',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Posting... ⏳' : 'POST 📝'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskPosting; 