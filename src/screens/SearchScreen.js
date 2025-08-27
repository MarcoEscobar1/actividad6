import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Keyboard,
  Alert,
} from 'react-native';
import { BookCard } from '../components/BookCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SearchButton } from '../components/SearchButton';
import { FavoritesNavButton } from '../components/FavoritesNavButton';
import { GoogleBooksAPI } from '../services/googleBooksAPI';

export const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Por favor ingresa un término de búsqueda');
      return;
    }

    setLoading(true);
    setError(null);
    Keyboard.dismiss();

    try {
      const results = await GoogleBooksAPI.searchBooks(searchQuery.trim());
      setBooks(results);
      setHasSearched(true);
    } catch (err) {
      setError(err.message || 'Error al buscar libros');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookPress = (book) => {
    navigation.navigate('BookDetails', { book });
  };

  const renderEmptyState = () => {
    if (loading) {
      return <LoadingSpinner message="Buscando libros..." />;
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={searchBooks} />;
    }

    if (hasSearched && books.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No se encontraron libros</Text>
          <Text style={styles.emptyMessage}>
            Intenta buscar con diferentes palabras clave
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Bienvenido al Buscador de Libros</Text>
        <Text style={styles.welcomeMessage}>
          Busca libros usando la API de Google Books. Ingresa un título, autor o palabra clave para comenzar.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscador de Libros</Text>
        <FavoritesNavButton 
          onPress={() => navigation.navigate('Favorites')}
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar libros..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchBooks}
          returnKeyType="search"
        />
        <SearchButton
          onPress={searchBooks}
          disabled={loading}
          loading={loading}
        />
      </View>

      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={handleBookPress} />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={books.length === 0 ? styles.emptyListContainer : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    marginRight: 12,
  },
  emptyListContainer: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
