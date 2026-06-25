import React, { useEffect, useState } from 'react';
import { fetchTopHeadlines } from '../services/apiServices';

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchTopHeadlines('general', API_KEY);
        const validArticles = data.filter(article => article.urlToImage);
        setArticles(validArticles);
      } catch (error) {
        console.error("Failed to load news");
      }
    };
    loadNews();
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 2000);
    return () => clearInterval(intervalId); 
  }, [articles]);

  if (articles.length === 0) {
    return (
      <div className="news-widget-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        Loading news...
      </div>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <div className="news-widget-container fade-in">
      {/* Responsive Image Section */}
      <div className="news-image-wrapper">
        <img 
          src={currentArticle.urlToImage} 
          alt="news headline" 
          className="news-image" 
        />
      </div>
      
      {/* Title Overlay */}
      <div className="news-title-overlay">
        <h2>{currentArticle.title}</h2>
      </div>

      {/* Description Section */}
      <div className="news-content">
        <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: '1.6' }}>
          {currentArticle.description || "No description available for this article."}
        </p>
      </div>
    </div>
  );
};

export default NewsWidget;