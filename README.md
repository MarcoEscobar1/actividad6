# 📚 Book Search App

Una aplicación móvil híbrida desarrollada con React Native y Expo que permite buscar libros usando la Google Books API, ver detalles completos y guardar favoritos localmente.

<img width="381" height="756" alt="{971E89D0-CE30-4B0A-869B-2EE62D5E1D2E}" src="https://github.com/user-attachments/assets/405327a3-d09e-44d7-b1ba-9d276543720e" />


## 🎯 Características

- **🔍 Búsqueda de libros**: Busca libros por título, autor o palabras clave usando la Google Books API
- **📖 Detalles completos**: Visualiza información detallada de cada libro incluyendo descripción, fecha de publicación, calificaciones, etc.
- **❤️ Sistema de favoritos**: Guarda y gestiona tus libros favoritos localmente en el dispositivo
- **🎨 Interfaz moderna**: Diseño limpio y responsive optimizado para dispositivos móviles
- **🔗 Enlaces externos**: Acceso directo a vista previa y más información de los libros

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework principal para desarrollo móvil
- **Expo** - Plataforma de desarrollo y herramientas
- **React Navigation** - Navegación entre pantallas
- **AsyncStorage** - Almacenamiento local persistente
- **Google Books API** - Fuente de datos de libros

## 📱 Pantallas de la Aplicación

### 1. Pantalla de Búsqueda (SearchScreen)
- Campo de búsqueda con validación
- Lista de resultados con información básica
- Navegación a detalles y favoritos
- Manejo de estados de carga y errores

### 2. Pantalla de Detalles (BookDetailsScreen)
- Información completa del libro seleccionado
- Botón para agregar/quitar de favoritos
- Enlaces a vista previa y más información
- Interfaz detallada con imagen, descripción y metadatos

### 3. Pantalla de Favoritos (FavoritesScreen)
- Lista de libros guardados localmente
- Funcionalidad para limpiar todos los favoritos
- Navegación directa a detalles de libros favoritos

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn
- Expo CLI (instalado globalmente)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd actividad6
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Verificar configuración de API**
   El proyecto ya incluye la API Key de Google Books configurada en:
   ```
   src/utils/config.js
   ```
   
   **API Key incluida:** `AIzaSyAAjBJ55ujQWnask-GSS5yKBHpQ6xI-rPM`

4. **Ejecutar la aplicación**
   
   **Para desarrollo web:**
   ```bash
   npm run web
   ```
   
   **Para dispositivo Android:**
   ```bash
   npm run android
   ```
   
   **Para dispositivo iOS:**
   ```bash
   npm run ios
   ```

## 🔧 Configuración de API

### Google Books API
La aplicación utiliza la Google Books API v1 con las siguientes características:
- **Endpoint base**: `https://www.googleapis.com/books/v1/volumes`
- **API Key**: Incluida en el proyecto (AIzaSyAAjBJ55ujQWnask-GSS5yKBHpQ6xI-rPM)
- **Límite de resultados**: 20 libros por búsqueda
- **Campos incluidos**: Título, autores, descripción, fecha de publicación, calificaciones, imágenes, etc.

## 💾 Almacenamiento Local

La aplicación utiliza AsyncStorage para mantener los libros favoritos persistentemente:
- **Clave de almacenamiento**: `@favorites`
- **Formato**: Array de objetos JSON con información completa del libro
- **Operaciones**: Agregar, quitar, verificar existencia y limpiar todos

## 🎨 Características de UI/UX

- **Diseño responsive** adaptado a diferentes tamaños de pantalla
- **Indicadores de carga** durante operaciones asíncronas
- **Manejo de errores** con mensajes informativos
- **Navegación intuitiva** entre pantallas
- **Estados vacíos** con mensajes guía para el usuario
- **Validación de entrada** en formularios de búsqueda

## 📱 Compatibilidad

- **Plataformas**: iOS, Android, Web
- **Versiones mínimas**: 
  - iOS 11+
  - Android API 21+
  - Navegadores modernos

## 🚀 Scripts Disponibles

```bash
# Desarrollo web
npm run web

# Desarrollo Android
npm run android

# Desarrollo iOS
npm run ios

# Iniciar Metro bundler
npm start

# Limpiar caché
npm run clear
```
