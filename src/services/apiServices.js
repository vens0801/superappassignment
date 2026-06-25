import axios from "axios";

// ==========================================
// 1. Weather API Configuration (OpenWeatherMap)
// ==========================================
const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export const fetchCurrentWeather = async (city, apiKey) => {
  try {
    // Fetches current weather data. 'units=metric' ensures temperature is in Celsius.
    const response = await weatherClient.get(`/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error("Weather service failure:", error);
    throw error;
  }
};


// ==========================================
// 2. News API Configuration (NewsAPI.org)
// ==========================================
const newsClient = axios.create({
  baseURL: "https://newsapi.org/v2",
});

export const fetchTopHeadlines = async (category = "general", apiKey) => {
  try {
    // Fetches top headlines for a specific category in English.
    const response = await newsClient.get(`/top-headlines?category=${category}&language=en&apiKey=${apiKey}`);
    return response.data.articles || [];
  } catch (error) {
    console.error("News service failure:", error);
    throw error;
  }
};


// ==========================================
// 3. Movie API Configuration (OMDb API)
// ==========================================
const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

// Fetches a list of movies based on a search query (like "Action" or "Comedy")
export const searchMovieByGenre = async (query, apiKey) => {
  try {
    const response = await movieClient.get(`/?s=${encodeURIComponent(query)}&type=movie&apikey=${apiKey}`);
    return response.data.Search || [];
  } catch (error) {
    console.error("Movie list query service failure:", error);
    throw error;
  }
};

// (Optional but recommended) Fetches detailed information for a single movie using its ID
export const fetchMovieDetails = async (imdbID, apiKey) => {
  try {
    const response = await movieClient.get(`/?i=${imdbID}&plot=full&apikey=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error("Movie detail query error:", error);
    throw error;
  }
};