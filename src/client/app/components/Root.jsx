import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

// import '../styles/style.css';
const propTypes = {};

const API_KEY = 'api_key=4b6d8afeccb259c60ee50fdf3fd76a53';
const API = 'https://api.themoviedb.org/3';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w92/';

const defaultProps = {};

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {},
    };
  }

  componentWillMount() {
    this.getMoviesByPopularity()
    .then((data) => {
      this.setState({
        movies: data,
      });
    });
  }

  getMoviesByPopularity() {
    return (
      fetch(`${API}/discover/movie?sort_by=popularity.desc&${API_KEY}`)
      .then(res => res.json())
    );
  }

  render() {
    if (Object.getOwnPropertyNames(this.state.movies).length === 0) {
      return null;
    }
    return (
      <div>
        <Header title="Movies" history={this.props.history} />
        <div className="body">
          <ul className="movies">
            {this.state.movies.results.map(item => (
              <li key={item.id} className="movie">
                <Link to={`/movies/${item.id}`}>
                  <img className="movie-poster" src={`${IMAGE_PATH}${item.poster_path}`} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <style jsx>{`
          .body {
            padding: 24px 16px 16px;
          }

          .movies {
            list-style: none;
            padding: 0;
            margin: -8px -8px;
            font-size: 0;
          }

          .movie {
            display: inline-block;
            padding: 8px 8px;
            width: 33.33%
          }

          .movie-poster {
            display: block;
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}

Root.propTypes = propTypes;
Root.defaultProps = defaultProps;

export default Root;
