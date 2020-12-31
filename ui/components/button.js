import React from 'react';
import classNames from 'classnames';


const Button = ({ children, className, isActive, ...rest }) => (
  <button
    className={classNames("text-white font-bold py-2 px-4 rounded outline-none focus:outline-none mr-1 text-sm shadow hover:shadow-lg", {
      "bg-blue-500 active:bg-blue-600": isActive,
      "bg-gray-500 active:bg-gray-600": !isActive,
    }, className)}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
