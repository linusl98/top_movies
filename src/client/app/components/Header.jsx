import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../../../icons/menu.svg';
import backIcon from '../../../icons/back.svg';

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

function Header(props) {
  return (
    <div className="header-container">
      <div className="header">
        {props.back ? <Back goBack={props.history.goBack} /> : <Menu />}
        <h2 className="header-title">{props.title}</h2>
        <img style={{ height: '19px' }} src="./../../../icons/search.png" />
      </div>
      <hr style={{ width: `${props.title.length}ch` }} />
      <style jsx>{`
        .header-container {
          text-align: center;
          font-size: 0;
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

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
