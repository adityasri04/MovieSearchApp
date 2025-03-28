import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import { searchMovies } from '../services/api';
import { getFavorites, saveFavorite, removeFavorite, isFavorite } from '../utils/storage';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      setLoading(true);
      setPage(1);
      try {
        const result = await searchMovies(text, 1);
        if (result.Response === 'False') {
          setMovies([]);
          Alert.alert('No Results', `No movies found for "${text}"`);
        } else {
          setMovies(result.Search || []);
          setTotalResults(result.totalResults || 0);
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'Failed to search movies');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    } else {
      setMovies([]);
    }
  };

  const loadMore = async () => {
    if (movies.length < totalResults && !loading) {
      setLoading(true);
      try {
        const result = await searchMovies(query, page + 1);
        setMovies([...movies, ...(result.Search || [])]);
        setPage(page + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleFavorite = async (movie) => {
    try {
      const isFav = await isFavorite(movie.imdbID);
      if (isFav) {
        await removeFavorite(movie.imdbID);
      } else {
        await saveFavorite(movie);
      }
      loadFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    >
      <Image
        source={{ uri: item.Poster }}
        style={styles.poster}
        resizeMode="contain"
      />
      <View style={styles.movieInfo}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.year}>{item.Year}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Ionicons
          name={favorites.some(fav => fav.imdbID === item.imdbID) ? 'heart' : 'heart-outline'}
          size={24}
          color={favorites.some(fav => fav.imdbID === item.imdbID) ? 'red' : '#999'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {loading && movies.length === 0 ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.imdbID}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  year: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    marginTop: 20,
  },
  footer: {
    padding: 10,
  },
});

export default HomeScreen;