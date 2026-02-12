import { createContext, useState, useContext, useEffect } from 'react';

const MovieListContext = createContext();

export function useMovieList() {
  const context = useContext(MovieListContext);
  if (!context) {
    throw new Error('useMovieList must be used within MovieListProvider');
  }
  return context;
}

export function MovieListProvider({ children }) {
  const [movieList, setMovieList] = useState(() => {
    const saved = localStorage.getItem('movieList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('movieList', JSON.stringify(movieList));
  }, [movieList]);

  const addToMovieList = (movie) => {
    setMovieList(prev => {
      if (prev.some(m => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromMovieList = (movieId) => {
    setMovieList(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInMovieList = (movieId) => {
    return movieList.some(movie => movie.id === movieId);
  };

  const value = {
    movieList,
    addToMovieList,
    removeFromMovieList,
    isInMovieList
  };

  return (
    <MovieListContext.Provider value={value}>
      {children}
    </MovieListContext.Provider>
  );
}
