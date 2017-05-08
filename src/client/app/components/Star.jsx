import React, { PropTypes } from 'react';

const propTypes = {};

const defaultProps = {};

function Star(props) {
  return (
    <div className="container">
      <svg width="14px" height="14px" viewBox="0 0 14 14">
        <defs>
          <clipPath id="fill">
            <rect x="0" y="0" width={14 * props.fill} height="14" />
          </clipPath>
        </defs>
        <g className="star-filled" fill="#4C4208">
          <polygon clipPath="url(#fill)" points="6.99997052 0 4.83685787 4.38283122 0 5.08583546 3.49998526 8.49752139 2.67389263 13.3147736 6.99997052 11.040218 11.3261958 13.3147736 10.5001032 8.49752139 14.0000884 5.08583546 9.16323058 4.38283122" />
        </g>
        <g className="star-empty" fill="rgba(76, 67, 9, .15)">
          <polygon points="6.99997052 0 4.83685787 4.38283122 0 5.08583546 3.49998526 8.49752139 2.67389263 13.3147736 6.99997052 11.040218 11.3261958 13.3147736 10.5001032 8.49752139 14.0000884 5.08583546 9.16323058 4.38283122" />
        </g>
      </svg>
      <style jsx>{`
        .container {
          display: inline-block;
          padding: 2px;
        }
      `}</style>
    </div>
  );
}

Star.propTypes = propTypes;
Star.defaultProps = defaultProps;

export default Star;
