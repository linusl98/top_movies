import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { times } from 'lodash';
import Header from './Header';
import Star from './Star';
import backIcon from '../../../icons/back.svg';


const propTypes = {

};

const defaultProps = {

};

const API_KEY = 'api_key=4b6d8afeccb259c60ee50fdf3fd76a53';
const API = 'https://api.themoviedb.org/3';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w92/';

/* eslint max-len: ["error", 200]*/
class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieID: props.match.params.movieID,
      movie: {},
    };
  }

  componentWillMount() {
    this.getMovie()
    .then((data) => {
      this.setState({
        movie: data,
      });
    });
  }

  getMovie() {
    console.log(`${API}/movie/${this.state.movieID}?${API_KEY}`);
    return (
      fetch(`${API}/movie/${this.state.movieID}?${API_KEY}`)
      .then(res => res.json())
    );
  }

  render() {
    if (Object.getOwnPropertyNames(this.state.movie).length === 0) {
      return null;
    }

    const stars = [];

    // console.log(this.state.movie.vote_average / 2);
    const rating = (this.state.movie.vote_average / 2)
    .toString()
    .split('.')
    .map((val, i) => {
      if (i === 1) {
        return parseFloat(`0.${val}`, 10);
      }

      return parseInt(val, 10);
    });

    times(rating[0], () => {
      stars.push(1);
    });

    if (rating[1]) {
      stars.push(rating[1]);
    }

    times(5 - stars.length, () => {
      stars.push(0);
    });

    console.log(stars);

    return (
      <div className="container">
        <Header title={'Viewing movie'} history={this.props.history} back />
        <div className="body">
          <div className="left">
            <div className="poster">
              <img src={`${IMAGE_PATH}${this.state.movie.poster_path}`} />
            </div>
            <p className="release-date">{`Launched: ${this.state.movie.release_date}`}</p>
          </div>
          <div className="details">
            <h2 className="title">{this.state.movie.original_title}</h2>
            <p className="author">{`by ${this.state.movie.production_companies.map(item => ` ${item.name}`)}`}</p>
            <div>
              <h2 className="price">$9.99</h2>
              {stars.map((fill, i) => <Star key={i} fill={fill} />)}
              <img src="./../../../icons/rating.png" />
            </div>
          </div>
        </div>
        <p className="overview">
          {this.state.movie.overview}
        </p>


        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .body {
            padding: 24px 16px 16px;
            display: flex;
            flex-direction: row;
          }

          .left {
            flex-basis: 96px;
          }

          .poster {
            display: block;
            box-shadow: 0 20px 33px 0 rgba(184, 118, 12, 0.73);
            width: 100%;
            font-size: 0;
          }

          .poster > img {
            width: 100%;
          }

          .details {
            flex: 1;
            padding-left: 24px;
          }

          .title {
            font-family: Roboto;
            font-size: 20px;
            font-weight: bold;
            line-height: 1.25;
            color: #2c2605;
            margin-top: 0;
          }

          .author {
            font-family: Roboto;
            font-size: 14px;
            line-height: 1.79;
            color: #9f8b0c;
            font-weight: 400;
          }

          .release-date {
            font-family: Roboto;
            font-size: 14px;
            line-height: 1.79;
            color: #9f8b0c;
            font-weight: 400;
            left: 0;
          }

          .overview {
            background-color: #FFFFFF;
            padding: 24px 16px;
            margin: 0;
            flex: 1;
          }

          .movie-overview {
            font-family: Roboto;
            font-size: 14px;
            line-height: 2.14;
            color: #4f565d;
            font-weight: 400;
          }

          .price {
            display: inline-block;
            font-family: Roboto;
            font-size: 20px;
            font-weight: bold;
            line-height: 1.25;
            color: #2c2605;
            padding-right: 12px;
            padding-bottom: 30px;
          }
        `}</style>
      </div>
    );
  }
}

Movie.propTypes = propTypes;
Movie.defaultProps = defaultProps;

export default Movie;
