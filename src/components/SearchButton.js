import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

export const SearchButton = ({ onPress, disabled = false, loading = false }) => {
  const scaleValue = new Animated.Value(1);
  const shadowValue = new Animated.Value(8);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shadowValue, {
        toValue: 2,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shadowValue, {
        toValue: 8,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePress = () => {
    // Animación de hover/press
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(shadowValue, {
          toValue: 15,
          duration: 150,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(shadowValue, {
          toValue: 8,
          duration: 150,
          useNativeDriver: false,
        }),
      ]),
    ]).start();

    onPress();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleValue }],
          shadowOffset: {
            width: 0,
            height: shadowValue,
          },
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          disabled && styles.buttonDisabled,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.buttonText,
          disabled && styles.buttonTextDisabled,
        ]}>
          {loading ? 'SEARCHING...' : 'SEARCH'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#fff',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  buttonDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    fontWeight: '500',
    color: '#000',
  },
  buttonTextDisabled: {
    color: '#888',
  },
});
