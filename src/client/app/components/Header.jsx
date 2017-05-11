import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../../../icons/menu.svg';
import backIcon from '../../../icons/back.svg';
import searchIcon from '../../../icons/search.svg';

const propTypes = {
  title: PropTypes.string,
  back: PropTypes.bool,
};

const defaultProps = {
  title: 'Movies',
  back: false,
};


function Menu() {
  return (
    <img style={{ height: '16px' }} src={menuIcon} />
  );
}

function Back(props) {
  return (
    <button onClick={props.goBack}>
      <img style={{ height: '11px' }} src={backIcon} />
      <style jsx>{`
        button {
          padding: 0;
        }
      `}</style>
    </button>
  );
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
    };

    this.showSearch = this.showSearch.bind(this);
  }

  showSearch() {
    if (this.state.showSearch === true) {
      document.getElementById('search-bar').style.height = '30px';
    } else {
      document.getElementById('search-bar').style.height = '0px';
    }
    this.setState({
      showSearch: !this.state.showSearch,
    });
  }

  render() {
    return (
      <div className="header-container">
        <div className="header">
          {this.props.back ? <Back goBack={this.props.history.goBack} /> : <button onClick={this.props.menuAction}><Menu /></button>}
          <h2 className="header-title">{this.props.title}</h2>
          <button id="search-btn" type="submit" onClick={this.showSearch}>
            <img style={{ height: '19px' }} src={searchIcon} />
          </button>
        </div>
        <div>
          <div className="header-search-container" id="search-bar">
            <input type="text" id="search-movie" onChange={this.props.search} className="header-search-input" name="search" placeholder="Search.." />
          </div>
        </div>
        <hr style={{ width: `${this.props.title.length}ch` }} />
        <style jsx>{`
          .header-container {
            text-align: center;
            font-size: 0;
          }

          .header-search-input {
            -webkit-box-shadow: inset 2px 2px 2px 0px #dddddd;
            -moz-box-shadow: inset 2px 2px 2px 0px #dddddd;
            box-shadow: inset 2px 2px 2px 0px #dddddd;
            height: inherit;
          }

          .header-search-container {
            font-size: 15px;
            width: 100%;
            height: 0px;
            transition: height 1s;
            overflow: hidden;
            margin-bottom: 5px;
          }

          .header {
            display: flex;
            flex-direction: row;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 24px 16px 14px 16px;
          }

          .header-title {
            font-size: 20px;
            font-weight: 400;
            margin: 0;
          }

          hr {
            display: inline-block;
            height: 2px;
            background-color: rgba(0,0,0,.06);
            border: 0;
            margin: 0;
            font-size: 20px;
          }
        `}</style>
      </div>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
