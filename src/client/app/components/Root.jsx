import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { debounce } from 'lodash';

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

    this.searchMoviesByName = this.searchMoviesByName.bind(this);
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
    return fetch(`${API}/discover/movie?sort_by=popularity.desc&${API_KEY}`)
    .then(res => res.json());
  }

  searchMoviesByName(query) {
    if (document.getElementById('search-movie').value === '') {
      return fetch(`${API}/discover/movie?sort_by=popularity.desc&${API_KEY}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          movies: data,
        });
      });
    }

    return (
        fetch(`${API}/search/movie?query=${document.getElementById('search-movie').value}&${API_KEY}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({
            movies: data,
          });
        })
    );
  }

  renderPlaceholder() {
    const width = 92;
    const height = 138;
    const paddingTop = `${height / (width / 100)}%`;
    return (
      <div style={{ paddingTop }}>
        <h3>404</h3>
        <style jsx>{`
          div {
            position: relative;
            display: block;
            width: 100%;
            background-color: black;
          }
          h3 {
            position: absolute;
            top: 50%;
            text-align: center;
            width: 100%;
            color: #fff;
            display: block;
            font-size: 12px;
            margin: 0;
            margin-top: -6px;
          }
        `}</style>
      </div>
    );
  }

  render() {
    if (Object.getOwnPropertyNames(this.state.movies).length === 0) {
      return null;
    }
    return (
      <div>
        <Header search={debounce(this.searchMoviesByName, 1000)} title="Movies" history={this.props.history} />
        <div className="body">
          <ul className="movies">
            {this.state.movies.results.map(item => (
              <li key={item.id} className="movie">
                <Link to={`/movies/${item.id}`}>
                  {item.poster_path === null ? this.renderPlaceholder() : <img className="movie-poster" src={`${IMAGE_PATH}${item.poster_path}`} />}
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
            width: 33.33%;
          }

          .movie-poster{
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
