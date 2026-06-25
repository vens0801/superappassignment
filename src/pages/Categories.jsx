import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

// Exact color palette mapped from your design reference
const CATEGORY_DATA = [
  { id: 'action', name: 'Action', color: '#FF5209' },
  { id: 'drama', name: 'Drama', color: '#D7A4FF' },
  { id: 'romance', name: 'Romance', color: '#148A08' },
  { id: 'thriller', name: 'Thriller', color: '#84C2FF' },
  { id: 'fantasy', name: 'Fantasy', color: '#FF4ADE' },
  { id: 'music', name: 'Music', color: '#E61E32' },
  { id: 'comedy', name: 'Comedy', color: '#FFC83F' },
  { id: 'fiction', name: 'Fiction', color: '#6AD4FF' },
];

const Categories = () => {
  const { categories, setCategories } = useStore();
  const navigate = useNavigate();

  // Logic to add or remove a category when clicked
  const toggleCategory = (categoryName) => {
    if (categories.includes(categoryName)) {
      setCategories(categories.filter(c => c !== categoryName));
    } else {
      setCategories([...categories, categoryName]);
    }
  };

  // Logic to advance to the dashboard ONLY if 3 or more are selected
  const handleNext = () => {
    if (categories.length >= 3) {
      navigate('/dashboard');
    }
  };

  // ... (keep the imports and logic at the top the same)

  return (
    <div className="app-container fade-in categories-layout">
      
      {/* Left Side: Header & Selected Chips */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent-green)', marginBottom: '1.5rem' }}>Super App</h1>
        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '2rem' }}>
          Choose your<br />entertainment<br />category
        </h2>
        
        {/* Selected Chips Area */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
          {categories.map(cat => (
             /* ... Keep chip mapping the same ... */
            <span key={cat} style={{ backgroundColor: 'var(--accent-green)', color: '#000', padding: '0.5rem 1.25rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
              {cat} 
              <button onClick={() => toggleCategory(cat)} style={{ background: 'transparent', border: 'none', color: '#000', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>✕</button>
            </span>
          ))}
        </div>
        {categories.length < 3 && (
          <p style={{ color: 'var(--accent-red)', marginTop: '1.5rem' }}>⚠️ Minimum 3 categories required</p>
        )}
      </div>

      {/* Right Side: Category Grid & Next Button */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* THIS IS THE NEW RESPONSIVE GRID CLASS */}
        <div className="categories-grid">
          {CATEGORY_DATA.map((cat) => {
            const isSelected = categories.includes(cat.name);
            return (
              <div 
                key={cat.id}
                onClick={() => toggleCategory(cat.name)}
                className="interactive-card"
                style={{ 
                  backgroundColor: cat.color, 
                  height: '140px', 
                  padding: '1rem', 
                  borderRadius: '1rem',
                  border: isSelected ? '4px solid var(--accent-green)' : '4px solid transparent',
                }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#fff' }}>{cat.name}</h3>
              </div>
            );
          })}
        </div>
        
        <button 
          onClick={handleNext}
          disabled={categories.length < 3}
          className="btn-primary"
          style={{ alignSelf: 'flex-end', opacity: categories.length < 3 ? 0.5 : 1, cursor: categories.length < 3 ? 'not-allowed' : 'pointer' }}
        >
          Next Page
        </button>
      </div>

    </div>
  );
};
export default Categories;