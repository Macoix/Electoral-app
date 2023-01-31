import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, title, subtitle, width = '' }) => {
  return (
    <>
      <div
        className={`bg-white shadow overflow-hidden sm:rounded-lg ${
          width != '' ? 'w-' + width : 'w-full'
        }`}
      >
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
            {subtitle && (
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          <div>{children[0] && children[0]}</div>
        </div>
        <div className="border-t border-gray-200">
          <div className="p-8">
            <div className="mb-4">
              {children[1]} {children[2]}
            </div>
            {children.length == undefined ? children : children[3]}
          </div>
        </div>
      </div>
    </>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  width: PropTypes.any
};

export default Card;
