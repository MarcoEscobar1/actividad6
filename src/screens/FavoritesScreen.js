import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BookCard } from '../components/BookCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BackButton } from '../components/BackButton';
import { FavoritesService } from '../services/favoritesService';

export const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const favBooks = await FavoritesService.getFavorites();
      setFavorites(favBooks);
    } catch (error) {
      console.error('Error loading favorites:', error);
      Alert.alert('Error', 'Error al cargar libros favoritos');
    } finally {
      setLoading(false);
    }
  };

  const handleBookPress = (book) => {
    navigation.navigate('BookDetails', { book });
  };

  const handleClearFavorites = () => {
    Alert.alert(
      'Limpiar Todos los Favoritos',
      '¿Estás seguro de que quieres eliminar todos los libros de favoritos? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Limpiar Todo',
          style: 'destructive',
          onPress: clearAllFavorites,
        },
      ]
    );
  };

  const clearAllFavorites = async () => {
    try {
      await FavoritesService.clearFavorites();
      setFavorites([]);
      Alert.alert('Éxito', 'Todos los favoritos han sido eliminados');
    } catch (error) {
      Alert.alert('Error', 'Error al limpiar favoritos');
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Sin Libros Favoritos</Text>
      <Text style={styles.emptyMessage}>
        Los libros que agregues a favoritos aparecerán aquí. ¡Comienza buscando libros y agrégalos a tus favoritos!
      </Text>
      <TouchableOpacity 
        style={styles.searchButton}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.searchButtonText}>Buscar Libros</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerSubtitle}>
        {favorites.length} libro{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}
      </Text>
      {favorites.length > 0 && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearFavorites}
        >
          <Text style={styles.clearButtonText}>Limpiar Todo</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return <LoadingSpinner message="Cargando tus libros favoritos..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Mis Favoritos</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={handleBookPress} />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={favorites.length > 0 ? renderHeader : null}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={favorites.length === 0 ? styles.emptyListContainer : styles.listContainer}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  clearButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyListContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
