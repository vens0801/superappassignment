import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { searchMovieByGenre } from '../services/apiServices';

const Movies = () => {
  const categories = useStore(state => state.categories);
  const [moviesData, setMoviesData] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      const data = {};
      for (const cat of categories) {
        try {
          // Uses the OMDB API key from your .env file
          const results = await searchMovieByGenre(cat, import.meta.env.VITE_OMDB_API_KEY);
          if (results && results.length > 0) {
            data[cat] = results.slice(0, 4); // Grabs the first 4 movies
          }
        } catch (e) {
          console.error(`Failed to fetch movies for ${cat}`, e);
        }
      }
      setMoviesData(data);
    };
    
    // Only fetch if categories exist
    if (categories.length > 0) {
      fetchAllMovies();
    }
  }, [categories]);

  // Fallback if user refreshes the page directly on /movies
  if (categories.length === 0) {
    return (
      <div className="app-container fade-in" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No categories selected!</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Please go back to the Categories page and select at least 3 categories.</p>
      </div>
    );
  }

  return (
    <div className="app-container fade-in">
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>Super App</h1>
        <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'var(--accent-purple)' }}></div>
      </header>
      
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Entertainment discovery according to your choices</p>

      {/* Movie Rows mapped by Category */}
      {categories.map(category => (
        <div key={category} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'capitalize', color: 'var(--text-secondary)' }}>
            {category}
          </h2>
          
          <div className="horizontal-scroll-container">
            {moviesData[category] ? moviesData[category].map(movie => (
              <div 
                key={movie.imdbID} 
                className="interactive-card"
                style={{ minWidth: '200px', height: '300px', flexShrink: 0 }}
                onClick={() => setSelectedMovie(movie)}
              >
                {/* Fallback for movies missing a poster from the API */}
                <img 
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Poster"} 
                  alt={movie.Title} 
                />
              </div>
            )) : (
              <p style={{ color: 'var(--text-muted)' }}>Loading movies...</p>
            )}
          </div>
        </div>
      ))}

      {/* Modal Overlay for Movie Details */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div 
            className="widget-panel fade-in" 
            style={{ display: 'flex', width: '60%', maxWidth: '800px', padding: 0, overflow: 'hidden', position: 'relative' }}
            onClick={(e) => e.stopPropagation()} /* Prevents closing when clicking inside the card */
          >
            <button 
              onClick={() => setSelectedMovie(null)}
              style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', zIndex: 10 }}
            >
              ✕
            </button>
            <img 
              src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "https://via.placeholder.com/300x450"} 
              alt="poster" 
              style={{ width: '33.33%', objectFit: 'cover' }} 
            />
            <div style={{ padding: '2rem', width: '66.66%' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.1' }}>{selectedMovie.Title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Year: {selectedMovie.Year}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: '1.6' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;