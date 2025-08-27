import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const FavoritesNavButton = ({ onPress }) => {
  const scaleValue = new Animated.Value(1);
  const widthValue = new Animated.Value(60);
  const iconScaleValue = new Animated.Value(1);
  const titleScaleValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(widthValue, {
        toValue: 140,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(iconScaleValue, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(titleScaleValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(widthValue, {
        toValue: 60,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(titleScaleValue, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(iconScaleValue, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
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

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View style={[styles.button, { width: widthValue }]}>
          {/* Gradiente de fondo */}
          <Animated.View style={[styles.gradientBackground, { opacity: opacityValue }]}>
            <LinearGradient
              colors={['#FF9966', '#FF5E62']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            />
          </Animated.View>

          {/* Efecto de blur/glow */}
          <Animated.View style={[styles.glowEffect, { opacity: opacityValue }]}>
            <LinearGradient
              colors={['#FF9966', '#FF5E62']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.glowGradient}
            />
          </Animated.View>

          {/* Contenido */}
          <View style={styles.content}>
            <Animated.Text 
              style={[
                styles.icon, 
                { transform: [{ scale: iconScaleValue }] }
              ]}
            >
              ❤️
            </Animated.Text>
            <Animated.Text 
              style={[
                styles.title, 
                { transform: [{ scale: titleScaleValue }] }
              ]}
            >
              FAVOURITE
            </Animated.Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  touchable: {
    position: 'relative',
  },
  button: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 10,
    position: 'relative',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
    zIndex: 1,
  },
  gradient: {
    flex: 1,
    borderRadius: 60,
  },
  glowEffect: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: -10,
    borderRadius: 60,
    zIndex: 0,
  },
  glowGradient: {
    flex: 1,
    borderRadius: 60,
    opacity: 0.5,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 28,
    position: 'absolute',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    position: 'absolute',
  },
});
