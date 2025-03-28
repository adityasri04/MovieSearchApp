# Movie Search App

A React Native mobile app for searching movies using OMDb API.

## Features
- Search movies by title
- View movie details (poster, title, year, genre, rating)
- Save favorite movies
- Infinite scroll pagination
- Clean, responsive UI

## Setup
1. Get API key from [OMDb API](https://www.omdbapi.com/)
2. Clone this repository
3. Install dependencies:
```bash
npm install
```
4. Add your API key to `src/services/api.js`
5. Run the app:
```bash
npx react-native run-android
# or
npx react-native run-ios
```

## Dependencies
- React Navigation
- Axios
- React Native Vector Icons
- AsyncStorage