// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from './Header';
//
// const NonExistingPath = () => (
//   <div style={{ margin: 5 }}>
//     <h1>What you are looking for does not exist :(</h1>
//     <Header title={'404'} history={this.props.history} back />
//   </div>
//   );
//
// export default NonExistingPath;

import React, { Component, PropTypes } from 'react';
import Header from './Header';
const propTypes = {};

const defaultProps = {};

class NonExistingPath extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ margin: 5 }}>
        <Header title={'404'} history={this.props.history} back />
        <h1>What you are looking for does not exist :(</h1>
      </div>
    );
  }
}

NonExistingPath.propTypes = propTypes;
NonExistingPath.defaultProps = defaultProps;

export default NonExistingPath;
