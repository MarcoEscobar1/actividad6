import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HamsterLoader } from './HamsterLoader';

export const LoadingSpinner = ({ message = 'Cargando...' }) => {
  return (
    <View style={styles.container}>
      <HamsterLoader size={120} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
