import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { dismiss, Alerts } from '../../features/alerts';

const Alert = ({ item, onDismissAlert }) => {
  const { message, type } = item;
  return (
    <div className={classNames({
      alert: true,
      'alert-success': type === Alerts.SUCCESS,
      'alert-info': type === Alerts.INFO,
      'alert-warning': type === Alerts.WARNING,
      'alert-error': type === Alerts.ERROR,
    })}
    >
      <div className="message">
        <strong>{type}</strong>
        {' '}
        {message}
      </div>
      <button type="button" className="close" onClick={onDismissAlert}>
        <span>&times;</span>
      </button>
    </div>
  );
};

let AlertList = ({ items, dismissAlert }) => (
  <div className="alert-list">
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
