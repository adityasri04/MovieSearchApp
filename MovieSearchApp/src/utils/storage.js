import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@MovieSearchApp:favorites';

export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error getting favorites:', e);
    return [];
  }
};

export const saveFavorite = async (movie) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = [...favorites, movie];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return newFavorites;
  } catch (e) {
    console.error('Error saving favorite:', e);
    throw e;
  }
};

export const removeFavorite = async (imdbID) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return newFavorites;
  } catch (e) {
    console.error('Error removing favorite:', e);
    throw e;
  }
};

export const isFavorite = async (imdbID) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(movie => movie.imdbID === imdbID);
  } catch (e) {
    console.error('Error checking favorite:', e);
    return false;
  }
};
