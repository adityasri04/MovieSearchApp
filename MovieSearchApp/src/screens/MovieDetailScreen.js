import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.posterContainer}>
        <Image 
          source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster' }} 
          style={styles.poster}
          resizeMode="contain"
        />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>{movie.imdbRating}/10</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.Title}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>{movie.Year}</Text>
          <Text style={styles.metaText}> | </Text>
          <Text style={styles.metaText}>{movie.Runtime}</Text>
          <Text style={styles.metaText}> | </Text>
          <Text style={styles.metaText}>{movie.Genre}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}>{movie.imdbRating}/10</Text>
        </View>
        <Text style={styles.plot}>{movie.Plot}</Text>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Director</Text>
          <Text style={styles.sectionText}>{movie.Director}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Cast</Text>
          <Text style={styles.sectionText}>{movie.Actors}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  posterContainer: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: 300,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  metaText: {
    fontSize: 16,
    color: '#666',
    marginRight: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
  },
  plot: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#444',
  },
});

export default MovieDetailScreen;