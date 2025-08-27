import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

export const HamsterLoader = ({ size = 140 }) => {
  // Valores de animación para cada página
  const page2Rotation = useRef(new Animated.Value(0)).current;
  const page2Opacity = useRef(new Animated.Value(0)).current;
  const page3Rotation = useRef(new Animated.Value(0)).current;
  const page3Opacity = useRef(new Animated.Value(0)).current;
  const page4Rotation = useRef(new Animated.Value(0)).current;
  const page4Opacity = useRef(new Animated.Value(0)).current;
  const page5Rotation = useRef(new Animated.Value(0)).current;
  const page5Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = 3000;

    // Animación para página 2
    const page2Animation = Animated.loop(
      Animated.sequence([
        // 0-20%: aparece
        Animated.parallel([
          Animated.timing(page2Rotation, {
            toValue: 0.2,
            duration: duration * 0.2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(page2Opacity, {
            toValue: 1,
            duration: duration * 0.2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        // 20-35%: visible
        Animated.delay(duration * 0.15),
        // 35-50%: se voltea
        Animated.parallel([
          Animated.timing(page2Rotation, {
            toValue: 1,
            duration: duration * 0.15,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(page2Opacity, {
            toValue: 0,
            duration: duration * 0.15,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        // 50-100%: invisible
        Animated.delay(duration * 0.5),
      ])
    );

    // Animación para página 3
    const page3Animation = Animated.loop(
      Animated.sequence([
        // 0-15%: espera
        Animated.delay(duration * 0.15),
        // 15-35%: aparece
        Animated.parallel([
          Animated.timing(page3Rotation, {
            toValue: 0.35,
            duration: duration * 0.2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(page3Opacity, {
            toValue: 1,
            duration: duration * 0.2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        // 35-50%: visible
        Animated.delay(duration * 0.15),
        // 50-65%: se voltea
        Animated.parallel([
          Animated.timing(page3Rotation, {
            toValue: 1,
            duration: duration * 0.15,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(page3Opacity, {
            toValue: 0,
            duration: duration * 0.15,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        // 65-100%: invisible
        Animated.delay(duration * 0.35),
      ])
    );

    // Animación para página 4
    const page4Animation = Animated.loop(
      Animated.sequence([
        // 0-30%: espera
        Animated.delay(duration * 0.3),
        // 30-50%: aparece
        Animated.parallel([
          Animated.timing(page4Rotation, {
            toValue: 0.5,
            duration: duration * 0.2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(page4Opacity, {
            toValue: 1,
            duration: duration * 0.2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        // 50-65%: visible
        Animated.delay(duration * 0.15),
        // 65-80%: se voltea
        Animated.parallel([
          Animated.timing(page4Rotation, {
            toValue: 1,
            duration: duration * 0.15,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(page4Opacity, {
            toValue: 0,
            duration: duration * 0.15,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        // 80-100%: invisible
        Animated.delay(duration * 0.2),
      ])
    );

    // Animación para página 5
    const page5Animation = Animated.loop(
      Animated.sequence([
        // 0-45%: espera
        Animated.delay(duration * 0.45),
        // 45-65%: aparece
        Animated.parallel([
          Animated.timing(page5Rotation, {
            toValue: 0.65,
            duration: duration * 0.2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(page5Opacity, {
            toValue: 1,
            duration: duration * 0.2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        // 65-80%: visible
        Animated.delay(duration * 0.15),
        // 80-95%: se voltea
        Animated.parallel([
          Animated.timing(page5Rotation, {
            toValue: 1,
            duration: duration * 0.15,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(page5Opacity, {
            toValue: 0,
            duration: duration * 0.15,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        // 95-100%: invisible
        Animated.delay(duration * 0.05),
      ])
    );

    // Iniciar todas las animaciones
    page2Animation.start();
    page3Animation.start();
    page4Animation.start();
    page5Animation.start();

    return () => {
      page2Animation.stop();
      page3Animation.stop();
      page4Animation.stop();
      page5Animation.stop();
    };
  }, []);

  const styles = createStyles(size);

  // Interpolaciones para las rotaciones
  const getRotationY = (animatedValue) => {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '0deg'],
    });
  };

  // Componente de página SVG
  const PageSVG = ({ color = '#fff' }) => (
    <Svg width={size * 0.64} height={size * 0.86} viewBox="0 0 90 120" fill={color}>
      <Path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
    </Svg>
  );

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        {/* Sombras del libro */}
        <View style={[styles.shadow, styles.shadowLeft]} />
        <View style={[styles.shadow, styles.shadowRight]} />
        
        {/* Contenedor del libro */}
        <View style={styles.bookContainer}>
          <LinearGradient
            colors={['#23C4F8', '#275EFE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bookBackground}
          />
          
          {/* Páginas */}
          <View style={styles.pagesContainer}>
            {/* Página base (siempre visible) */}
            <View style={styles.basePage}>
              <PageSVG color="rgba(255, 255, 255, 0.36)" />
            </View>
            
            {/* Página 2 */}
            <Animated.View 
              style={[
                styles.page,
                {
                  opacity: page2Opacity,
                  transform: [
                    { perspective: 600 },
                    { rotateY: getRotationY(page2Rotation) }
                  ]
                }
              ]}
            >
              <PageSVG color="rgba(255, 255, 255, 0.52)" />
            </Animated.View>
            
            {/* Página 3 */}
            <Animated.View 
              style={[
                styles.page,
                {
                  opacity: page3Opacity,
                  transform: [
                    { perspective: 600 },
                    { rotateY: getRotationY(page3Rotation) }
                  ]
                }
              ]}
            >
              <PageSVG color="rgba(255, 255, 255, 0.52)" />
            </Animated.View>
            
            {/* Página 4 */}
            <Animated.View 
              style={[
                styles.page,
                {
                  opacity: page4Opacity,
                  transform: [
                    { perspective: 600 },
                    { rotateY: getRotationY(page4Rotation) }
                  ]
                }
              ]}
            >
              <PageSVG color="rgba(255, 255, 255, 0.52)" />
            </Animated.View>
            
            {/* Página 5 */}
            <Animated.View 
              style={[
                styles.page,
                {
                  opacity: page5Opacity,
                  transform: [
                    { perspective: 600 },
                    { rotateY: getRotationY(page5Rotation) }
                  ]
                }
              ]}
            >
              <PageSVG color="rgba(255, 255, 255, 0.52)" />
            </Animated.View>
            
            {/* Última página (siempre visible) */}
            <View style={styles.lastPage}>
              <PageSVG color="rgba(255, 255, 255, 0.36)" />
            </View>
          </View>
        </View>
        
        {/* Texto de loading */}
        <Text style={styles.loadingText}>Loading</Text>
      </View>
    </View>
  );
};

const createStyles = (size) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: size * 1.43, // 200px para size 140
    height: size,
    position: 'relative',
    alignItems: 'center',
  },
  shadow: {
    position: 'absolute',
    bottom: size * 0.057, // 8px
    width: size * 0.86, // 120px
    height: size * 0.2,
    backgroundColor: 'rgba(39, 94, 254, 0.28)',
    borderRadius: size * 0.043,
    top: '80%',
  },
  shadowLeft: {
    left: size * 0.029, // 4px
    transform: [{ rotate: '-6deg' }],
  },
  shadowRight: {
    right: size * 0.029, // 4px
    transform: [{ rotate: '6deg' }],
  },
  bookContainer: {
    width: size * 1.43, // 200px
    height: size,
    borderRadius: size * 0.093, // 13px
    position: 'relative',
    zIndex: 1,
    shadowColor: 'rgba(39, 94, 254, 0.28)',
    shadowOffset: { width: 0, height: size * 0.029 },
    shadowOpacity: 1,
    shadowRadius: size * 0.043,
    elevation: 8,
  },
  bookBackground: {
    width: '100%',
    height: '100%',
    borderRadius: size * 0.093,
  },
  pagesContainer: {
    position: 'absolute',
    top: size * 0.071, // 10px
    left: size * 0.071, // 10px
  },
  basePage: {
    position: 'absolute',
    zIndex: 1,
  },
  page: {
    position: 'absolute',
    zIndex: 2,
  },
  lastPage: {
    position: 'absolute',
    zIndex: 1,
  },
  loadingText: {
    position: 'absolute',
    top: '100%',
    marginTop: size * 0.143, // 20px
    fontSize: size * 0.114, // 16px para size 140
    color: '#6C7486',
    fontWeight: '500',
  },
});
