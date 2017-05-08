import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Root from './components/Root.jsx';
import Movie from './components/Movie.jsx';
import NonExistingPath from './components/NonExistingPath.jsx';

const propTypes = {};

const defaultProps = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Root} />
            <Route pathName="movie" path="/movies/:movieID" component={Movie} />
            <Route path="*" component={NonExistingPath} />
          </Switch>
        </BrowserRouter>
        <style jsx global>{`
        html {
          height: 100%;
          box-sizing: border-box;
        }

        body {
          min-height: 100%;
          background-color: #FFDD0C;
          margin: 0;
          font-family: Roboto;
        }

        *, *:before, *:after {
          box-sizing: inherit;
        }
      `}</style>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

render(<App />, document.getElementById('root'));
