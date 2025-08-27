import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const BookCard = ({ book, onPress }) => {
  const authorsText = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;
  
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(book)}>
      <View style={styles.imageContainer}>
        {book.thumbnail ? (
          <Image 
            source={{ uri: book.thumbnail }} 
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>Sin Imagen</Text>
          </View>
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.authors} numberOfLines={1}>{authorsText}</Text>
        {book.publishedDate && (
          <Text style={styles.publishedDate}>{book.publishedDate}</Text>
        )}
        {book.averageRating > 0 && (
          <Text style={styles.rating}>
            ⭐ {book.averageRating.toFixed(1)} ({book.ratingsCount})
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    marginRight: 12,
  },
  thumbnail: {
    width: 60,
    height: 90,
    borderRadius: 4,
  },
  noImageContainer: {
    width: 60,
    height: 90,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 10,
    color: '#888',
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  authors: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  publishedDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#ff6b35',
    fontWeight: '500',
  },
});
