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
      showSideMenu: false,
      release_year: 2017,
      sort: 'popularity',
      order: 'desc',
    };

    this.searchMoviesByName = this.searchMoviesByName.bind(this);
    this.showSideMenu = this.showSideMenu.bind(this);
    this.increaseReleaseYear = this.increaseReleaseYear.bind(this);
    this.decreaseReleaseYear = this.decreaseReleaseYear.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.getMovies = debounce(this.getMovies, 750).bind(this);
  }

  componentWillMount() {
    this.getMovies();
  }

  getMovies() {
    fetch(`${API}/discover/movie?sort_by=${this.state.sort}.${this.state.order}&${API_KEY}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({
        movies: data,
      });
    });
    console.log('get movies');
  }

  searchMoviesByName(query) {
    if (document.getElementById('search-movie').value === '') {
      return fetch(`${API}/discover/movie?sort_by=${this.state.sort}.${this.state.order}&${API_KEY}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          movies: data,
        });
      });
    }

    return (
        fetch(`${API}/search/movie?query=${document.getElementById('search-movie').value}&sort_by=${this.state.sort}.${this.state.order}&${API_KEY}`)
        .then(res => res.json())
        .then((data) => {
          this.setState({
            movies: data,
          });
        })
    );
  }

  showSideMenu() {
    this.setState({
      showSideMenu: !this.state.showSideMenu,
    });
  }

  handleSortChange() {
    this.setState({
      sort: document.getElementById('sort_select').value,
    });
    console.log('bf bounce');
    // debounce(this.getMovies, 1000, { leading: true });
    this.getMovies();
    console.log('af bounce');
  }

  handleOrderChange(event) {
    this.setState({
      order: event.target.value,
    });
  }

  increaseReleaseYear() {
    this.setState({
      release_year: this.state.release_year += 1,
    });
    this.getMovies();
  }

  decreaseReleaseYear() {
    this.setState({
      release_year: this.state.release_year -= 1,
    });
    this.getMovies();
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
        <Header menuAction={this.showSideMenu} search={debounce(this.searchMoviesByName, 1000)} title="Movies" history={this.props.history} />
        <div className="body">
          <div className="side-menu-container" style={{ width: this.state.showSideMenu ? '50%' : '0%' }}>
            <ul className="side-menu-items">
              <h3 className="side-menu-title">Search params</h3>
              <li className="side-menu-item">
                <h4 style={{ margin: 0 }}>Release year</h4>
                <button onClick={this.decreaseReleaseYear}>-</button>
                {this.state.release_year}
                <button onClick={this.increaseReleaseYear}>+</button>
              </li>
              <li className="side-menu-item">
                <h4 style={{ margin: 0 }}>Sort by</h4>
                <select id="sort_select" selected={this.state.sort} onChange={this.handleSortChange}>
                  <option value="popularity">Popularity</option>
                  <option value="revenue">Revenue</option>
                  <option value="vote_count">Vote count</option>
                  <option value="release_date">Release date</option>
                </select>
              </li>
              <li className="side-menu-item">
                <h4 style={{ margin: 0 }}>Order</h4>
                  Asc <input onChange={this.handleOrderChange} id="order" name="order_select" type="radio" value="asc" />
                  Desc <input onChange={this.handleOrderChange} id="order" name="order_select" type="radio" value="desc" />
              </li>
            </ul>
          </div>
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
            display: flex;
            flex-direction: row;
          }

          .side-menu-container {
            width: 0%;
            background-color: #FFF;
            position: absolute;
            transition: width 1s;
            height: 100%;
            z-index: 90;
          }

          .side-menu-items {
            /*width: inherit;*/
            padding-left: 0px;
          }

          .side-menu-item, .side-menu-title {
            overflow: hidden;
            text-align: center;
            padding-bottom: 10px;
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
