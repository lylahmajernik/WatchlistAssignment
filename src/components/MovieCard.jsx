import { useState, useEffect } from 'react';
import { useMovieList } from '../contexts/MovieContexts';

function MovieCard({ movie }) {
  const { addToMovieList, removeFromMovieList, isInMovieList } = useMovieList();

  const [isFavorite, setIsFavorite] = useState(false);
  const inMovieList = isInMovieList(movie.id);

  // Load favorites from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const isMovieFavorite = favorites.some(fav => fav.id === movie.id);
    setIsFavorite(isMovieFavorite);
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  const handleMovieListClick = () => {
    if (inMovieList) {
      removeFromMovieList(movie.id);
    } else {
      addToMovieList(movie);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450/667eea/ffffff?text=No+Image';

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">
            {movie.release_date?.substring(0, 4)}
          </span>
        </div>

        <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>

        <button 
         className={`movie-list-button ${isInMovieList ? 'on-added' : ''}`}

        onClick={handleMovieListClick}>
          {inMovieList ? 'Remove from Want to Watch' : 'Add to Want to Watch'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
