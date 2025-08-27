import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export const BackButton = ({ onPress, disabled = false }) => {
  const scaleValue = new Animated.Value(1);
  const widthValue = new Animated.Value(56); // Equivalente a w-1/4 del botón de 192px
  const translateXValue = new Animated.Value(8);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(widthValue, {
        toValue: 176, // Casi todo el ancho del botón
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(translateXValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(widthValue, {
        toValue: 56,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(translateXValue, {
        toValue: 8,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    // Animación de feedback táctil
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  const BackIcon = () => (
    <Svg width={25} height={25} viewBox="0 0 1024 1024">
      <Path
        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        fill="#000000"
      />
      <Path
        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        fill="#000000"
      />
    </Svg>
  );

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={1}
      >
        {/* Fondo del botón */}
        <View style={styles.buttonBackground} />
        
        {/* Elemento animado verde */}
        <Animated.View style={[styles.greenElement, { width: widthValue }]}>
          <BackIcon />
        </Animated.View>
        
        {/* Texto */}
        <Animated.Text 
          style={[
            styles.buttonText,
            { transform: [{ translateX: translateXValue }] }
          ]}
        >
          Go Back
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  button: {
    width: 192,
    height: 56,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  greenElement: {
    position: 'absolute',
    left: 4,
    top: 4,
    height: 48,
    backgroundColor: '#4ade80', // green-400
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    position: 'absolute',
  },
});
