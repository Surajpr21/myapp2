import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import MovieList from './components/MovieList';
import { fetchMovies } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';


const SearchPage = () => {
  const [movies, setMovies] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState(searchTerm);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  React.useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies(debouncedSearchTerm);
        setMovies(data.Search || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (debouncedSearchTerm) {
      getMovies();
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="app">
      <header className="navbar">
        <h1>Dive Into Movie Magic</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
          />
          <i className="fas fa-search"></i>
        </div>
      </header>
      <main className="main-content">
        <section className="movie-list">
          <MovieList movies={movies} />
        </section>
      </main>
      <footer className="footer">
        <p>© 2024 Movie Search. All rights reserved.</p>
        <p>Suraj Prasad</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
