import axios from 'axios';

const API_KEY = 'd8a1a2f3'; // Example key - user should replace with their own from omdbapi.com
const BASE_URL = 'https://www.omdbapi.com/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    apikey: API_KEY,
    type: 'movie',
  },
});

// Add request interceptor for error handling
api.interceptors.request.use(config => {
  if (!API_KEY || API_KEY.includes('YOUR')) {
    throw new Error('Invalid API key configuration');
  }
  return config;
});

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('', {
      params: {
        s: query,
        page,
      },
    });
    
    if (response.data.Error) {
      throw new Error(response.data.Error);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await api.get('', {
      params: {
        i: id,
        plot: 'full',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export default {
  searchMovies,
  getMovieDetails,
};