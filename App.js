import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchScreen } from './src/screens/SearchScreen';
import { BookDetailsScreen } from './src/screens/BookDetailsScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Search"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Search" 
          component={SearchScreen}
          options={{ title: 'Buscador de Libros' }}
        />
        <Stack.Screen 
          name="BookDetails" 
          component={BookDetailsScreen}
          options={{ title: 'Detalles del Libro' }}
        />
        <Stack.Screen 
          name="Favorites" 
          component={FavoritesScreen}
          options={{ title: 'Mis Favoritos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
