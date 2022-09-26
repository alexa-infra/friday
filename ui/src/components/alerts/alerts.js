import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { dismiss, Alerts } from '../../features/alerts';

const Alert = ({ item, onDismissAlert }) => {
  const { message, type } = item;
  return (
    <div className={classNames('rounded my-1 py-2 px-4 flex', {
      'bg-green-500': type === Alerts.SUCCESS,
      'bg-blue-500': type === Alerts.INFO,
      'bg-yellow-500': type === Alerts.WARNING,
      'bg-red-500': type === Alerts.ERROR,
    })}
    >
      <div className="flex-1 text-white">
        <span className="font-bold">{type}</span>
        {' '}
        {message}
      </div>
      <button type="button" className="cursor-pointer text-white bg-transparent opacity-50 hover:opacity-75" onClick={onDismissAlert}>
        <span>&times;</span>
      </button>
    </div>
  );
};

let AlertList = ({ items, dismissAlert }) => (
  <div className="flex flex-col flex-nowrap">
    {
      items.map((it) => (
        <Alert
          key={it.id}
          item={it}
          onDismissAlert={() => dismissAlert(it)}
        />
      ))
    }
  </div>
);

AlertList = connect(
  (state) => ({
    items: state.alerts,
  }),
  (dispatch) => ({
    dismissAlert: (item) => dispatch(dismiss(item.id)),
  }),
)(AlertList);

export default AlertList;
