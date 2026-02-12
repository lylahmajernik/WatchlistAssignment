import MovieGrid from '../components/MovieGrid';
import { useMovieList } from '../contexts/MovieContexts';

function WantToWatch() {
  const { movieList } = useMovieList();

   return (
    <main className="main-content">
      <div className="content-header">
        <h2>Want to Watch</h2>
        <p>Movies you're planning to watch</p>
      {/*3. Pass the cookList as a prop*/}
      </div>
      {movieList.length > 0 ? (
        <MovieGrid movies={movieList} />
      ) : (
        <div className="empty-state">
          <p>No movies in your watch list yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default WantToWatch;